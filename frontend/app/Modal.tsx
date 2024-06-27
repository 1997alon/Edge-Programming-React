import React, {useState} from "react"
import "./modal.css";

export default function Modal(props:any){
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSave = (event:any) => {
        event.preventDefault();
        props.handleAdding(title,content,name,email);
        setTitle("");
        setContent("");
        setName("");
        setEmail("");
 
    };
    const handleCancel = (event:any) => {
        event.preventDefault();
        props.handleAddingCancel(null);
    }

    const handleTitle = (event:any) => {
        setTitle(event.target.value);
    };

    const handleContent = (event:any) => {
        setContent(event.target.value);
    };

    const handleName = (event:any) => {
        setName(event.target.value);
    };

    const handleEmail = (event:any) => {
        setEmail(event.target.value);
    };

    return (
        <div className="modal-container">
        <div className="modal">
            <h1 id="h1Edit">Add</h1>
            <div className="text_input_new_note">
                <div className="add-title">
                <label className="add-label-title">Title:</label>
                <input className="titleAdd"
                    type="text" 
                    name="text_input_new_note"
                    value={title} 
                    onChange={handleTitle} 
                />
                </div>
                <div className="add-content">
                <label className="add-label-content">Content:</label>
                <input 
                    className="contentAdd"
                    name="text_input_new_note"
                    type="text" 
                    value={content} 
                    onChange={handleContent} 
                />
                </div>
                <div className="add-name">
                <label className="add-label-name">Name:</label>
                <input className="nameAdd"
                name="text_input_new_note"
                    type="text" 
                    value={name} 
                    onChange={handleName} 
                />
                </div>
                <div className="add-email">
                <label className="add-label-email">Email:</label>
                <input 
                    name="text_input_new_note"
                    className="emailAdd"
                    type="text" 
                    value={email} 
                    onChange={handleEmail} 
                />
                </div>
                </div>
                <button className="text_input_save_new_note" name="text_input_save_new_note" onClick={handleSave}>Save</button>
                <button className="text_input_cancel_new_note" name="text_input_cancel_new_note" onClick={handleCancel}>Cancel</button>
                </div>
        </div>
    );
}