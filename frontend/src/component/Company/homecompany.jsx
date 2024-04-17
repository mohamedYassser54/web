import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import img from './image/1.png'
import img2 from './image/2.png'
import style from './CssUser/home.module.css';
// import ReactCardSlider from "react-card-slider-component";

function Home() {
  const [cvList, setCvList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/companydata', { withCredentials: true });
      setCvList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = Cookies.get('logincompany') === 'true';
    if (!isLoggedIn) {
      navigate('/logincompany');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or component
  }

  if (error) {
    return <div>Error: {error}</div>; // Display a meaningful error message
  }

  return (
    <div className={style.homeuser}>
      <div className={style.container}>
        {cvList.map((cv,index) => (
          <div className={style.card} key={index}>
            <div className={style.image}>
              {cv.img && <img src={cv.img} alt="" />}
            </div>
            <h3>{cv.name}</h3>
            <h3>{cv.country}</h3>
            
            <div className={style.sochial}>
              <NavLink to={ cv.linkin}>
             
              <img src={img} alt="" />
              </NavLink>
              <NavLink to={ cv.facebook}>
             
              <img src={img2} alt="" />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
