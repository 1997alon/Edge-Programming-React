"use client";
import React, { useEffect, useState } from 'react';
import './styles.css';
import './styles-dark.css';
import axios from 'axios';
import Pages from './Pages';
import Btns from './Btns';
import Modal from './Modal';

const NOTES_URL = 'http://localhost:3001/notes';
const POSTS_PER_PAGE = 10;

interface Note {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
}



export default function Home(): JSX.Element {
  const [numOfPage, setNumOfPage] = useState<number>(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [count, setCount] = useState<number>(2);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(NOTES_URL, {
          params: {
            _page: numOfPage + 1,
            _per_page: 10
          }
        });
      
        setNotes(response.data.notes);
        setTotal(response.data.totalPagesCount);

      } catch (error) {
        console.error('Encountered an error:', error);
      }
    };

    fetchData();
  }, [numOfPage]);



  const handleAdd = () => {
    setOpenModal(true);
  }
  const handleAdding = (title: string, content: string, name: string, email: string) => {
    const newNote: Note = {
      id: count,
      title: title,
      author: {
        name: name,
        email: email,
      },
      content: content
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    const newCount = count + 1;
    setCount(newCount);

    setOpenModal(false);
    setTotal(Math.ceil(newNotes.length / POSTS_PER_PAGE));
    addNewNote(newNote);
  }

  const handleAddingCancel = (c: any) => {
    setOpenModal(false);
  }

  const addNewNote = async (newNote: Note) => {

    try {
      await axios.post(NOTES_URL, newNote);
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }

  const editNote = (id: number, title: string, content: string, name: string, email: string) => {
    const toEdit: Note = {
      id: id,
      title: title,
      author: {
        name: name,
        email: email,
      },
      content: content
    };
    const updatedNotes = notes.map(note => note.id === id ? toEdit : note);
    setNotes(updatedNotes);
    editNewNote(id, toEdit);
  };

  const editNewNote = async (id: number, edit: Note) => {
    try {
      await axios.put(`${NOTES_URL}/${id}`, {
        id: edit.id,
        title: edit.title,
        content: edit.content,
        author: edit.author
      });
    } catch (error) {
      throw error;
    }
  }

  const deletePost = (id: number) => {
    if (notes.length > 1 || numOfPage>0) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      deleteNote(id);
      setTotal(Math.ceil(updatedNotes.length / POSTS_PER_PAGE));
      if (total > Math.ceil(updatedNotes.length / POSTS_PER_PAGE)) {
        setNumOfPage(0);
      }

    }
  }

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`${NOTES_URL}/${id}`, {
        data: { id: id }
      });
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }
  const handletheme = () => {
    setTheme(prevTheme => !prevTheme);
    document.body.classList.toggle('dark');
  }
  return (
    <main>
      <div>{openModal && <Modal handleAdding={handleAdding} handleAddingCancel={handleAddingCancel} />}
        <div>
          <button className='change_theme' name='change_theme' onClick={handletheme}>Theme</button>
          <Pages page={notes} editNote={editNote} deletePost={deletePost} notes={notes} numOfPage={numOfPage} />
          <div className='add_new_note'>
            <button className='add_new_note' name='add_new_note' onClick={handleAdd}>Add new note</button>
          </div>
          <Btns numOfPage={numOfPage} setNumOfPage={setNumOfPage} total={total} />
        </div>
      </div>
    </main>
  );
};
