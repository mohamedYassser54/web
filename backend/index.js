const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 8081;
app.use(cors()); 
app.use(bodyParser.json());


app.options('*', cors());

app.use(express.json());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const db = mysql.createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DBNAME,
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
})




app.get("/", (req, res) => {
  return res.json("backend");
});

app.post("/employees", upload.single('cv'), (req, res) => {
  const sql = "INSERT INTO `employees` (`name`, `cv`) VALUES (?, ?)";
  const values = [req.body.name, req.file.buffer];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
    return res.status(200).json({ message: "CV added successfully" });
  });
});


app.get("/get", (req, res) => {
  const sql = "SELECT * FROM `employees`";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    
    const formattedData = data.map((item) => ({
      id: item.id,
      name: item.name,
      cv: item.cv.toString('base64'), 
    }));

    return res.json(formattedData);
  });
});


// m
// app.get("/m", (req, res) => {
//   res.header("Access-Control-Allow-Origin", "https://web-beta-woad.vercel.app");
//   res.header("Access-Control-Allow-Credentials", true);

//   try {
//     if (req.session.name) {
//       return res.json({ valid: true, name: req.session.name });
//     } else {
//       return res.json({ valid: false });
//     }
//   } catch (error) {
//     console.error("Error in /m route:", error);
//     return res.status(500).json({ Message: "Internal Server Error" });
//   }
// });




// remove id

app.delete("/remove/:id",(req,res)=>{
  const id = req.params.id;
  const sql = "DELETE FROM `employees` WHERE id=?"

  db.query(sql,[id],(err,data)=>{
    if (err)return res.json({Message:"error node"})
    return res.json(data);
  })
})

/// login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
