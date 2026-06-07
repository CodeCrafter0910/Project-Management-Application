import { signUpSchema } from "@/lib/schema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useSignUpMutation } from "@/hooks/use-auth";
import { useAuth } from "@/provider/auth-context";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User, Zap, ArrowRight } from "lucide-react";

export type SignupFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignUpMutation();

  const handleOnSubmit = (values: SignupFormData) => {
    mutate(values, {
      onSuccess: (data: any) => {
        login(data);
        toast.success("Account created successfully", {
          description: "Welcome to TaskSphere!",
        });
        form.reset();
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="min-h-screen flex bg-gradient-auth">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-violet-500/15 animate-blob" />
          <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-indigo-500/15 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/4 w-56 h-56 rounded-full bg-cyan-500/10 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-md text-center space-y-8">
          <div className="relative flex items-center justify-center mx-auto">
             <img
              src="/logo.png"
              alt="TaskSphere"
              className="h-28 w-auto object-contain mix-blend-screen relative z-10"
            />
            {/* Ambient glow behind the logo */}
            <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 rounded-full blur-2xl animate-pulse-glow" />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
              Join TaskSphere
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Create your account and start managing projects with your team today.
            </p>
          </div>

          <div className="space-y-3 text-left pt-4">
            {[
              "Free for small teams up to 5 members",
              "Unlimited projects & tasks creation",
              "Real-time updates and collaboration",
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3 glass rounded-xl py-3 px-4">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-sm text-white/60">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <img
              src="/logo.png"
              alt="TaskSphere"
              className="h-20 w-auto object-contain mix-blend-screen"
            />
          </div>

          <Card className="glass-dark border-white/10 shadow-2xl">
            <CardHeader className="text-center pb-2 pt-8">
              <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
              <CardDescription className="text-white/40 mt-1">
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-8 px-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleOnSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 text-sm font-medium">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                              type="text"
                              placeholder="John Doe"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 rounded-xl h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 text-sm font-medium">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 rounded-xl h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 text-sm font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 rounded-xl h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 text-sm font-medium">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/60 focus:bg-white/8 transition-all duration-200 rounded-xl h-11"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-white font-semibold h-11 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02] mt-4 group"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white/40">
                  Already have an account?{" "}
                  <Link
                    to="/sign-in"
                    className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
