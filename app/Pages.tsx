import React from 'react';
import './styles.css';
import Post from './Post';

interface Note {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
      email: string;
    };
  }

export default function Pages({ page ,numOfPage }: { page: Note[] , numOfPage: number}) {

    return (page.map((post: Note, index: number) =>
      <div className='page' id={(index + 1).toString()} key={(index + 1)}>{
        <Post key={index+ (numOfPage*10)} post={post} index={index+ (numOfPage*10)} />
      }</div>
    ));
  
  }