import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "@/contexts/AuthContext";

// LayoutProps: { children: ReactNode }

export function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} onLogout={logout} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
