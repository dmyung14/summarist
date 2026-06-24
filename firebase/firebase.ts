// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwzp3yj3vYVCk5dsKoJKCn9IUBidTbDrM",
  authDomain: "summarist-4ef6d.firebaseapp.com",
  projectId: "summarist-4ef6d",
  storageBucket: "summarist-4ef6d.firebasestorage.app",
  messagingSenderId: "881919437927",
  appId: "1:881919437927:web:284e26d9df4cd1857ab8c2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
