// في مكون Emp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './css/login.module.css';
import axios from 'axios';

const Emp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://server-three-mauve-23.vercel.app/login', { username, password });

      if (response.data.success) {
        navigate('/m');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className={style.container}>
      <form className={style.card}>
        <h1>Login</h1>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Emp;
