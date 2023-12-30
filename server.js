const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  return res.json(db);
});

app.post("/api/notes", (req, res) => {
  const { title, text, id } = req.body;

  if (title && text && id) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    const noteStringify = JSON.stringify(newNote);

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const buildJson = JSON.parse(data);
        buildJson.push(newNote);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(buildJson, null, 4),
          (err) => (err ? console.error(err) : console.log("success"))
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("failed to post note");
  }
});

app.listen(3001, () => console.log("Now listening at http://localhost:3001"));
