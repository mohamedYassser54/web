import React,{useEffect, useState} from 'react'
import axios from 'axios';
import $ from 'jquery';
import 'jquery-mask-plugin';


import styles from "../css/signup.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
function Signup() {
    useEffect(()=>{
        $('#numberma').mask('000 0000 0000');
      }, []);
  const [formData,setData] = useState({
    username: "",
    email:"",
    password:"",
    number:"",
  });
  const navigate = useNavigate();

  const handleChange =(e)=>{
    setData(prev=>({...prev,[e.target.name]:[e.target.value]}))
  
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('https://server-three-mauve-23.vercel.app/signup', formData)
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.Message === "User already exists") {
          alert("User already exists");
        } else {
          navigate('/signin');
          alert("Data Inserted Successfully");
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className={styles.container}>
   
    <div className={styles.signbox}>
    <span className={styles.iconimage}>
    {/* <img src={Img} alt="" /> */}
    </span>
    <h1>Sign up </h1>
    <div>
   {/* <!-----inp--------------> */}
  
     <div className={styles.inp}>
       <input type="text" placeholder="Name"name="username" spellCheck="false" required onChange={handleChange}/>
        <input type="Email" placeholder="Email"name="email" required onChange={handleChange}/>
        <input type="password" placeholder="Password"name="password" required onChange={handleChange}/>
       <input type="text" placeholder="Mobile number" id="numberma" name="number" required onChange={handleChange}/>
        
      
     </div>
     

  
  {/* <!-------------btn--------------> */}
  <div className={styles.btn} > 
 <button onClick={handleSubmit}>Register</button>
  </div>
  <div className={styles.texts}>
 <span> Already have an account? </span>

 
  <strong> <NavLink to ="/Signin">Sign in </NavLink>Here</strong>

  </div>
   
  
   </div>
    </div>
    </div>
  )
}

export default Signup;


