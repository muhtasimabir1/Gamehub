import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Mail, User as UserIcon, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Props: { user: any, onLogout: function }
export default function Profile({ user, onLogout }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.title = "My Profile - GameHub";
  }, []);

  if (!user) {
    setLocation("/login");
    return null;
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 ring-4 ring-primary" data-testid="avatar-profile">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-display text-2xl mb-1" data-testid="text-profile-name">
                    {user.displayName || "User"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Gamer Profile</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/update-profile">
                  <Button variant="outline" size="sm" data-testid="button-edit-profile">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={onLogout} data-testid="button-logout">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium" data-testid="text-profile-email">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Display Name</p>
                  <p className="font-medium" data-testid="text-profile-display-name">
                    {user.displayName || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
