import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './css/emp.module.css';
import Cookies from 'js-cookie';

const Welcome = () => {
  const [cvList, setCvList] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://server-three-mauve-23.vercel.app/get');
      const formattedData = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        cv: item.cv.toString('base64'), 
      }));
      setCvList(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://server-three-mauve-23.vercel.app/remove/${id}`);
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
      <h1>Welcome!</h1>
      <table>
        <thead>
          <tr>
            <th>Delete</th>
            <th>CV</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {cvList.map((cv) => (
            <tr key={cv.id}>
              <td><button onClick={() => handleRemove(cv.id)}>Delete</button></td>
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
