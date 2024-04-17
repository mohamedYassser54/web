const db = require('../db');


// getdata
app.get('/get', isAuthenticated, (req, res) => {
    const sql = 'SELECT * FROM `employees`';
    db.query(sql, (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      const formattedData = data.map((item) => ({
        id: item.id,
        email: item.email,
        name: item.name,
        cv: item.cv.toString('base64'),
      }));
  
      return res.json(formattedData);
    });
  });