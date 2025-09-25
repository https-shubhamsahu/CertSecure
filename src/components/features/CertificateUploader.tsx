
'use client';

import { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, CheckCircle, XCircle, Loader2, FileText, ScanText, Bot, Hash, Download, QrCode, ShieldCheck, AlertTriangle, Scale, SpellCheck, Stamp, Database, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import QRCode from 'qrcode.react';
import { jsPDF } from 'jspdf';
import { useToast } from '@/hooks/use-toast';
import { DUMMY_CERTIFICATES, CertificateData, VerificationStatus } from '@/lib/dummy-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'uploading' | 'processing' | 'success' | 'error' | 'suspicious';
type ProcessingStep = 'ocr' | 'structure' | 'consistency' | 'seal' | 'database' | 'hash' | 'done';

const ProcessingStepDetails: Record<ProcessingStep, { text: string; icon: React.ElementType; progress: number }> = {
  ocr: { text: 'Extracting text (OCR)...', icon: ScanText, progress: 15 },
  structure: { text: 'Analyzing document structure...', icon: Scale, progress: 30 },
  consistency: { text: 'Verifying text consistency...', icon: SpellCheck, progress: 45 },
  seal: { text: 'Validating seal and signature...', icon: Stamp, progress: 60 },
  database: { text: 'Cross-verifying with university database...', icon: Database, progress: 75 },
  hash: { text: 'Generating blockchain hash...', icon: Fingerprint, progress: 90 },
  done: { text: 'Finalizing...', icon: CheckCircle, progress: 100 },
};

const allProcessingSteps: ProcessingStep[] = ['ocr', 'structure', 'consistency', 'seal', 'database', 'hash', 'done'];

export default function CertificateUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<ProcessingStep[]>([]);
  const [currentStep, setCurrentStep] = useState<ProcessingStep | null>(null);
  const [result, setResult] = useState<CertificateData | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
        toast({
            variant: "destructive",
            title: "File Upload Error",
            description: fileRejections[0].errors[0].message,
        });
        return;
    }
    
    const acceptedFile = acceptedFiles[0];
    if (acceptedFile) {
      reset();
      setFile(acceptedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(acceptedFile);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const runProcessingStep = (step: ProcessingStep, duration: number) => {
    return new Promise<void>(resolve => {
        setCurrentStep(step);
        setProgress(ProcessingStepDetails[step].progress);
        setTimeout(() => {
            setCompletedSteps(prev => [...prev, step]);
            resolve();
        }, duration);
    });
  };

  const handleProcess = async () => {
    if (!file) return;
  
    setStatus('uploading');
    setProgress(5);
    await new Promise(res => setTimeout(res, 500));
    
    setStatus('processing');
    setProgress(10);
    
    await runProcessingStep('ocr', 3000 + Math.random() * 1000);
    await runProcessingStep('structure', 3000 + Math.random() * 1000);
    await runProcessingStep('consistency', 2500 + Math.random() * 1000);
    await runProcessingStep('seal', 4000 + Math.random() * 1500);
    await runProcessingStep('database', 3500 + Math.random() * 1000);
    await runProcessingStep('hash', 2000 + Math.random() * 500);
    await runProcessingStep('done', 1000);

    // In a real app, you would hash the file and look up the hash.
    // For this demo, we'll use the filename to get a predictable result.
    const demoResult = DUMMY_CERTIFICATES[file.name] || DUMMY_CERTIFICATES['default_certificate.pdf'];
    setResult(demoResult);

    switch (demoResult.status) {
        case 'VERIFIED':
            setStatus('success');
            break;
        case 'FRAUDULENT':
            setStatus('error');
            break;
        case 'SUSPICIOUS':
            setStatus('suspicious');
            break;
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setStatus('idle');
    setProgress(0);
    setCompletedSteps([]);
    setCurrentStep(null);
    setResult(null);
  };

  const downloadReport = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("CertSecure Verification Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Verification ID: ${result.id}`, 14, 32);
    doc.text(`Timestamp: ${new Date().toLocaleString()}`, 14, 38);
    
    doc.setFontSize(14);
    let statusColor = '#16a34a'; // Green for Verified
    if (result.status === 'FRAUDULENT') statusColor = '#dc2626'; // Red for Fraudulent
    if (result.status === 'SUSPICIOUS') statusColor = '#f59e0b'; // Amber for Suspicious
    doc.text(`Result: ${result.status}`, 14, 50, { textColor: statusColor });
    
    doc.setFontSize(12);
    doc.text("Certificate Details", 14, 62);
    doc.setFontSize(10);
    doc.text(result.extractedText, 16, 70, { maxWidth: 180 });
    
    doc.setFontSize(12);
    doc.text("Digital Fingerprint (SHA-512)", 14, 120);
    doc.setFontSize(8);
    doc.text(result.sha512Hash, 16, 128, { maxWidth: 180 });

    if (result.fraudIndicators && result.fraudIndicators.length > 0) {
        doc.setFontSize(12);
        doc.text("Fraud/Suspicion Indicators", 14, 150);
        doc.setFontSize(10);
        doc.text(result.fraudIndicators.join('\n'), 16, 158, { maxWidth: 180 });
    }

    if (preview) {
        doc.addImage(preview, 'JPEG', 14, doc.getNumberOfPages() > 1 ? 20 : 180, 80, 60);
    }
    
    doc.save(`CertSecure-Report-${result.id}.pdf`);
  };

  const ResultCard = ({ resultData }: { resultData: CertificateData }) => {
    const statusMap = {
        VERIFIED: {
            styles: 'bg-green-50/50 dark:bg-green-900/10 border-green-500/30',
            icon: <CheckCircle className="w-12 h-12 text-green-500" />,
            title: 'Verification Successful',
            titleClass: 'text-green-700 dark:text-green-400',
            description: 'This certificate has been verified as authentic.',
            descriptionClass: 'text-green-600 dark:text-green-500',
        },
        FRAUDULENT: {
            styles: 'bg-red-50/50 dark:bg-red-900/10 border-red-500/30',
            icon: <XCircle className="w-12 h-12 text-red-500" />,
            title: 'Verification Failed',
            titleClass: 'text-red-700 dark:text-red-400',
            description: 'This certificate shows strong indicators of fraud.',
            descriptionClass: 'text-red-600 dark:text-red-500',
        },
        SUSPICIOUS: {
            styles: 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-500/30',
            icon: <AlertTriangle className="w-12 h-12 text-amber-500" />,
            title: 'Verification Suspicious',
            titleClass: 'text-amber-700 dark:text-amber-400',
            description: 'Potential inconsistencies detected. Manual review recommended.',
            descriptionClass: 'text-amber-600 dark:text-amber-500',
        }
    };
    
    const currentStatus = statusMap[resultData.status];

    return (
        <Card className={`animate-fade-in ${currentStatus.styles}`}>
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                {currentStatus.icon}
                <div>
                    <CardTitle className={currentStatus.titleClass}>{currentStatus.title}</CardTitle>
                    <CardDescription className={currentStatus.descriptionClass}>
                        {currentStatus.description}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {resultData.fraudIndicators.length > 0 && (
                     <Alert variant="destructive" className="mb-4 bg-transparent">
                        <AlertTitle>Analysis Report</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc pl-5 mt-2">
                                {resultData.fraudIndicators.map((reason, i) => <li key={i}>{reason}</li>)}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="details">Technical Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold mb-2">Extracted Information</h4>
                                <pre className="text-sm p-4 bg-muted/50 rounded-md whitespace-pre-wrap font-sans">{resultData.extractedText}</pre>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-4 p-4 bg-muted/50 rounded-md">
                                <h4 className="font-semibold">Verification QR Code</h4>
                                <div className="p-2 bg-white rounded-md">
                                    <QRCode value={resultData.id} size={128} />
                                </div>
                                <p className="text-xs text-center text-muted-foreground">Scan to get on-chain verification details.</p>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="details" className="mt-4">
                        <h4 className="font-semibold mb-2">Digital Fingerprint (SHA-512)</h4>
                        <p className="text-xs font-mono break-all p-4 bg-muted/50 rounded-md">{resultData.sha512Hash}</p>
                    </TabsContent>
                </Tabs>
                <div className="mt-6 flex flex-wrap gap-2">
                    <Button onClick={downloadReport}><Download className="mr-2 h-4 w-4" /> Download Report</Button>
                    <Button onClick={reset} variant="outline">Verify Another</Button>
                </div>
            </CardContent>
        </Card>
    );
  }

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <>
            <div {...getRootProps()} className={`w-full cursor-pointer p-10 text-center border-2 border-dashed rounded-lg transition-colors ${isDragActive ? 'bg-primary/20 border-primary' : 'bg-muted/50 hover:bg-muted/80 border-border'}`}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <FileUp className="w-12 h-12" />
                <p className="text-lg font-medium">{isDragActive ? 'Drop the file here' : 'Drag & drop a file here, or click to select'}</p>
                <p className="text-sm">Supports PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>
            {preview && file && (
              <div className="mt-4 p-4 border rounded-lg bg-muted/30">
                <h3 className="font-semibold text-lg mb-2">File Preview:</h3>
                <div className="flex items-start gap-4">
                  {file.type.startsWith('image/') ? (
                    <Image src={preview} alt="Certificate preview" width={200} height={140} className="rounded-md object-cover" />
                  ) : (
                    <div className="flex items-center justify-center bg-background rounded-md p-4 border w-[200px] h-[140px]">
                        <FileText className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className='flex-1'>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button onClick={handleProcess} className="mt-4 w-full sm:w-auto">Process Certificate</Button>
                  </div>
                </div>
              </div>
            )}
            {!file && (
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle className="text-lg">Demo Scenarios</CardTitle>
                        <CardDescription>To test different verification results, rename a file to one of the following and upload it:</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-1">
                        <p>1. <span className="font-mono text-foreground">authentic_certificate.pdf</span> (Results in: VERIFIED ✅)</p>
                        <p>2. <span className="font-mono text-foreground">fraudulent_certificate.jpg</span> (Results in: FRAUDULENT ❌)</p>
                        <p>3. <span className="font-mono text-foreground">suspicious_certificate.png</span> (Results in: SUSPICIOUS ⚠️)</p>
                    </CardContent>
                </Card>
            )}
          </>
        );
      case 'uploading':
      case 'processing':
        return (
            <div className="text-center p-8 border rounded-lg bg-card animate-fade-in">
                <Bot className="w-16 h-16 text-primary mx-auto animate-pulse mb-4" />
                <h3 className="text-2xl font-semibold mb-2">AI Verification in Progress</h3>
                <p className="text-muted-foreground mb-6">Our AI is securely analyzing your document. This may take a moment.</p>
                <Progress value={progress} className="w-full max-w-md mx-auto mb-6" />
                <div className="max-w-md mx-auto text-left space-y-2">
                    {allProcessingSteps.map((step) => {
                        const isCompleted = completedSteps.includes(step);
                        const isCurrent = currentStep === step;
                        const { text, icon: Icon } = ProcessingStepDetails[step];

                        return (
                            <div key={step} className={cn("flex items-center gap-3 text-sm transition-opacity", isCompleted ? "text-muted-foreground" : "text-foreground", isCurrent ? "" : "opacity-60")}>
                                {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                ) : isCurrent ? (
                                    <Loader2 className="w-5 h-5 text-primary animate-spin flex-shrink-0" />
                                ) : (
                                    <div className="w-5 h-5 flex-shrink-0" />
                                )}
                                <span className={cn("flex-grow", isCompleted && "line-through")}>{text}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
      case 'success':
      case 'error':
      case 'suspicious':
          if (!result) return null;
          return <ResultCard resultData={result} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl bg-card/80 backdrop-blur-lg border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold font-literata">Certificate Verification</CardTitle>
            <CardDescription>Securely upload and verify digital certificates in seconds.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
}

    