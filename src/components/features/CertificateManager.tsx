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
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
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
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
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
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <span>Certificate Verification</span>
        </CardTitle>
        <CardDescription>
          Upload a certificate file to verify its authenticity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input type="file" onChange={handleFileChange} className="flex-grow" />
          <Button onClick={handleVerify} disabled={!file || status === "uploading" || status === "verifying"}>
            <FileUp className="mr-2 h-4 w-4" />
            {status === "uploading" || status === "verifying"
              ? "Verifying..."
              : "Upload & Verify"}
          </Button>
        </div>
        {(status === "uploading" || status === "verifying") && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center animate-pulse">
              {status === "uploading" ? "Uploading file..." : "Verifying certificate..."}
            </p>
          </div>
        )}
        <div className="pt-4">{renderStatus()}</div>
      </CardContent>
    </Card>
  );
}
