import React, { useState } from "react"
import "./modal-edit.css";

export default function ModalEdit(props: any) {


    const handleSave = (event: any) => {
        event.preventDefault();
        let findIndex = -1
        for (let i = 0; i<props.notes.length; i++){
          if (props.notes[i].id === props.id){
            findIndex = i
          }
        }
        props.editNote(findIndex, props.id, props.title, props.content, props.name, props.email);
        props.setOpenModalEdit(false);

    };

    const handleCancel = (event: any) => {
        event.preventDefault();
        props.setOpenModalEdit(false);
    }

    const handleTitle = (event: any) => {
        props.setTitle(event.target.value);
    };

    const handleContent = (event: any) => {
        props.setContent(event.target.value);
    };

    const handleName = (event: any) => {
        props.setName(event.target.value);
    };

    const handleEmail = (event: any) => {
        props.setEmail(event.target.value);
    };


    return (
        <div className="modal-container">
            <div className="modal">
                <h1 id="h1Edit">Edit</h1>
                <div className={"text_input-" + props.id.toString()}>
                    <div className="add-title">
                        <label className="add-label-title">Title:</label>
                        <input className="titleAdd"
                            name={"text_input-" + props.id.toString()}
                            type="text"
                            value={props.title}
                            onChange={handleTitle}
                        />
                    </div>
                    <div className="add-content">
                        <label className="add-label-content">Content:</label>
                        <input
                            name={"text_input-" + props.id.toString()}
                            className="contentAdd"
                            type="text"
                            value={props.content}
                            onChange={handleContent}
                        />
                    </div>
                    <div className="add-name">
                        <label className="add-label-name">Name:</label>
                        <input className="nameAdd"
                            name={"text_input-" + props.id.toString()}
                            type="text"
                            value={props.name}
                            onChange={handleName}

                        />
                    </div>
                    <div className="add-email">
                        <label className="add-label-email">Email:</label>
                        <input
                            className="emailAdd"
                            name={"text_input-" + props.id.toString()}
                            type="text"
                            value={props.email}
                            onChange={handleEmail}
                        />
                    </div>
                </div>
                <button className={`text_input_save-${props.id}`} name={`text_input_save-${props.id}`} onClick={handleSave}>Save</button>
                <button className={`text_input_cancel-${props.id}`} name={`text_input_cancel-${props.id}`} onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}