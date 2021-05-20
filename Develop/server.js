// Dependencies

const express = require('express');
const fs=require('fs');
console.log(__dirname);
const path = require('path');


// Sets up the Express Server

const server = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Basic route that sends the user first to the AJAX Page

server.get("/", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
server.get("/notes", (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
server.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

server.get("*", (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));




// Starts the server to begin listening

server.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
