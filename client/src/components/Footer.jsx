import { Gamepad2, Github, Twitter, Youtube } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold">GameHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover and support indie game developers. Your next favorite game awaits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" data-testid="link-footer-home">
                  <span className="hover:text-primary transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/games" data-testid="link-footer-games">
                  <span className="hover:text-primary transition-colors cursor-pointer">All Games</span>
                </Link>
              </li>
              <li>
                <Link href="/register" data-testid="link-footer-register">
                  <span className="hover:text-primary transition-colors cursor-pointer">Join Us</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-md transition-colors"
                data-testid="link-social-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-md transition-colors"
                data-testid="link-social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate active-elevate-2 p-2 rounded-md transition-colors"
                data-testid="link-social-youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GameHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
