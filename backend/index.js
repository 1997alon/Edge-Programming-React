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

    nt = '/notes/:index';
    app.delete(nt, async (req, res) => {
      const { id } = req.body;
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
      const { id } = req.params;
      const { title, content, author } = req.body;

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
        return res.status(status201).json(updatedNote);
      } catch {
        return res.status(status500).json("Error");
      }
    });


    nt = '/notes'
    app.get(nt, async (req, res) => {
      try {
        const notes = await Note.find();
        res.status(status200).json(notes);
      } catch {
        console.log("Get did not work");
        res.status(status500).json('Error');
      }
    });

    er = 'Error connecting to MongoDB'
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log(er);
  });
