const bcrypt = require('bcrypt');
const db = require('../db');

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM register WHERE `email` = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json({ Message: 'Error inside server' });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) {
          return res.status(500).json({ Message: 'Error comparing passwords' });
        }

        if (response) {
          return res.json({ Message: 'Logged in successfully' });
        } else {
          return res.json({ Message: 'Wrong password' });
        }
      });
    } else {
      return res.json({ Message: 'User not found' });
    }
  });
};

module.exports = { loginUser };
