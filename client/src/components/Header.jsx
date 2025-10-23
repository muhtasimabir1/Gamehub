import { useState } from "react";
import { Link, useLocation } from "wouter";
import { User, LogIn, UserPlus, Gamepad2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// HeaderProps: { user: any | null, onLogout?: () => void }

export function Header({ user, onLogout }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 transition-transform duration-200 cursor-pointer">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                GameHub
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" data-testid="link-nav-home">
              <Button
                variant="ghost"
                className={location === "/" ? "text-primary" : ""}
                data-testid="button-nav-home"
              >
                Home
              </Button>
            </Link>
            <Link href="/games" data-testid="link-nav-games">
              <Button
                variant="ghost"
                className={location === "/games" ? "text-primary" : ""}
                data-testid="button-nav-games"
              >
                All Games
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 hover:bg-accent rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            {user ? (
              <Link href="/profile" data-testid="link-profile">
                <Avatar className="h-10 w-10 ring-2 ring-primary cursor-pointer hover-elevate active-elevate-2 rounded-full transition-transform duration-200" data-testid="avatar-user">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" data-testid="link-login">
                  <Button variant="ghost" size="sm" data-testid="button-login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register" data-testid="link-register">
                  <Button variant="default" size="sm" data-testid="button-register">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              <Link href="/" data-testid="link-mobile-nav-home">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${location === "/" ? "text-primary" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Button>
              </Link>
              <Link href="/games" data-testid="link-mobile-nav-games">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${location === "/games" ? "text-primary" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Games
                </Button>
              </Link>
              
              <div className="border-t border-border my-2"></div>
              
              {user ? (
                <Link href="/profile" data-testid="link-mobile-nav-profile">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${location === "/profile" ? "text-primary" : ""}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" data-testid="link-mobile-nav-login">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" data-testid="link-mobile-nav-register">
                    <Button
                      variant="default"
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
