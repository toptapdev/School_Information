const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "4321",
  database: "innodb",
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM db_accect", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const lname = req.body.lname;
  const level = req.body.level;
  const contact = req.body.contact;
  const age = req.body.age;

  db.query(
    "INSERT INTO db_accect (name, lname, level, contact, age) VALUES (?,?,?,?,?)",
    [name, lname, level, contact, age],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM db_accect WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});