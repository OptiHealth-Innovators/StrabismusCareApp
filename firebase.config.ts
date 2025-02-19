// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPXOgKYiQDncKtP6WfCa_kSEMoI8askZs",
  authDomain: "strabismuscare.firebaseapp.com",
  projectId: "strabismuscare",
  storageBucket: "strabismuscare.firebasestorage.app",
  messagingSenderId: "716115746780",
  appId: "1:716115746780:web:22323b8ac04647ae403919"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});