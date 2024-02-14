const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const dotenv =require( 'dotenv');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8081;
app.use(cors()); 
app.use(bodyParser.json());
app.use(cookieParser()); 
dotenv.config()
app.use(cors({
  origin: 'https://web-beta-woad.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length'],
}));


// const isAuthenticated = (req, res, next) => {
//   const isLoggedIn = req.cookies && req.cookies.isLoggedIn === 'true';
//   console.log('isLoggedIn:', isLoggedIn); // Add this line for debugging
//   if (isLoggedIn) {
//     next();
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };


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





// sigup

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

// loginUser
app.post("/loginUser", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = "SELECT * FROM register WHERE `email` = ?";
  db.query(sql, [email], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) {
          return res.json({ Message: "Error comparing passwords" });
        }
        if (response) {
          return res.json({ Message: "Logged in successfully" });
        } else {
          return res.json({ Message: "Wrong password" });
        }
      });
    } else {
      return res.json({ Message: "User not found" });
    }
  });
});



// employees cv

app.post("/employees", upload.single('cv'), (req, res) => {
  const checkIfExistsQuery = "SELECT * FROM employees WHERE email = ?";
  const sql = "INSERT INTO `employees` (`email`, `name`, `cv`) VALUES (?, ?, ?)";
  const values = [req.body.email, req.body.name, req.file.buffer];

  // Check if user already exists
  db.query(checkIfExistsQuery, [req.body.email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // If user doesn't exist, proceed with the insertion
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
      }
      return res.status(200).json({ message: "CV added successfully" });
    });
  });
  });



// getdata
app.get('/get', (req, res) => {
  const sql = 'SELECT * FROM `employees` WHERE password = ? AND name = ?';
  db.query(sql,  (err, data) => {
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

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      // Set the isLoggedIn cookie upon successful login
      res.cookie('isLoggedIn', true, { expires: new Date(Date.now() + 24 * 3600000) });
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
