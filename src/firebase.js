// Necessary imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Fixed import path
import { getAuth } from "firebase/auth";  // Import Firebase Authentication

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzkuF4tVCTvDa83_VbYJPqXfX5IaCT2qU",
    authDomain: "auto-store-65b0a.firebaseapp.com",
    projectId: "auto-store-65b0a",
    storageBucket: "auto-store-65b0a.appspot.com",
    messagingSenderId: "793534024793",
    appId: "1:793534024793:web:255c119a4d4a81b8e57548",
    measurementId: "G-FDJYR4QV42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Authentication
export const firestore = getFirestore(app);
export const auth = getAuth(app);  // Initialize Firebase Authentication

// Sign in feature
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
    } catch (error) {
        console.error("Error signing up:", error);
    }
};

// Sign out feature
import { signOut } from "firebase/auth";

const logOut = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};