// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPXOgKYiQDncKtP6WfCa_kSEMoI8askZs", // Replace with your actual config
  authDomain: "strabismuscare.firebaseapp.com",
  projectId: "strabismuscare",
  storageBucket: "strabismuscare.appspot.com",
  messagingSenderId: "716115746780",
  appId: "1:716115746780:web:22323b8ac04647ae403919"
};

// Initialize Firebase ONLY ONCE.
let app;
let auth;

// Check if Firebase is already initialized.
if (!app) { // Check if the app instance is undefined, not getAuth()
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (error) {
    console.error("Firebase Initialization Error:", error); // Log initialization errors
    // Handle the error appropriately.  Maybe show an error message to the user.
  }
} else {
  auth = getAuth(app); // Pass the app instance to getAuth()
}

export { auth, app }; // Export both app and auth

