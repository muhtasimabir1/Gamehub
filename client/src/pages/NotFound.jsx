import { useEffect } from "react";
import { Link } from "wouter";
import { Home, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 - Page Not Found | GameHub";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <Gamepad2 className="h-24 w-24 mx-auto text-primary mb-4 opacity-50" />
          <h1 className="font-display text-8xl md:text-9xl font-bold text-primary mb-4" data-testid="text-404">
            404
          </h1>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid="text-not-found-title">
            Game Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-not-found-description">
            Looks like this page got lost in the digital void. Let's get you back to the action!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" data-testid="button-home">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/games">
            <Button variant="outline" size="lg" data-testid="button-games">
              <Gamepad2 className="h-5 w-5 mr-2" />
              Browse Games
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
