"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Mail, KeyRound, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import NameInputDialog from "@/components/NameInputDialog";

export default function CertificateVerifier() {
  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [studentId, setStudentId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/verify-roll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNumber }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to Verify Roll Number");

      setVerificationId(data.verificationId);
      setShowOtpModal(true);
      toast.success("OTP Sent to Your Registered Email!");
    } catch (err: any) {
      setError(err.message || "An Error Occurred");
      toast.error(err.message || "An Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, verificationId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to Verify OTP");

      setStudentId(data.studentId);
      setShowOtpModal(false);
      setShowNameDialog(true);
      toast.success("OTP Verified Successfully!");
    } catch (err: any) {
      setError(err.message || "An Error Occurred");
      toast.error(err.message || "An Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleNameSubmit = async (name: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/update-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, name }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to Update Name");

      toast.success("Name Updated Successfully!");
      router.push(`/certificate/${studentId}`);
    } catch (err: any) {
      setError(err.message || "Failed to Update Name");
      toast.error(err.message || "Failed to Update Name");
    } finally {
      setLoading(false);
      setShowNameDialog(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 mt-10 mb-10 bg-gradient-to-br from-secondary/30 to-background">
      <div className="w-full max-w-xl mx-auto">
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4 shadow-lg">
            <Award className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Certificate Verifier
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Geeks for Geeks Python and AIML Session
            <br />
            <span className="text-sm">Organized by Corbett House</span>
          </p>
        </div>

        <div className="w-full max-w-xl mx-auto">
          <Card className="shadow-xl border-border/50 rounded-xl">
            <CardHeader>
              {!showOtpModal ? (
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                  Enter Your Roll Number to Receive Your Certificate
                </CardTitle>
              ) : (
                <>
                  <CardTitle className="flex items-center gap-2 text-md sm:text-base">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    Verify OTP
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Enter the 6-Digit Code Sent to Your Registered Email
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent>
              {!showOtpModal ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2 mt-[-10]">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <Input
                      id="rollNumber"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder="e.g. 22f3001013"
                      required
                      className="text-base rounded-md w-full focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="mouse-pointer w-full rounded-md py-2 border border-primary"
                  >
                    {loading ? "Verifying..." : "Verify Roll Number"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={verifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4" />
                      One-Time Password
                    </Label>
                    <Input
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-Digit OTP"
                      required
                      maxLength={6}
                      className="text-center text-sm font-semibold rounded-md w-full focus:ring-primary"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      type="button"
                      onClick={() => setShowOtpModal(false)}
                      variant="outline"
                      className="flex-1 rounded-md py-2"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 mouse-pointer w-full rounded-md py-2 border border-primary"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <NameInputDialog
          open={showNameDialog}
          onOpenChange={setShowNameDialog}
          onSubmit={handleNameSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
