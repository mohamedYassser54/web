const express = require('express');
const db = require('../db');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
    }
  });
  
  
  const upload = multer({ storage: storage });
  
  app.use(express.static('public'))
app.post("/employeess", upload.single('images'), async (req, res) => {
    try {
       const images = req.file.filename;
       console.log("Image uploaded:", images);
       const sql = "INSERT INTO `employees` (`img`) VALUES (?)";
       await db.query(sql, [images]);
       res.json({ Status: "success" });
    } catch (err) {
       console.error("Error in /employeess route:", err);
       res.status(500).json({ Message: "Internal Server Error" });
    }
  });