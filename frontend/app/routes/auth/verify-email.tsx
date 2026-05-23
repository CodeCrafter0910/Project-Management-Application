import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle, Loader2, XCircle, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVerifyEmailMutation } from "@/hooks/use-auth";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  useEffect(() => {
    if (token) {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            const errorMessage =
              error.response?.data?.message || "An error occurred";
            setIsSuccess(false);
            toast.error(errorMessage);
          },
        }
      );
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-auth p-4">
      {/* Animated blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-indigo-500/10 animate-blob" />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-violet-500/10 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6 animate-fade-in-up">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-2">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Email Verification</h1>
          <p className="text-white/50">Verifying your email address</p>
        </div>

        <Card className="glass-dark border-white/10 shadow-2xl">
          <CardContent className="pt-10 pb-10">
            <div className="flex flex-col items-center justify-center space-y-5">
              {isVerifying ? (
                <>
                  <div className="relative mb-2">
                    <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 rounded-full bg-indigo-500/10 animate-ping" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Verifying...</h3>
                  <p className="text-sm text-white/50 text-center max-w-[280px] leading-relaxed">
                    Please wait while we securely verify your email address
                  </p>
                </>
              ) : isSuccess ? (
                <>
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Email Verified!</h3>
                  <p className="text-sm text-white/50 text-center max-w-[280px] leading-relaxed">
                    Your email has been verified successfully. You're all set to go.
                  </p>
                  <Link to="/sign-in" className="w-full mt-6">
                    <Button className="w-full h-11 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02] group">
                      Continue to Sign In
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                    <XCircle className="w-10 h-10 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-tight">Verification Failed</h3>
                  <p className="text-sm text-white/50 text-center max-w-[280px] leading-relaxed">
                    Email verification failed. The link may be invalid or has expired.
                  </p>
                  <Link to="/sign-in" className="w-full mt-6">
                    <Button variant="outline" className="w-full h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                      Back to Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
