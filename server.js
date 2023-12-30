const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(3001, () => console.log("Now listening at http://localhost:3001"));
