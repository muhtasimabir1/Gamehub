import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { User, Mail, Lock, Image, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { registerSchema } from "@shared/schema.js";

// Props: { onRegister: function, onGoogleLogin: function, error: string | null }
export default function Register({ onRegister, onGoogleLogin, error }) {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = "Register - GameHub";
  }, []);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      photoURL: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await onRegister(data.name, data.email, data.password, data.photoURL);
      setLocation('/');
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await onGoogleLogin();
    } catch (err) {
      console.error("Google login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="font-display text-3xl text-center">Join GameHub</CardTitle>
          <CardDescription className="text-center">
            Create an account to start your gaming journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" data-testid="alert-error">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          placeholder="Your name"
                          className="pl-10"
                          data-testid="input-name"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photoURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Image className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://example.com/photo.jpg"
                          className="pl-10"
                          data-testid="input-photo-url"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          onChange={(e) => {
                            field.onChange(e);
                            setPassword(e.target.value);
                          }}
                          data-testid="input-password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {password && (
                <div className="space-y-2 text-sm" data-testid="password-requirements">
                  <div className={`flex items-center gap-2 ${hasMinLength ? "text-chart-3" : "text-muted-foreground"}`}>
                    {hasMinLength ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <span>At least 6 characters</span>
                  </div>
                  <div className={`flex items-center gap-2 ${hasUppercase ? "text-chart-3" : "text-muted-foreground"}`}>
                    {hasUppercase ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-2 ${hasLowercase ? "text-chart-3" : "text-muted-foreground"}`}>
                    {hasLowercase ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                    <span>One lowercase letter</span>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-register">
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            data-testid="button-google-register"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Sign up with Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" data-testid="link-login">
              <span className="text-primary hover:underline cursor-pointer">Sign in</span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
