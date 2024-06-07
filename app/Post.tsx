import React from 'react';
import './styles.css';

interface Note {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
      email: string;
    };
  }

export default function Post({ post, index }: { post: Note; index: number }) {
    return (<div className='post' id={(index + 1).toString()}>
      <h2 className='post-title'>{post.title} </h2>
      <small>By {post.author.name}</small>
      <br></br>
      <p className='content'>
        {post.content}
      </p>
    </div>
    );
  }