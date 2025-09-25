"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  FileUp,
  ShieldCheck,
  ShieldX,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  Search,
} from "lucide-react";

type VerificationStatus = "idle" | "uploading" | "verifying" | "success" | "error";

type CertificateDetails = {
  subject: string;
  issuer: string;
  validUntil: string;
};

export default function CertificateManager() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<VerificationStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [verificationResult, setVerificationResult] = useState<CertificateDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("idle");
      setProgress(0);
      setVerificationResult(null);
      setError(null);
    }
  };

  const handleVerify = async () => {
    if (!file) return;

    setStatus("uploading");
    setProgress(33);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus("verifying");
    setProgress(66);
    
    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simulate random success/error
    if (Math.random() > 0.3) {
      setVerificationResult({
        subject: "CertSecure Demo User",
        issuer: "CertSecure CA",
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toDateString(),
      });
      setStatus("success");
    } else {
      setError("Certificate signature is invalid or chain is incomplete.");
      setStatus("error");
    }
    setProgress(100);
  };

  const renderStatus = () => {
    switch (status) {
      case "success":
        return (
          <Card className="bg-green-50/50 dark:bg-green-900/10 border-green-500/30 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-500" />
                <div>
                  <CardTitle className="text-green-800 dark:text-green-300">
                    Certificate Verified
                  </CardTitle>
                  <CardDescription className="text-green-600 dark:text-green-400">
                    The certificate is valid and trusted.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-3 text-green-700 dark:text-green-300">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4"/> <strong>Subject:</strong> {verificationResult?.subject}
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4"/> <strong>Issuer:</strong> {verificationResult?.issuer}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4"/> <strong>Valid Until:</strong> {verificationResult?.validUntil}
              </div>
            </CardContent>
          </Card>
        );
      case "error":
        return (
          <Card className="bg-red-50/50 dark:bg-red-900/10 border-red-500/30 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <ShieldX className="w-8 h-8 text-red-600 dark:text-red-500" />
                <div>
                  <CardTitle className="text-red-800 dark:text-red-300">
                    Verification Failed
                  </CardTitle>
                  <CardDescription className="text-red-600 dark:text-red-400">
                    {error}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-card/80 backdrop-blur-lg border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <Search className="h-8 w-8 text-primary" />
            </div>
            <div>
                <CardTitle className="text-3xl font-bold font-literata">Quick Verification</CardTitle>
                <CardDescription>
                Upload a certificate file to instantly check its authenticity.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 border-2 border-dashed rounded-lg bg-muted/30">
            <div className="flex flex-col sm:flex-row gap-4">
            <Input type="file" onChange={handleFileChange} className="flex-grow bg-background/70" />
            <Button onClick={handleVerify} disabled={!file || status === "uploading" || status === "verifying"} className="w-full sm:w-auto">
                <ShieldCheck className="mr-2 h-4 w-4" />
                {status === "uploading" || status === "verifying"
                ? "Verifying..."
                : "Verify Now"}
            </Button>
            </div>
        </div>

        {(status === "uploading" || status === "verifying") && (
          <div className="space-y-2 pt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center animate-pulse">
              {status === "uploading" ? "Uploading file..." : "Verifying certificate signature..."}
            </p>
          </div>
        )}
        <div className="pt-4">{renderStatus()}</div>
      </CardContent>
    </Card>
  );
}
