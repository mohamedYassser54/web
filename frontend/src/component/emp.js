import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './css/login.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Emp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = Cookies.get('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://server-three-mauve-23.vercel.app/login', { username, password });
      const responseData = response.data;

      if (responseData.success) {
        setIsLoggedIn(true);
        Cookies.set('isLoggedIn', true, { expires: 1 / 24 });
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
        {!isLoggedIn && (
          <>
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Emp;
