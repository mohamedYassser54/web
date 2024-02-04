import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './css/login.module.css'
import axios from 'axios';

function Emp() {
  const [formData, setData] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  axios.defaults.withCredentials =true;

  useEffect(()=>{
    axios.get("https://server-one-puce.vercel.app/m")
    .then((res)=>{
      if(res.data.valid){
        navigate("/m");
      }else{
        navigate("/emp")
      }
    })
    .catch(err => console.log(err))
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();

    axios.post('https://server-one-puce.vercel.app/login',formData)
    .then(res=>{
      if(res.data.Login){
        alert("Data is correct")
      navigate("/m")
      }else{
        alert("name or Password is incorrect");
      }
      console.log(res);
    })
    .catch(err => console.log(err))
    
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.card}>
        {/* <label htmlFor="name">Name:</label> */}
        <input type="text" id="name" name="name" placeholder="Name" required onChange={handleChange} />
        <br />
        {/* <label htmlFor="password">Password:</label> */}
        <input type="password" id="password" name="password" placeholder="Password" required onChange={handleChange} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Emp;
