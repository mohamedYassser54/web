const mysql = require("mysql2");


const conn = mysql.createPool({
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DBNAME,
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0
})


conn.connect((error)=>{
    if(error) throw error;
    console.log("connected !")
});

module.exports = conn