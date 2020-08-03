const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const PORT = 8080;
const readfile = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"))


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
// GET /notes - Should return the notes.html file.
// GET * - Should return the index.html file
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.
// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  let note = readfile
  res.json(note)

});
// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  let note = readfile
  // add id property 
  let newObj = {
    "title": req.body.title,
    "text": req.body.text,
    "id": note.length,
  }
  note.push(newObj)
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(note))
  res.json(note)
});
// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique id
// when it's saved.In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete("/api/notes/:id", (req, res) => {
  let note = readfile
  let choosen = req.params.id
  note.splice(choosen, 1)
  // update id of every single elements from deleted element
  for (i = choosen; i < note.length; i++) {
    note[i].id = parseInt(i)
  }
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(note))
  res.json(note)
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
