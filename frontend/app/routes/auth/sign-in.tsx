import { Button } from "@/components/ui/button";
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
import { useLoginMutation } from "@/hooks/use-auth";
import { signInSchema } from "@/lib/schema";
import { useAuth } from "@/provider/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Lock, Zap, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type SigninFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<SigninFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate, isPending } = useLoginMutation();

  const handleOnSubmit = (values: SigninFormData) => {
    mutate(values, {
      onSuccess: (data) => {
        login(data);
        toast.success("Welcome back!");
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
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-indigo-500/15 animate-blob" />
          <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-violet-500/15 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/4 w-56 h-56 rounded-full bg-cyan-500/10 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 max-w-md text-center space-y-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/30">
            <Zap className="w-10 h-10 text-white" />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-lg text-white/50 leading-relaxed">
              Sign in to access your projects, tasks, and team collaboration tools.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["12K+ Tasks", "500+ Teams", "99.9% Up"].map((stat) => (
              <div key={stat} className="glass rounded-xl py-3 px-2">
                <span className="text-sm font-semibold text-white/70">{stat}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-left">
            {[
              "Unlimited workspaces & projects",
              "Real-time team collaboration",
              "Beautiful analytics & reports",
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
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-white">TaskSphere</span>
          </div>

          <Card className="glass-dark border-white/10 shadow-2xl">
            <CardHeader className="text-center pb-2 pt-8">
              <CardTitle className="text-2xl font-bold text-white">Sign In</CardTitle>
              <CardDescription className="text-white/40 mt-1">
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-8 px-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleOnSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70 text-sm font-medium">
                          Email Address
                        </FormLabel>
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
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-white/70 text-sm font-medium">
                            Password
                          </FormLabel>
                          <Link
                            to="/forgot-password"
                            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                          >
                            Forgot password?
                          </Link>
                        </div>
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
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary text-white font-semibold h-11 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02] mt-2 group"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white/40">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                  >
                    Create one free
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

export default SignIn;
