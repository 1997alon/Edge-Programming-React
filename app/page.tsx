import React from 'react';
import postsData from './data/notes.json';

export default function Home() {

  const { notes } = postsData;

  const toShow = notes.map((post) => (
    <div key={post.id} className="post" id={post.id.toString()}>
      <h2 className="post-title">Note {post.id}</h2>
      <small className="post-content">By Author {post.author.name}</small>
      <br></br>
      <p>{post.content}</p>  
    </div>
  ));

  return (
    <main>
      <div>
        {toShow}
      </div>
    </main>
  );
}
