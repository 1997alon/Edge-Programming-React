"use client";
import React, { useEffect, useState } from 'react';
import './styles.css';
import './styles-dark.css';
import axios from 'axios';
import Pages from './Pages';
import Btns from './Btns';
import Modal from './Modal';
import ModalLogin from './ModalLogin';
import ModalUser from './ModalUser';

const NOTES_URL = 'http://localhost:3001/notes';
const LOGIN_URL = 'http://localhost:3001/login';
const USERS_URL = 'http://localhost:3001/users';


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

interface User {
  name: String,
  email: String,
  username: String,
  passwordHash: String
}


export default function Home(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [numOfPage, setNumOfPage] = useState<number>(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [theme, setTheme] = useState<boolean>(false);
  const [openModalUser, setOpenModalUser] = useState<boolean>(false);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log(numOfPage);
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
  const handleAdding = (title: string, content: string) => {
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

  const editNote = (id: number, title: string, content: string) => {
    let check = false;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        if (notes[i].author.name === name && notes[i].author.email === email) {
          check = true;
        }
      }
    }
    if (check) {
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
    }
  };

  const editNewNote = async (id: number, edit: Note) => {
    try {
      await axios.put(`${NOTES_URL}/${id}`, {
        id: edit.id,
        title: edit.title,
        content: edit.content,
        author: edit.author,
      login: true
    });
    } catch (error) {
      throw error;
    }
  }

  const deletePost = (id: number) => {
    if (notes.length > 1 || numOfPage > 0) {
      let check = false;
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
          if (notes[i].author.name === name && notes[i].author.email === email) {
            check = true;
          }
        }
      }
      if (check) {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        deleteNote(id);
        setTotal(Math.ceil(updatedNotes.length / POSTS_PER_PAGE));
        if (total > Math.ceil(updatedNotes.length / POSTS_PER_PAGE)) {
          setNumOfPage(0);
        }
      }
    }
  }

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`${NOTES_URL}/${id}`, {
        data: { id: id, login: true }
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

  const handleAddUser = () => {
    setOpenModalUser(true);
  }
  const handleAddLogin = () => {
    setOpenModalLogin(true);
  }

  const handleAddingUser = async (name: string, email: string, username: string, passwordHash: string) => {
    const newUser: User = {
      name: name,
      email: email,
      username: username,
      passwordHash: passwordHash
    };
    try {
      const response = await axios.post(USERS_URL, newUser, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      const newUsers = [...users, response.data];
      setUsers(newUsers);
      setOpenModalUser(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(LOGIN_URL, { username, password });
      let match = false;
      for (let i = 0; i < users.length; i++) {
        console.log(users[i].username);
        console.log(users[i].passwordHash);
        if (users[i].passwordHash === password && users[i].username === username) {
          match = true;
          setName(users[i].name as string);
          setEmail(users[i].email as string);
        }
      }
      if (match) {
        setToken(response.data.token);
        setLogin(true);

      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
    setOpenModalLogin(false);
  };

  const handleAddingCancelUser = (c: any) => {
    setOpenModalUser(false);
  }
  const handleLoginCancel = (c: any) => {
    setOpenModalLogin(false);
  }

  const handleLogOut = () => {
    setLogin(false);
    setToken("");
  }


  return (
    <main>
      {openModalLogin ? (
        <div>
          <ModalLogin handleLogin={handleLogin} handleLoginCancel={handleLoginCancel} />
          <div className='login_form'>

          </div>
        </div>
      ) : openModalUser ? (
        <div>
          <ModalUser handleAddingUser={handleAddingUser} handleAddingCancel={handleAddingCancelUser} />
          <div className='create_user_form'>

          </div>
        </div>
      ) : (
        <div>
          {openModal && <Modal handleAdding={handleAdding} handleAddingCancel={handleAddingCancel} />}
          <div>
            <button className='change_theme' name='change_theme' onClick={handletheme} >Theme</button>
            <Pages page={(() => {
                let startIdx = 0;
                // cache
                if (total <= 5 || numOfPage<=4) {
                  startIdx = numOfPage * 10;
                }
                if (numOfPage - 2 >= 0 && numOfPage + 2 <= total) {
                  startIdx = 20;
                }
                else if (numOfPage === total - 1) {
                  startIdx = 40;
                }
                else if (numOfPage === total - 2) {
                  startIdx = 30;
                }
                return notes;
              })()}
             editNote={editNote} deletePost={deletePost} notes={notes} numOfPage={numOfPage} login={login} />
            {login && (
              <div>
                <div className='add_new_note'>
                  <button className='add_new_note' name='add_new_note' onClick={handleAdd}>Add new note</button>
                </div>
                <div className='logout'>
                  <button className='logout' name='logout' onClick={handleLogOut}>Logout</button>
                </div>
              </div>
            )}
            <div className='create-login'>
              <button className='create_user_form' name='create_user_form' onClick={handleAddUser}>Create new user</button>
              <button className='login_form' name='login_form' onClick={handleAddLogin}>Login</button>
              <Btns numOfPage={numOfPage} setNumOfPage={setNumOfPage} total={total} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
