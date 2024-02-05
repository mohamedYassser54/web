import React, { useState } from 'react';
import style from "./css/login.module.css"
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

 

  const handleLogin = async () => {
    try {
      const response = await fetch('https://server-three-mauve-23.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful');
        onLogin(); // Notify the parent component about the successful login
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={style.container}>
      <form className={style.card}>
       
            <h1>Login</h1>
            <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
       
      </form>
    </div>
  );
}

export default Login;
