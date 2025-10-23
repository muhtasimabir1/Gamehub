import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { forgotPasswordSchema } from "@shared/schema.js";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast.js";

export default function ForgotPassword() {
  const [, setLocation] = useLocation();
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Forgot Password - GameHub";
  }, []);

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await resetPassword(data.email);
      setEmailSent(true);
      toast({
        title: "Password reset email sent!",
        description: "Check your inbox for instructions to reset your password.",
      });
    } catch (err) {
      console.error("Password reset error:", err);
      toast({
        title: "Error sending reset email",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="w-fit mb-2" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </Link>
          <CardTitle className="font-display text-3xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <Alert className="bg-chart-3/10 border-chart-3" data-testid="alert-success">
              <CheckCircle className="h-4 w-4 text-chart-3" />
              <AlertDescription className="text-chart-3">
                Password reset email sent! Check your inbox for instructions.
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            data-testid="input-email"
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-reset-password">
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We'll send you an email with instructions to reset your password
                </p>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
