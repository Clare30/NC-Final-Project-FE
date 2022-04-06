import { initializeApp } from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "REDACTED",
  authDomain: "animon-c914f.firebaseapp.com",
  projectId: "animon-c914f",
  storageBucket: "animon-c914f.appspot.com",
  messagingSenderId: "42067647858",
  appId: "REDACTED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
