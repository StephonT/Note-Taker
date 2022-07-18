//creating a route that the front-end can request data from
const { notes } = require('./data/db.json');


//requiring express
const express = require('express');

//If port is any route or 3001
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

//route GET
app.get('/api/notes', (req, res) => {
  res.json(notes);
});


// route to index.html 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
}); 

// route to notes.html 
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/notes.html'));
}); 


//make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });