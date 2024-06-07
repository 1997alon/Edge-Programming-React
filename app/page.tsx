"use client";
import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import Pages from './Pages';
import Btns from './Btns';
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
        <Pages page={notes} />
        <Btns numOfPage={numOfPage} setNumOfPage={setNumOfPage} total={total} />
      </div>
    </main>
  );
};

