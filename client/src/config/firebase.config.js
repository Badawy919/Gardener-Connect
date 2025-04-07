import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// console.log("API Key:", import.meta.env.VITE_API_KEY);
// console.log("Auth Domain:", import.meta.env.VITE_AUTH_DOMAIN);
// console.log("Project ID:", import.meta.env.VITE_PROJECT_ID);
// console.log("Storage Bucket:", import.meta.env.VITE_STORAGE_BUCKET);
// console.log("Messaging Sender ID:", import.meta.env.VITE_MESSAGING_SENDER_ID);
// console.log("App ID:", import.meta.env.VITE_APP_ID);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth
export const auth = getAuth(app);