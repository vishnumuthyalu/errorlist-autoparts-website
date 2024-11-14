import React, { useState, useEffect } from 'react';
import '../styles/Account.css';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../backend/firebase.js';

export const Account = () => {
    const [action, setAction] = useState("Sign up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);  // To store the logged-in user

    // Handle the signup process
    const handleSignup = async () => {
        if (action === "Sign up") {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User signed up:", userCredential.user);
            } catch (error) {
                console.error("Error signing up:", error);
            }
        } else {
            setAction("Sign up");
        }
    };

    // Handle the login process
    const handleLogin = async () => {
        if (action === "Login") {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in:", userCredential.user);
            } catch (error) {
                console.error("Error logging in:", error);
            }
        } else {
            setAction("Login");
        }
    };

    // Handle the sign-out process
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
            setUser(null);  // Clear the user state
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Track authentication state (listen for login/logout events)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);  // Set the logged-in user in the state
            } else {
                setUser(null);  // Clear the user state if no one is logged in
            }
        });

        return () => unsubscribe();  // Cleanup listener on component unmount
    }, []);

    if (user) {
        // If the user is logged in, show their account info and sign-out option
        return (
            <div className="account-info-container">
                <h2>Welcome, {user.email}</h2>
                <p>Your account information:</p>
                <ul>
                    <li>Email: {user.email}</li>
                    {/* You can add more user information here, if needed */}
                </ul>
                <div className="submit-container">
                    <button className="submit" onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        );
    }

    // If no user is logged in, show the sign-up and login form
    return (
        <div className="login-container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <EmailIcon />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="input">
                    <PersonIcon />
                    <input type="username" placeholder="Username" disabled /> {/* You can enable this for signup */}
                </div>
                <div className="input">
                    <LockIcon />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
            </div>
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignup}>Sign Up</div>
                <div className={action === "Sign up" ? "submit gray" : "submit"} onClick={handleLogin}>Login</div>
            </div>
        </div>
    );
};