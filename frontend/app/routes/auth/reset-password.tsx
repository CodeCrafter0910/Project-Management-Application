import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/hooks/use-auth";
import { resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Loader2, Lock, Zap } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid token");
      return;
    }

    resetPassword(
      { ...values, token: token as string },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message;
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-auth p-4">
      {/* Animated blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-indigo-500/10 animate-blob" />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-violet-500/10 animate-blob animation-delay-2000" />
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10 animate-fade-in-up">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl shadow-indigo-500/30 mb-2">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Reset Password</h1>
          <p className="text-white/50 text-center">Create a new secure password</p>
        </div>

        <Card className="glass-dark border-white/10 shadow-2xl">
          <CardHeader className="pb-3 pt-6">
            <Link to="/sign-in" className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors text-sm font-medium w-fit">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to sign in</span>
            </Link>
          </CardHeader>

          <CardContent className="pb-8">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Password Updated
                </h2>
                <p className="text-white/50 text-sm leading-relaxed max-w-[280px]">
                  Your password has been reset successfully. You can now use it to sign in to your account.
                </p>
                <Link to="/sign-in" className="w-full mt-2">
                  <Button className="w-full h-11 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300">
                    Sign In Now
                  </Button>
                </Link>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    name="newPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 text-sm font-medium">New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 rounded-xl h-11"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 text-sm font-medium">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 rounded-xl h-11"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-white font-semibold h-11 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02] mt-2"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
