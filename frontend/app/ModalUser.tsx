import React, {useState} from "react"
import './styles.css';
import './styles-dark.css';
export default function ModalUser(props:any){
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUserName] = useState<string>("");
    const [passwordHash, setPasswordHash] = useState<string>("");

    const handleCreateUser = (event:any) => {
        event.preventDefault();
        props.handleAddingUser(name, email, username, passwordHash);
        setName("");
        setEmail("");
        setUserName("");
        setPasswordHash("");
    };

    const handleCancel = (event:any) => {
        event.preventDefault();
        props.handleAddingCancel(null);
    }

    const handleName = (event:any) => {
        setName(event.target.value);
    };

    const handleEmail = (event:any) => {
        setEmail(event.target.value);
    };
    const handleUserName = (event:any) => {
        setUserName(event.target.value);
    };

    const handlePasswordHash = (event:any) => {
        setPasswordHash(event.target.value);
    };



    return (
        <div className="modalUser-container">
        <div className="modalUser">
            <h1 id="h1Edit">Create User</h1>
            <div className="create_user_form_name">
                <div className="add-title">
                <label className="add-label-name">Name:</label>
                <input className="create_user_form_name"
                    type="text" 
                    name="create_user_form_name"
                    value={name} 
                    onChange={handleName} 
                />
                </div>
                <div className="create_user_form_email">
                <label className="add-label-content">Email:</label>
                <input 
                    className="create_user_form_email"
                    name="create_user_form_email"
                    type="text" 
                    value={email} 
                    onChange={handleEmail} 
                />
                </div>
                <div className="create_user_form_username">
                <label className="create_user_form_username">Username:</label>
                <input className="create_user_form_username"
                name="create_user_form_username"
                    type="text" 
                    value={username} 
                    onChange={handleUserName} 
                />
                </div>
                <div className="create_user_form_password">
                <label className="create_user_form_password">Password:</label>
                <input 
                    name="create_user_form_password"
                    className="create_user_form_password"
                    type="text" 
                    value={passwordHash} 
                    onChange={handlePasswordHash} 
                />
                </div>
                </div>
                <button className="create_user_form_create_user" name="create_user_form_create_user" onClick={handleCreateUser}>Create User</button>
                <button className="create_user_form_cancel" name="create_user_form_cancel" onClick={handleCancel}>Cancel</button>
                </div>
        </div>
    );
}