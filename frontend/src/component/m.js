// في Welcome.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './css/emp.module.css';
import Cookies from 'js-cookie';

const Welcome = ({ username }) => {
  const [cvList, setCvList] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://server-one-puce.vercel.app/get');
      setCvList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://server-one-puce.vercel.app/remove/${id}`);
   
      setCvList((prevCvList) => prevCvList.filter((cv) => cv.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
   
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (isLoggedIn !== 'true') {
      
      navigate('/emp');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.tablee}>
      <h1>Welcome, {username}!</h1>
      <table>
        <thead>
          <tr>
            <th>Delete</th>
            <th>CV</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {cvList.map((cv) => (
            <tr key={cv.id}>
              <td><button onClick={() => handleRemove(cv.id)}>delete</button></td>
              <td>
                <a
                  href={`data:application/pdf;base64,${cv.cv}`}
                  download={`${cv.name}_cv.pdf`}
                >
                  Download CV
                </a>
              </td>
              <td><p>{cv.name}</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Welcome;
