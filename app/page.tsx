"use client";
import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';

const NOTES_URL = 'http://localhost:3001/notes';
const POSTS_PER_PAGE = 10;
interface Note {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
}

function Post({ post, index }: { post: Note; index: number }) {
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

function Page({ page }: { page: Note[] }) {

  return (page.map((post: Note, index: number) =>
    <div className='page' id={(index + 1).toString()} key={(index + 1)}>{
      <Post key={post.id} post={post} index={index} />
    }</div>
  ));

}



interface BtnsProps {
  numOfPage: number;
  setNumOfPage: (page: number) => void;
  total: number;
}

function Btns({ numOfPage, setNumOfPage, total }: BtnsProps) {
  const handleClickNext = (): void => {
    if (numOfPage < total - 1) {
      setNumOfPage(numOfPage + 1);
    }
  };

  const handleClickPrevious = (): void => {
    if (numOfPage > 0) {
      setNumOfPage(numOfPage - 1);
    }
  };

  const handleClickFirst = (): void => {
    setNumOfPage(0);
  };

  const handleClickLast = (): void => {
    setNumOfPage(total - 1);
  };

  const handleClickPage = (index: number): void => {
    setNumOfPage(index);
  };

  const pagesToShow: number[] = [];
  const end = Math.min(total, 5);
  let start = Math.min(numOfPage - 2, total - end);
  start = Math.max(0, start);
  for (let i = start; i < start + end; i++) {
    pagesToShow.push(i);
  }

  return (
    <div className='btns'>
      <button name='first' onClick={handleClickFirst} disabled={numOfPage === 0}>
        First
      </button>
      <button name='previous' onClick={handleClickPrevious} disabled={numOfPage === 0}>
        Previous
      </button>
      {pagesToShow.map((pageIndex) => (
        <button
          key={pageIndex}
          name={`page-${pageIndex + 1}`}
          onClick={() => handleClickPage(pageIndex)}
          disabled={numOfPage === pageIndex}
        >
          {pageIndex + 1}
        </button>
      ))}
      <button name='next' onClick={handleClickNext} disabled={numOfPage === total - 1}>
        Next
      </button>
      <button name='last' onClick={handleClickLast} disabled={numOfPage === total - 1}>
        Last
      </button>
    </div>
  );
};



export default function Home(): JSX.Element {
  const [numOfPage, setNumOfPage] = useState<number>(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const promise = axios.get<Note[]>(NOTES_URL, {
      params: {
        _page: numOfPage + 1,
        _per_page: POSTS_PER_PAGE
      }
    });
    promise.then(response => {
      setNotes(response.data);
      const totalCount = parseInt(response.headers['x-total-count'], 10);
      setTotal(Math.ceil(totalCount / POSTS_PER_PAGE));
    }).catch(error => { console.log("Encountered an error:" + error) });
  }, [numOfPage]);

  return (
    <main>
      <div>
        <Page page={notes} />
        <Btns numOfPage={numOfPage} setNumOfPage={setNumOfPage} total={total} />
      </div>
    </main>
  );
};

