// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVadjKXYC0tIGAG75QNzUSNyj2jvhwF54",
  // authDomain: "test-a3b19.firebaseapp.com",
  authDomain: "https://qr-code-generator-jify.onrender.com",
  projectId: "test-a3b19",
  storageBucket: "test-a3b19.appspot.com",
  messagingSenderId: "425640217548",
  appId: "1:425640217548:web:b080c5e4f1ef5b84036b69",
  measurementId: "G-H263KELDDZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
