import React, { useState } from 'react';
import postsData from './data/notes.json';

interface Note {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
}

function Post({post,index} : {post:Note; index:number}){
  return(<div className='post' id={(index+1).toString()}>
      <h2 className='post-title'>{post.title} </h2>
      <small>By {post.author.name}</small>
      <br></br>
      <p className='content'>
        {post.content}
      </p>
  </div>
  );

}

function Page({ page }: { page: Note[] }) {

  return (page.map((post:Note,index:number)=>
  <div className='page' id={(index+1).toString()} key={(index+1)}>{
    <Post key={post.id} post={post} index={index} />
  }</div>
  ));

}



export default function Home() {
  const { notes } = postsData as { notes: Note[] };
  let list : Note[][] = [];
  for(let i = 0 ; i< notes.length;i=i+10){
    list.push(notes.slice(i,i+10));
  }

  const toShow = list.map((page: Note[], index: number) => (
    <div className='page' id={(index + 1).toString()} key={index+1}>
      <Page page={page} />
    </div>
  ));



  return (
    <main>
      <div>
     {toShow[0]}
      </div>
    </main>
  );
}
