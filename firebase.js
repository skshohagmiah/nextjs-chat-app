// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfVLmzTwC7GliuzxzD-MwokfH-dhsUcjE",
  authDomain: "chat-a8c47.firebaseapp.com",
  projectId: "chat-a8c47",
  storageBucket: "chat-a8c47.appspot.com",
  messagingSenderId: "1037773702830",
  appId: "1:1037773702830:web:e2138493f0d98a851d8f3f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);