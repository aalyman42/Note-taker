const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  const { title, text } = req.body;

  if (req.body) {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(req.body);

        const stringData = JSON.stringify(parsedData);
        fs.writeFile("./db/db.json", stringData, (err) =>
          err ? console.error(err) : console.info("success")
        );
        res.json({
          title,
          text,
        });
      }
    });
  }
});
app.listen(3001, () => console.log("Now listening at http://localhost:3001"));
