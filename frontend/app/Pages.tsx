import React from 'react';
import './styles.css';
import Post from './Post';

interface Note {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
}

export default function Pages(props: any) {

    return (props.page.map((post: Note, index: number) =>
      <div className='page' id={(index + 1).toString()} key={(index + 1)}>{
        <Post key={post.id} post={post} id={post.id} editNote={props.editNote} delete = {props.deletePost} />
      }</div>
    ));
  
  }