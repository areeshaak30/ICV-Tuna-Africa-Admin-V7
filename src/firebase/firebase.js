// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1n6XSwLlcO0U-Ob_k_lkzRMDskWVCcsI",
  authDomain: "tuna-user-app.firebaseapp.com",
  projectId: "tuna-user-app",
  storageBucket: "tuna-user-app.firebasestorage.app",
  messagingSenderId: "462327106906",
  appId: "1:462327106906:web:69c71342b8819e5a33b763",
  measurementId: "G-2YPN2JD3GV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;