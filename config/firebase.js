import { initializeApp } from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB28CNgXglmGuIQRtOOtK38eMKB55udqnE",
  authDomain: "animon-c914f.firebaseapp.com",
  projectId: "animon-c914f",
  storageBucket: "animon-c914f.appspot.com",
  messagingSenderId: "42067647858",
  appId: "1:42067647858:web:0423518a430196dc1991eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
