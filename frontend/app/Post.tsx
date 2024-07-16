"use client";

import ModalEdit from './ModalEdit';
import React, {useState} from 'react';
import './styles.css';

interface Note {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
}

export default function Post(props: any) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const handleEdit = () => {
    setOpenModalEdit(true);
    setTitle(props.post.title);
    setName(props.post.author.name);
    setEmail(props.post.author.email);
    setContent(props.post.content);
  }
  const handleDelete = () => {
    props.delete(props.post.id);
  }
    return (<div className='note' id={(props.id).toString()}>{openModalEdit && <ModalEdit setOpenModalEdit={setOpenModalEdit} editNote={props.editNote} title={title} name={name} email={email} content={content} setTitle={setTitle} setName={setName} setEmail={setEmail} setContent={setContent} id={props.post.id} notes={props.notes}/>}
      <h2 className='post-title'>{props.post.title} </h2>
      <small>By {props.post.author ? props.post.author.name : ''}</small>
      <br></br>
      <p className='content'>
        {props.post.content}
      </p>
      {props.login && (
      <div className='edit-delete'>
      <button className={`edit-${props.id}`} name={`edit-${props.id}`} onClick={handleEdit}>Edit</button>
      <button className={`delete-${props.id}`} name={`delete-${props.id}`} onClick={handleDelete}>Delete</button>
      </div>
      )}
    </div>
    );
  }
