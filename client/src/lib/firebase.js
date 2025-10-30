import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

let app;
let auth;

try {
  if (import.meta.env.VITE_FIREBASE_API_KEY && 
      import.meta.env.VITE_FIREBASE_PROJECT_ID && 
      import.meta.env.VITE_FIREBASE_APP_ID) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    console.warn("Firebase environment variables are not set. Authentication features will be disabled.");
    auth = null;
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  auth = null;
}

export { auth };
