const db = require('../db');


// remove
app.delete("/remove/:id",(req,res)=>{
    const id = req.params.id;
    const sql = "DELETE FROM `employees` WHERE id=?"
  
    db.query(sql,[id],(err,data)=>{
      if (err)return res.json({Message:"error node"})
      return res.json(data);
    })
  })
  