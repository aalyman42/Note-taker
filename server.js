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
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    fs.readFile(`./db/db.json`, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        const newData = parsedData.push(req.body);
        console.log(newData);
        fs.writeFile(
          "./db/db.json",
          newData,
          err ? console.error(err) : console.info(`success`)
        );
        res.json("successfully uploaded");
      }
    });
  }
});
app.listen(3001, () => console.log("Now listening at http://localhost:3001"));
