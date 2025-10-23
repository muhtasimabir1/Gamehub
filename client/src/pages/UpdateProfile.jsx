import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { User, Image, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateProfileSchema } from "@shared/schema.js";
import { useToast } from "@/hooks/use-toast.js";

// Props: { user: any, onUpdateProfile: function }
export default function UpdateProfile({ user, onUpdateProfile }) {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Update Profile - GameHub";
  }, []);

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await onUpdateProfile(data.name, data.photoURL);
      toast({
        title: "Profile updated!",
        description: "Your profile information has been updated successfully.",
      });
      setLocation("/profile");
    } catch (err) {
      console.error("Update profile error:", err);
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="w-fit mb-2" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </Link>
          <CardTitle className="font-display text-3xl">Update Profile</CardTitle>
          <CardDescription>
            Update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
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

              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-update-profile">
                {isLoading ? "Updating..." : "Update Information"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
