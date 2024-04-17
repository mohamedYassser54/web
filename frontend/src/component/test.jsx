import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:3001/upload', formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const [images, setImages] = useState([]);

  // Fetch images from server when component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to fetch images from the server
  const fetchImages = () => {
    axios.get('http://localhost:3001/image')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {images.map(image => (
          <img
            key={image.id}
            src={`http://localhost:3001/${image.path}`} // Assuming 'path' contains the relative path of the image
            alt={`Image ${image.id}`}
          />
        ))}

    </div>
  );
}

export default ImageUpload;



backend 



const express = require('express');
const path = require('path');
const multer = require('multer');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware to allow CORS
app.use(cors());

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'work',
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Route for uploading image
app.post('/upload', upload.single('image'), (req, res) => {
  const { filename, path } = req.file;
  connection.query('INSERT INTO images (filename, path) VALUES (?, ?)', [filename, path], (err, result) => {
    if (err) throw err;
    res.send('Image uploaded successfully.');
  });
});

// Route for fetching image
app.get('/image', (req, res) => {
  const sql = "SELECT *  FROM images";
  connection.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
