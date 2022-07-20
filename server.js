//requiring express
const express = require('express');
const fs = require('fs');
const path = require('path');

//If port is any route or 3001
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();


//Middleware Functions

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

//middleware for public files
app.use(express.static('public'));
// End of Middleware

//creating a route that the front-end can request data from
const { notes } = require('./data/db.json');


// function handling taking the data from req.body and adding it to our db.json file
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  
  //path to write file
  fs.writeFileSync(
    path.join(__dirname, './data/db.json'),
    JSON.stringify({ notes : notesArray }, null, 2)
  );

  //return finished code to post route for response
  return note;
};

//validate function
function validateNote(note) {
  if(!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
};

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

//POST Routes
app.post('/api/notes', (req, res) => {
// set id based on what the next index of the array will be
req.body.id = notes.length.toString();

//if any data in req.body is incorrect, send 400 error back
if (!validateNote(req.body)) {
  res.status(400).send('This note is not properly formatted.');
} else {
  //add notes to json file and notes array in this function
  const note = createNewNote(req.body, notes);

  res.json(note);
}

});

// delete notes
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  let note;

  notes.map((element, index) => {
    if (element.id == id){
      note = element
      notes.splice(index, 1)
      return res.json(note);
    } 
  
  })
});


//make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

  