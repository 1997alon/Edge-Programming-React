ourPort = 3001
status200 = 200
status500 = 500
status404 = 404
status201 = 201
status400 = 400
status204 = 204


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || ourPort;

app.use(bodyParser.json());
fs.writeFileSync(path.join(__dirname, 'log.txt'), '', 'utf-8');

const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
const logger = (req, res, next) => {
  const logMessage = `Time: ${new Date().toISOString()} , HTTP request method: ${req.method} , Request target path: ${req.originalUrl} , Request body: ${JSON.stringify(req.body)}\n`;
  logStream.write(logMessage);
  next();
};
app.use(logger);

const url = process.env.MONGODB_CONNECTION_URL;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected');

    const noteSchema = new mongoose.Schema({
      id: Number,
      title: String,
      author: {
        name: String,
        email: String,
      },
      content: String
    });

   

    const Note = mongoose.model('Note', noteSchema);


    nt = '/notes/:id';
    app.delete(nt, async (req, res) => {
      const { id, login} = req.body;
      if (!login) {
        return res.status(403).json("Unauthorized");
      }
      try {
        const idToDelete = await Note.findOneAndDelete({ id: id });
        if (!idToDelete) {
          return res.status(404).json("Error");
        }
        else {
          return res.status(status204).json('success');
        }

      } catch {
        res.status(status500).json("Error");
      }
    });

    nt = '/notes/:id'
    app.get(nt, async (req, res) => {
      const noteId = parseInt(req.params.id, 10);
      try {
        const note = await Note.findOne({ id: noteId });
        if (note) {
          res.status(status200).json(note);
        } else {
          res.status(status404).json('Error');
        }
      } catch {
        res.status(status500).json('Error');
      }
    });




    
    nt = '/notes'
    app.post(nt, (request, response) => {
      const { id, title, content, author } = request.body;
      const newNote = new Note({
        id,
        title,
        author: {
          name: author.name,
          email: author.email,
        },
        content
      });
      newNote.save()
        .then(savedNote => {
          console.log('Note saved');
          response.status(status201).json(savedNote);
        })
        .catch(() => {
          response.status(status500).json("Error");
        });
    });

    nt = '/notes/:id'
    app.put(nt, async (req, res) => {
      const { id, title, content, author, login } = req.body;
      if (!login) {
        return res.status(403).json("Unauthorized");
      }
      try {
        const updatedNote = await Note.findOneAndUpdate(
          { id: parseInt(id) },
          {
            title,
            author: {
              name: author.name,
              email: author.email,
            },
            content
          },
          { new: true }
        );

        if (!updatedNote) {
          return res.status(status404).json("Error");
        }
        return res.status(status200).json(updatedNote);
      } catch {
        return res.status(status500).json("Error");
      }
    });


    nt = '/notes'
    app.get(nt, async (req, res) => {
      try {
        const numOfPage = parseInt(req.query._page);
        const POSTS_PER_PAGE = parseInt(req.query._per_page) || 10;

        const notes = await Note.find()
          .skip((numOfPage - 1) * POSTS_PER_PAGE)
          .limit(POSTS_PER_PAGE);

        const totalItems = await Note.countDocuments();
        const totalPagesCount = Math.ceil(totalItems / POSTS_PER_PAGE);
        res.status(200).json({ notes, totalPagesCount });
      } catch {
        console.log("Get did not work");
        res.status(status500).json('Error');
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((er) => {
    console.log(er + ' Error connecting to MongoDB');
  });

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    passwordHash: String
  });
const users = mongoose.model('users', userSchema);


app.post('/users', async (req, res) => {
  try {
    const { name, email, username, passwordHash } = req.body;
    const newUser = new users({
      name,
      email,
      username,
      passwordHash,
    });
    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
     const user = await users.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    if (user.passwordHash!==password) {
      console.log('Invalid password');
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' });
    res.json({ token, name: user.name, email: user.email });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

