import React, {useState} from 'react';
import '../styles/Account.css';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth }  from '../firebase.js';

export const Account = () => {

    const [action, setAction] = useState("Sign up");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        if(action == "Sign up"){
            //perform sign up here
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User signed up:", userCredential.user);
            } catch (error) {
                console.error("Error signing up:", error);
            }
        }
        else{
            setAction("Sign up");
        }
    }

    const handleLogin = async () => {
        if(action == "Login"){
            //perform login here
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in:", userCredential.user);
            } catch (error) {
                console.error("Error logging in:", error);
            }
        }
        else{
            setAction("Login");
        }
    }

    return (
        <div className={"login-container"}>
            <div className={"header"}>
                <div className={"text"}>{action}</div>
                <div className={"underline"}></div>
            </div>
            <div className={"inputs"}>
                {action === "Login" ? <div></div> : <div className={"input"}>
                    <EmailIcon/>
                    <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"}/>
                </div>}
                <div className={"input"}>
                    <PersonIcon/>
                    <input type={"username"} placeholder={"Username"}/>
                </div>

                <div className={"input"}>
                    <LockIcon />
                    <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={"Password"}/>
                </div>
            </div>
            <div className={"submit-container"}>
                <div className={action==="Login"?"submit gray":"submit"} onClick={handleSignup}>Sign Up</div>
                <div className={action==="Sign up"?"submit gray":"submit"} onClick={handleLogin}>Login</div>
            </div>

        </div>
    );
};