import React, { useState, useEffect } from 'react';
import '../styles/Account.css';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import profilePic from '../assets/user-profile-pic.png'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../backend/firebase.js';

export const Account = () => {
    const [action, setAction] = useState("Sign up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async () => {
        if (action === "Sign up") {
            setErrorMessage("");
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User signed up:", userCredential.user);
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    setErrorMessage("An account with this email already exists.");
                } else if (error.code === "auth/invalid-email") {
                    setErrorMessage("Please enter a valid email.");
                } else if (error.code === "auth/weak-password") {
                    setErrorMessage("Password should be at least 6 characters long.");
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
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
                if (error.code === "auth/user-not-found") {
                    setErrorMessage("No account found with this email.");
                } else if (error.code === "auth/wrong-password") {
                    setErrorMessage("Incorrect password. Please try again.");
                } else if (error.code === "auth/invalid-email") {
                    setErrorMessage("Please enter a valid email.");
                } else {
                    setErrorMessage("An unexpected error occurred. Please try again.");
                }
                console.error("Error logging in:", error);
            }
        } else {
            setAction("Login");
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    if (user) {
        return (
            <div className="login-container">
                <h1>Welcome!</h1>
                <img className={"profile-pic"} src={profilePic} alt={"generic profile picture"}/>
                <h2>Your account information:</h2>
                    <p>Email: {user.email}</p>
                <div className="submit-container">
                    <button className="submit" onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <EmailIcon />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMessage("");
                        }}
                        placeholder="Email" />
                </div>
                {action === "Sign up" && (
                    <div className="input">
                        <PersonIcon/>
                        <input
                            type="username"
                            placeholder="Username"
                            onChange={() => setErrorMessage("")}
                        />
                    </div>
                )}
                <div className="input">
                    <LockIcon/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrorMessage("");
                        }}
                        placeholder="Password" />
                </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignup}>Sign Up</div>
                <div className={action === "Sign up" ? "submit gray" : "submit"} onClick={handleLogin}>Login</div>
            </div>
        </div>
    );
};