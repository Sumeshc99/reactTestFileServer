const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

app.get("/", (req, res) => {
  res.json("hello this is backand");
});

app.post("/signUp", (req, res) => {
  const q = "INSERT INTO signup (name, email, password) VALUES (?)";
  const values = [req.body.fullName, req.body.email, req.body.password];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("New account has created");
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if the provided email and password match a record in the "signup" table
  const query = "SELECT * FROM signup WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("Login successfull");
    }

    // if (results.length === 1) {
    //   return res.json("Login successfull");
    // } else {
    //   return res.json("Login failed");
    // }
  });
});

app.listen(3001, () => {
  console.log("app connected to the backend!");
});

app.use(express.json());
