const multer = require('multer');
const db = require('../db');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// employees cv
app.post('/employees', upload.single('cv'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const { img, email, name, country,linkin ,facebook,} = req.body;
  
  
      const sqlInsert =
        'INSERT INTO `employees` (`img`, `email`, `name`, `country`, `cv`,`linkin`,`facebook`) VALUES (?,? ,?,?, ?, ?, ?)';
      const values = [img, email, name, country,req.file.buffer,linkin ,facebook,];
  
      // Directly insert the record and handle duplicate key error
      await db.query(sqlInsert, values);
  
      return res.status(200).json({ message: 'CV added successfully' });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'User with this email already exists' });
      } else {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    }
  });