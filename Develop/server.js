// Dependencies

const express = require('express');
const fs=require('fs');
console.log(__dirname);
const path = require('path');

const database = require("./db/db.json");


// Sets up the Express Server

const server = express();
//for environment - process.env
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
//for static files
server.use(express.static(path.join(__dirname, "./public"))); 

// Basic route that sends the user first to the AJAX Page

server.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
server.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
server.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));



//Push notes to the Server

server.post('/api/notes', function(req, res) {
    const newNote = req.body;

    //reads db.json file, parses information and pushes notes variable into the file.
    fs.readFile('db/db.json', (err, data) => {
      if (err) throw err;
      
      let myNotes = JSON.parse(data);
      myNotes.push(newNote);

      myNotes.forEach((note, index)=>{
        note.id= 1
        note.id++;
        return myNotes;
      })
      res.json(newNote);
     
      stringMyData = JSON.stringify(myNotes);

      fs.writeFile('db/db.json', stringMyData, (err, data) => {
        if (err) throw err;
      });
    });
    
  });



//See the notes on the app

server.get('/api/notes', function(req, res) {
    fs.readFile('db/db.json', (err, data) => {
      if (err) {
      throw err;}

      JSON.parse(data);
      res.send(data);
    });
  });

//Delete notes






// Starts the server to begin listening

server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
