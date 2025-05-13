// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMl8HuaQQQBEU154eviks5U6LFNfc-OAw",
  authDomain: "projects-2025-7d8c6.firebaseapp.com",
  projectId: "projects-2025-7d8c6",
  storageBucket: "projects-2025-7d8c6.firebasestorage.app",
  messagingSenderId: "733661701016",
  appId: "1:733661701016:web:d800cab1c5458d986641ed",
  measurementId: "G-W7MZX03PT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
const analytics = getAnalytics(app);