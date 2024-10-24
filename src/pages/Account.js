import React, {useState} from 'react';
import '../styles/Account.css';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';

export const Account = () => {

    const [action, setAction] = useState("Sign Up");

    return (
        <div className={"login-container"}>
            <div className={"header"}>
                <div className={"text"}>{action}</div>
                <div className={"underline"}></div>
            </div>
            <div className={"inputs"}>
                {action === "Login" ? <div></div> : <div className={"input"}>
                    <EmailIcon/>
                    <input type={"email"} placeholder={"Email"}/>
                </div>}
                <div className={"input"}>
                    <PersonIcon/>
                    <input type={"username"} placeholder={"Username"}/>
                </div>

                <div className={"input"}>
                    <LockIcon />
                    <input type={"password"} placeholder={"Password"}/>
                </div>
            </div>
            <div className={"submit-container"}>
                <div className={action==="Login"?"submit gray":"submit"} onClick={() => {setAction("Sign up")}}>Sign Up</div>
                <div className={action==="Sign up"?"submit gray":"submit"} onClick={() => {setAction("Login")}}>Login</div>
            </div>

        </div>
    );
};