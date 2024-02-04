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

  axios.defaults.withCredentials = true;

useEffect(() => {
  axios.get("https://server-one-puce.vercel.app/m")
    .then((res) => {
      if (res.data.valid) {
        setName(res.data.name);
      } else {
        navigate("/emp");
      }
    })
    .catch(err => console.error("Error fetching data:", err));
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  axios.post('https://server-one-puce.vercel.app/login', formData)
  .then(response => {
    // Check the HTTP status code
    if (response.status === 200) {
      // Access the response data
      if (response.data.Login) {
        alert("Data is correct");
        navigate("/m");
      } else {
        alert("Name or Password is incorrect");
      }
    } else {
      // Handle non-200 status codes
      console.error("Unexpected status code:", response.status);
    }
  })
  .catch(error => {
    // Handle errors
    console.error("Error:", error);
  });

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
