const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup body parser - to translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));

// Setup the songs router
// to respond to requests from the `/songs` URL
let songsRouter = require('./routes/songs.router');
let musicLibraryRouter = require('./routes/musicLibrary');

app.use('/songs', songsRouter);
app.use('/musicLibrary', musicLibraryRouter);


// Start express
const PORT = 5001;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});

