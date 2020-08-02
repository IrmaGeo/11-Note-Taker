// GET /notes - Should return the notes.html file.
// GET * - Should return the index.html file
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const { notStrictEqual } = require("assert");
const PORT = 3000;

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

// The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.
// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  let data = fs.readFileSync(__dirname + "/db/db.json")
  let note = JSON.parse(data)
  res.json(note)

});

// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  let note = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"))
  console.log(req.body)
  note.push(req.body)
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(note))
  res.json(note)
});
// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete.
// This means you'll need to find a way to give each note a unique id
// when it's saved.In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.





app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
