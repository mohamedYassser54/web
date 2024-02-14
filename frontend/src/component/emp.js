// في Emp.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './css/login.module.css';
import axios from 'axios';
import Welcome from './m'; 
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

function Emp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();


  useEffect(() => {
    const loggedIn = Cookies.get('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://server-three-mauve-23.vercel.app/login', { username, password }, { withCredentials: true });
      const responseData = response.data;

      if (responseData.success) {
        setIsLoggedIn(true);
        Cookies.set('isLoggedIn', true, { expires: 1/24 });
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
    <div className={`${style.container}`}>
      <div className={style.card}>
        {isLoggedIn ? (
             navigate("/m") 
        ) : (
          <>
            <h1>{t("Login")}</h1>
            <input type="text" placeholder={t("placeholderName")} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder={t("Password")} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>{t("Login")}</button>
          </>
        )} 
      </div>
    </div>
  );
}

export default Emp;
