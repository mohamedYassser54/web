const bcrypt = require('bcrypt');
const db = require('../db');

app.post('/signup', (req, res) => {
    const checkIfExistsQuery = "SELECT * FROM register WHERE email = ?";
    
    db.query(checkIfExistsQuery, [req.body.email], (err, result) => {
      if (err) {
        return res.json({ Message: "Error in Node" });
      }
  
      if (result.length > 0) {
        return res.json({ Message: "User already exists" });
      } else {
        const password = req.body.password;
        bcrypt.hash(password.toString(), 10, (hashErr, hash) => {
          if (hashErr) {
            return res.json({ Message: "Error hashing password" });
          }
  
          const sql = "INSERT INTO register (`username`,`email`,`password`,`number`) VALUES (?, ?, ?, ?)";
          const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.number,
          ];
  
          db.query(sql, values, (insertErr, result) => {
            if (insertErr) {
              return res.json({ Message: "Error in Node" });
            }
            return res.json(result);
          });
        });
      }
    });
  });