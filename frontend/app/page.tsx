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
            _page: numOfPage,
            _per_page: POSTS_PER_PAGE
          }
        });
        setNotes(response.data);
        const totalItems = response.data.length;
        const totalPagesCount = Math.ceil(totalItems / POSTS_PER_PAGE);
        setTotal(totalPagesCount);

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

  const editNote = (index: number, id: number, title: string, content: string, name: string, email: string) => {
    const toEdit: Note = {
      id: id,
      title: title,
      author: {
        name: name,
        email: email,
      },
      content: content
    };
    if (index !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[index] = toEdit;
      setNotes(updatedNotes);
      editNewNote(index, toEdit);

    }
  };

  const editNewNote = async (index: number, edit: Note) => {
    try {
      await axios.put(`${NOTES_URL}/${index + 1}`, {
        id: edit.id,
        title: edit.title,
        content: edit.content,
        author: edit.author
      });
    } catch (error) {
      throw error;
    }
  }

  const deletePost = (index: number, id: number) => {
    if (notes.length > 1) {

      if (index !== -1) {
        notes.splice(index, 1);
        const updatedNotes = [...notes]
        setNotes(updatedNotes);
        deleteNote(id, index);
        setTotal(Math.ceil(updatedNotes.length / POSTS_PER_PAGE));
        if (total > Math.ceil(updatedNotes.length / POSTS_PER_PAGE)) {
          setNumOfPage(0);
        }
      }
     
    }
  }

  const deleteNote = async (id: number, index: number) => {
    try {
      await axios.delete(`${NOTES_URL}/${index+1}`, {
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
          <Pages page={notes.slice(numOfPage * 10, numOfPage * 10 + 10)} editNote={editNote} deletePost={deletePost} notes={notes} />
          <div className='add_new_note'>
            <button className='add_new_note' name='add_new_note' onClick={handleAdd}>Add new note</button>
          </div>
          <Btns numOfPage={numOfPage} setNumOfPage={setNumOfPage} total={total} />
        </div>
      </div>
    </main>
  );
};