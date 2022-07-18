//creating a route that the front-end can request data from
const { notes } = require('./data/db.json');


//requiring express
const express = require('express');

//If port is any route or 3001
const PORT = process.env.PORT || 3001;

//instantiate the server
const app = express();

//Middleware Functions
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// End of Middleware

function createNewNote(body, notesArray) {
  console.log(body);
  const note = body;
  notesArray.push(notes);
  
  //path to write file
  fs.writeFileSync(
    path.join(__dirname, './data/db.json'),
    JSON.stringify({ notes : notesArray }, null, 2)
  );

  //return finished code to post route for response
  return note;
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
  //req.body is where incoming content will be
  console.log(req.body);
  res.json(req.body)
});


//make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });