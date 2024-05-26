"use client";
import React, { useState } from 'react';
import postsData from './data/notes.json';
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



interface BtnsProps {
  numOfPage: number;
  setNumOfPage: (page: number) => void;
  list: any[];
}

const Btns: React.FC<BtnsProps> = ({ numOfPage, setNumOfPage, list }) => {
  const handleClickNext = (): void => {
    if (numOfPage < list.length - 1) {
      setNumOfPage(numOfPage+1);
    }
  };

  const handleClickPrevious = (): void => {
    if (numOfPage > 0) {
      setNumOfPage(numOfPage-1);
    }
  };

  const handleClickFirst = (): void => {
    setNumOfPage(0);
  };

  const handleClickLast = (): void => {
    setNumOfPage(list.length - 1);
  };

  const handleClickPage = (index: number): void => {
    setNumOfPage(index);
  };

  let pagesToShow: number[];
  if (list.length <= 5) {
    pagesToShow = list.map((_, index) => index);
  } else if (numOfPage < 3) {
    pagesToShow = [0, 1, 2, 3, 4];
  } else if (numOfPage >= 3 && numOfPage < 8) {
    pagesToShow = [numOfPage - 2, numOfPage - 1, numOfPage, numOfPage + 1, numOfPage + 2];
  } else {
    pagesToShow = [list.length - 5, list.length - 4, list.length-3, list.length -2, list.length-1];
  }

  return (
    <div className='btns'>
      <button onClick={handleClickFirst} disabled={numOfPage === 0}>
        First
      </button>
      <button onClick={handleClickPrevious} disabled={numOfPage === 0}>
        Previous
      </button>
      {pagesToShow.map((pageIndex) => (
        <button
          key={pageIndex}
          onClick={() => handleClickPage(pageIndex)}
          disabled={numOfPage === pageIndex}
        >
          Page {pageIndex + 1}
        </button>
      ))}
      <button onClick={handleClickNext} disabled={numOfPage === list.length - 1}>
        Next
      </button>
      <button onClick={handleClickLast} disabled={numOfPage === list.length - 1}>
        Last
      </button>
    </div>
  );
};



export default function Home(): JSX.Element {
  const [numOfPage, setNumOfPage] = useState<number>(0);

  const { notes } = postsData as { notes: Note[] };
  let list: Note[][] = [];
  for (let i = 0; i < notes.length; i += 10) {
    list.push(notes.slice(i, i + 10));
  }

  const toShow = list.map((page: Note[], index: number) => (
    <div className='page' id={(index + 1).toString()} key={index + 1}>
      <Page page={page} />
    </div>
  ));
  const clone: Note[][] = (toShow as JSX.Element[]).map((element) => {
    return (element.props.page as Note[]);
  }).slice(0, 5);
  
  return (
    <main>
      <>
        {toShow[numOfPage]}
        <Btns numOfPage={numOfPage} setNumOfPage={setNumOfPage} list={list}/>
      </>
    </main>
  );
}
