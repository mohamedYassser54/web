const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.json());

const port =8081;

const db = mysql.createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DBNAME,
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
})

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});


app.get("/", (req, res) => {
  return res.json("backend");
});



// login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM login WHERE username = ? AND password = ?';

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
    } else if (result.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

app.listen(port||process.env.PORT , () => {
  console.log(`Server is running on port ${port}`);
});
