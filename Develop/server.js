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
server.use(express.static(path.join(__dirname, "public"))); 

// Basic route that sends the user first to the AJAX Page

server.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
server.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
server.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

//Catch all
server.get("*", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));


//Push notes to the Server

server.post('/api/notes', (req, res) => {

    fs.readFile(path.join(__dirname, '/db/db.json'), "utf8", (err, resp) => {
        if (err) {
            console.log(err);
        }
        
        const notes = JSON.parse(resp);

        //url body
        const myNotes = req.body;

        const newNote = {
            title: myNotes.title,
            text: myNotes.text,
        };

        notes.push(newNote);
        res.json(newNote);

        //Need write file method to push notes on the app 

        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(database), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log("Your note saved!");
        });
        
    });
});



//See the notes on the app

server.get("/api/notes/:title", (req, res) => {
    const selectNotes = req.params.title;
    res.json(selectNotes);
});

//Delete notes
server.delete("/api/notes/:title"), (req, res) => {
    const deleteTitle= req.param.title;
    res.json(deleteTitle);


};





// Starts the server to begin listening

server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
