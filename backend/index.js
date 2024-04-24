require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn.jsx");
const cors = require("cors");
const router = require("./routes/router")
const port = 8004;



app.use(express.json());
app.use(cors());

app.use("/uploads",express.static("./uploads"))
app.use(router)

app.listen(port,()=>{
    console.log("server start")
})

















// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const cors = require('cors');
// const multer = require('multer');
// const bcrypt = require('bcrypt');
// const dotenv =require( 'dotenv');
// const cookieParser = require('cookie-parser');
// const nodemailer = require("nodemailer");



// const app = express();
// const port =8081;


// app.use(cors()); 
// app.use(bodyParser.json());
// app.use(cookieParser()); 
// dotenv.config()
// // app.use(session({
// //   secret: 'secret',
// //   resave: false, 
// //   saveUninitialized: false,
// //   cookie:{
// //       secret:false,
// //       maxAge:1000 * 60 * 60 * 24
// //   }
// // }))

// const isAuthenticated = (req, res, next) => {
//   const isLoggedIn = req.cookies && req.cookies.isLoggedIn === 'true'; // Check if req.cookies is defined
//   if (isLoggedIn) {
//     next();
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };


// app.options('*', cors());
// app.use(cors({
//    credentials: true,
//     origin: 'http://localhost:5173' 
//   }));
// app.use(express.json());


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'work',
// });

// db.connect();


// app.get("/", (req, res) => {
//   return res.json("backend");
// });






// // sigupUser
// const randomCode = Math.floor(1000 + Math.random() * 9000);

// app.post('/signup', (req, res) => {
//   // Sending email with the random code
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'moo499220@gmail.com', // Replace with your email
//       pass: 'ynrn icdv eket hjwp' // Replace with your email password
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
//   });

//   const mailOptions = {
//     from: 'moo499220@gmail.com', // Replace with your email
//     to: req.body.email,
//     subject: 'Verification Code',
//     text: `Your verification code is: ${randomCode}`
//   };

//   transporter.sendMail(mailOptions, (emailErr, emailInfo) => {
//     if (emailErr) {
//       return res.json({ Message: "Error sending verification email" });
//     }

//     const checkIfExistsQuery = "SELECT * FROM register WHERE email = ?";

//     db.query(checkIfExistsQuery, [req.body.email], (err, result) => {
//       if (err) {
//         return res.json({ Message: "Error in Node" });
//       }

//       if (result.length > 0) {
//         return res.json({ Message: "User already exists" });
//       } else {
//         const password = req.body.password;
//         bcrypt.hash(password.toString(), 10, (hashErr, hash) => {
//           if (hashErr) {
//             return res.json({ Message: "Error hashing password" });
//           }

//           const sql = "INSERT INTO register (`username`,`email`,`password`,`number`) VALUES (?, ?, ?, ?)";
//           const values = [
//             req.body.username,
//             req.body.email,
//             hash,
//             req.body.number,
//           ];

//           db.query(sql, values, (insertErr, result) => {
//             if (insertErr) {
//               return res.json({ Message: "Error in Node" });
//             }
//             return res.json(result);
//           });
//         });
//       }
//     });
//   });
// });



// // signupcompany
// app.post('/signupcompany', (req, res) => {
//   const checkIfExistsQuery = "SELECT * FROM company WHERE email = ?";
  
//   db.query(checkIfExistsQuery, [req.body.email], (err, result) => {
//     if (err) {
//       return res.json({ Message: "Error in Node" });
//     }

//     if (result.length > 0) {
//       return res.json({ Message: "User already exists" });
//     } else {
//       const password = req.body.password;
//       bcrypt.hash(password.toString(), 10, (hashErr, hash) => {
//         if (hashErr) {
//           return res.json({ Message: "Error hashing password" });
//         }

//         const sql = "INSERT INTO company (`username`,`email`,`password`,`number`) VALUES (?, ?, ?, ?)";
//         const values = [
//           req.body.username,
//           req.body.email,
//           hash,
//           req.body.number,
//         ];

//         db.query(sql, values, (insertErr, result) => {
//           if (insertErr) {
//             return res.json({ Message: "Error in Node" });
//           }
//           return res.json(result);
//         });
//       });
//     }
//   });
// });

// // logincompany
// app.post("/logincompany", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const sql = "SELECT * FROM company WHERE `email` = ?";
//   db.query(sql, [email], (err, result) => {
//     if (err) return res.json({ Message: "Error inside server" });

//     if (result.length > 0) {
//       bcrypt.compare(password, result[0].password, (err, response) => {
//         if (err) {
//           return res.json({ Message: "Error comparing passwords" });
//         }
//         if (response) {
//           return res.json({ Message: "Logged in successfully" });
//         } else {
//           return res.json({ Message: "Wrong password" });
//         }
//       });
//     } else {
//       return res.json({ Message: "User not found" });
//     }
//   });
// });


// // loginUser
// app.post("/loginUser", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const sql = "SELECT * FROM register WHERE `email` = ?";
//   db.query(sql, [email], (err, result) => {
//     if (err) return res.json({ Message: "Error inside server" });

//     if (result.length > 0) {
//       bcrypt.compare(password, result[0].password, (err, response) => {
//         if (err) {
//           return res.json({ Message: "Error comparing passwords" });
//         }
//         if (response) {
//           return res.json({ Message: "Logged in successfully" });
//         } else {
//           return res.json({ Message: "Wrong password" });
//         }
//       });
//     } else {
//       return res.json({ Message: "User not found" });
//     }
//   });
// });



// // employees cv
// app.post('/employees', upload.single('cv'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const {  email, name, country,linkin ,facebook,} = req.body;



//     const sqlInsert =
//       'INSERT INTO `employees` ( `email`, `name`, `country`, `cv`,`linkin`,`facebook`) VALUES (? ,?,?, ?, ?, ?)';
//     const values = [ email, name, country,req.file.buffer,linkin ,facebook,];

//     // Directly insert the record and handle duplicate key error
//     await db.query(sqlInsert, values);

//     return res.status(200).json({ message: 'CV added successfully' });
//   } catch (error) {
//     if (error.code === 'ER_DUP_ENTRY') {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     } else {
//       console.error('Database error:', error);
//       return res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
//   }
// });


// //post companydata

// app.post('/companydata2', (req, res) => {
//   const sql = 'INSERT INTO `companydata2` (`email`, `name`, `country`, `linkin`, `facebook`) VALUES (?, ?, ?, ?, ?)';
//   const values = [req.body.email, req.body.name, req.body.country, req.body.linkin, req.body.facebook];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error in Node:', err);
//       return res.json({ Message: 'Error in Node' });
//     }
//     return res.json(result);
//   });
// });





// // getdata
// app.get('/get', isAuthenticated, (req, res) => {
//   const sql = 'SELECT * FROM `employees`';
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }

//     const formattedData = data.map((item) => ({
//       id: item.id,
//       email: item.email,
//       name: item.name,
//       cv: item.cv.toString('base64'),
//     }));

//     return res.json(formattedData);
//   });
// });

// // GetDataComEmp
// app.get('/getdata', (req, res) => {
//   const sql = 'SELECT `employees`.`img`,`employees`.`name`,`employees`.`country`,`employees`.`cv` ,`employees`.`linkin`,`employees`.`facebook` FROM `employees`';
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }

//     const formattedData = data.map((item) => ({
//       id: item.id,
//       img: item.img,
//       linkin: item.linkin,
//       facebook: item.facebook,
//       name: item.name,
//       country: item.country,
//       cv: item.cv.toString('base64'),
//     }));

//     return res.json(formattedData);
//   });
// });
// // companydata
// app.get('/companydata', (req, res) => {
//   const sql = 'SELECT * FROM `companydata2`';
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }

//     const formattedData = data.map((item) => ({
//       id: item.id,
//       img: item.img,
//       email: item.email,
//       linkin: item.linkin,
//       facebook: item.facebook,
//       name: item.name,
//       country: item.country,
//     }));

//     return res.json(formattedData);
//   });
// });

// // remove
// app.delete("/remove/:id",(req,res)=>{
//   const id = req.params.id;
//   const sql = "DELETE FROM `employees` WHERE id=?"

//   db.query(sql,[id],(err,data)=>{
//     if (err)return res.json({Message:"error node"})
//     return res.json(data);
//   })
// })


// // login
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }

//     if (results.length > 0) {
//       res.cookie('isLoggedIn', true, { expires: new Date(Date.now() + 24 * 3600000) }); // Set the isLoggedIn cookie
//       res.json({ success: true, message: 'Login successful' });
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// require("dotenv").config();
// const express = require("express");
// const app = express();
// require("./db/conn");
// const cors = require("cors");
// const router = require("./routes/router")
// const port = 8004;


// app.use(express.json());
// app.use(cors());

// app.use("/uploads",express.static("./uploads"))
// app.use(router)

// app.listen(port,()=>{
//     console.log("server start")
// })