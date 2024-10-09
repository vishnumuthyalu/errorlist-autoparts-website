// Necessary imports
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";


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

// Initialize Firebase & Firestore database
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);