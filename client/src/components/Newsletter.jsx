import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast.js";
import { newsletterSchema } from "@shared/schema.js";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = newsletterSchema.safeParse({ email });

    if (!result.success) {
      toast({
        title: "Invalid email",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubscribed(true);
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive the latest gaming news and updates.",
    });
    setEmail("");

    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid="text-newsletter-title">
          Stay Updated
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-newsletter-description">
          Subscribe to our newsletter and never miss out on new game releases, exclusive deals, and indie developer spotlights.
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center gap-2 text-primary" data-testid="text-newsletter-success">
            <CheckCircle className="h-6 w-6" />
            <span className="font-semibold">Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              data-testid="input-newsletter-email"
            />
            <Button type="submit" className="sm:w-auto" data-testid="button-newsletter-subscribe">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
