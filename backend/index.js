const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');

const app = express();
const port = 8081;
app.use(cors()); 
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://web-beta-woad.vercel.app',
}));


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

app.post('/login', (req, res) => {
  console.log('Received login request:', req.body); // Log the incoming request

  const { username, password } = req.body;
  db.query('SELECT * FROM `login` WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.json({ success: false, message: 'An error occurred on the server' });
    } else {
      if (results.length > 0) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    }
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
