import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase.js";

// AuthContextType shape:
// {
//   user: User | null,
//   loading: boolean,
//   error: string | null,
//   register: (name, email, password, photoURL?) => Promise<void>,
//   login: (email, password) => Promise<void>,
//   logout: () => Promise<void>,
//   googleLogin: () => Promise<void>,
//   updateUserProfile: (name, photoURL?) => Promise<void>,
//   resetPassword: (email) => Promise<void>
// }

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect error:", error);
        setError(error.message);
      });

    return unsubscribe;
  }, []);

  const register = async (name, email, password, photoURL) => {
    if (!auth) {
      const errorMsg = "Authentication is not configured. Please contact support.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || null,
      });
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    if (!auth) {
      const errorMsg = "Authentication is not configured. Please contact support.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    if (!auth) {
      return;
    }
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const googleLogin = async () => {
    if (!auth) {
      const errorMsg = "Authentication is not configured. Please contact support.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth) {
      const errorMsg = "Authentication is not configured. Please contact support.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
    try {
      setError(null);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL || null,
        });
        setUser({ ...auth.currentUser });
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const resetPassword = async (email) => {
    if (!auth) {
      const errorMsg = "Authentication is not configured. Please contact support.";
      setError(errorMsg);
      throw new Error(errorMsg);
    }
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    googleLogin,
    updateUserProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
