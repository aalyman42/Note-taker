const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const app = express();
const { v4: uuidv4 } = require("uuid");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    const noteString = JSON.stringify(newNote);

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);

        const stringData = JSON.stringify(parsedData, null, 4);
        fs.writeFile("./db/db.json", stringData, (err) =>
          err ? console.error(err) : console.info("success")
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
    res.status(500).json("Error in posting review");
  }
});

app.get("/api/notes", (req, res) => {
  return res.json(db);
});

app.listen(3001, () => console.log("Now listening at http://localhost:3001"));
