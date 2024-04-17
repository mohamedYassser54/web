const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'work',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    throw err;  // You may choose to handle this error differently based on your application's requirements.
  }
  console.log('Connected to the database');
});

module.exports = db;
