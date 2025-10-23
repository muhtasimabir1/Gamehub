import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import AllGames from "@/pages/AllGames";
import GameDetails from "@/pages/GameDetails";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Profile from "@/pages/Profile";
import UpdateProfile from "@/pages/UpdateProfile";
import NotFound from "@/pages/NotFound";

function Router() {
  const { register, login, logout, googleLogin, updateUserProfile, resetPassword, user, error } = useAuth();

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/games" component={AllGames} />
        <Route path="/game/:id">
          {(params) => (
            <ProtectedRoute>
              <GameDetails />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/login">
          <Login onLogin={login} onGoogleLogin={googleLogin} error={error} />
        </Route>
        <Route path="/register">
          <Register onRegister={register} onGoogleLogin={googleLogin} error={error} />
        </Route>
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/profile">
          <ProtectedRoute>
            <Profile user={user} onLogout={logout} />
          </ProtectedRoute>
        </Route>
        <Route path="/update-profile">
          <ProtectedRoute>
            <UpdateProfile user={user} onUpdateProfile={updateUserProfile} />
          </ProtectedRoute>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
