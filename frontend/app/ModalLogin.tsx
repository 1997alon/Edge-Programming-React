import React, {useState} from "react"
import './styles.css';
import './styles-dark.css';
export default function ModalLogin(props:any){
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = (event:any) => {
        event.preventDefault();
        props.handleLogin(userName, password);
        setUserName("");
        setPassword("");
    };

    const handleCancel = (event:any) => {
        event.preventDefault();
        props.handleLoginCancel(null);
    }

    const handleUserName = (event:any) => {
        setUserName(event.target.value);
    };

    const handlePassword = (event:any) => {
        setPassword(event.target.value);
    };



    return (
        <div className="modalLogin-container">
        <div className="modalLogin">
            <h1 id="h1Edit">Create User</h1>
                <div className="login_form_username">
                <label className="login_form_username">Username:</label>
                <input className="login_form_username"
                name="login_form_username"
                    type="text" 
                    value={userName} 
                    onChange={handleUserName} 
                />
                </div>
                <div className="login_form_password">
                <label className="login_form_password">Password:</label>
                <input 
                    name="login_form_password"
                    className="login_form_password"
                    type="text" 
                    value={password} 
                    onChange={handlePassword} 
                />
                </div>
                </div>
                <button className="login_form" name="login_form" onClick={handleLogin}>Login</button>
                <button className="cancel" name="cancel" onClick={handleCancel}>Cancel</button>
                </div>
        
    );
}