// Dependencies

const express = require('express');
const fs=require('fs');
console.log(__dirname);
const path = require('path');

const database = require("./db/db.json");

//unique id
const { v4: uuidv4 } = require('uuid');



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
        note.id= uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        
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
//id is important

server.delete("/api/notes/:id", function(req, res) {
    const id = req.params.id;

    fs.readFile(`${__dirname}/db/db.json`, 'utf8', function(err, data){
      if(err){
        throw err;
      } else {
        console.log(data);
        const db = [];
        JSON.parse(data).forEach((item, i) => {
          db.push(item);
        });
        db.forEach((item, i) => {
          if(item.id === id) {
            db.splice(i, 1);
          }
        });
        fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(db), function(err){
          if(err) {
            throw err;
          } else {
            console.log("Note added to data base");
          }
        });
        res.redirect("/api/notes");
      }
    });
  });




// Starts the server to begin listening

server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
