// GET /notes - Should return the notes.html file.
// GET * - Should return the index.html file
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const { notStrictEqual } = require("assert");
const PORT = 8080;

// Sets up the Express App
// =============================================================

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());


// The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.
// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  let note = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"))
  res.note
});
// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  let note = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"))
  req.body.Title.attr(readonly) = false
  req.body.Text.attr(readonly) = false
  note.push(req.body)
  console.log(note)
  // req.body = note
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(note))
  res.note
});
// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique id
// when it's saved.In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.





app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
