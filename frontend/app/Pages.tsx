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
    console.log(((props.numOfPage)))
    return (props.page.map((post: Note, index: number) =>
      <div className='page' id={((props.numOfPage)*(index + 1)).toString()} key={(index + 1)}>{
        <Post key={((props.numOfPage*10)+(index + 1))} post={post} id={((props.numOfPage*10)+(index + 1))} editNote={props.editNote} delete = {props.deletePost} notes={props.notes}/>
      }</div>
    ));
  
  }