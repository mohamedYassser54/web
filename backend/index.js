const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');

const cookieParser = require('cookie-parser');
const bodyParser= require('body-parser');
app.use(cors({
  origin: ["https://web-beta-woad.vercel.app"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
      secret:false,
      maxAge:1000 * 60 * 60 * 24
  }
}))
const db = mysql.createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DBNAME,
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
})

const port = 8081;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
app.get("/m", (req, res) => {
  if (req.session.name) {
    return res.json({ valid: true, name: req.session.name });
  } else {
    return res.json({ valid: false });
  }
});


// remove id

app.delete("/remove/:id",(req,res)=>{
  const id = req.params.id;
  const sql = "DELETE FROM `employees` WHERE id=?"

  db.query(sql,[id],(err,data)=>{
    if (err)return res.json({Message:"error node"})
    return res.json(data);
  })
})

// login

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `name` = ? and password = ?";
  db.query(sql, [req.body.name, req.body.password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length > 0) {
      req.session.name = result[0].name;
      return res.json({ Login: true });
    } else {
      return res.json({ Login: false });
    }
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
