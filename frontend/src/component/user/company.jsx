import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import img from './image/1.png';
import img2 from './image/2.png';
import img3 from './image/3.png';
import Aos from 'aos'
import  "aos/dist/aos.css" 

import style from './CssUser/company.module.css';



function Home() {
  const [cvListcompany, setCvListCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  

 
  useEffect(() => {
    const fetchDataCompany = async () => {
      try {
        const response = await axios.get('http://localhost:8081/companydata', { withCredentials: true });
        setCvListCompany(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDataCompany();
  }, []);
  

  const [filter ,setFilter] = useState('');
  
  const searchText = (event) =>{
    setFilter(event.target.value);
  } 
  let dataSearch = cvListcompany.filter(item =>{
    return Object.keys(item).some(key =>
      item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
      )
  })


  useEffect(() => {
    const isLoggedIn = Cookies.get('login') === 'true';
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  

  return (
    <div className={style.allcompany}>
      <div className={style.container}>
      
      <div className={style.cardsuser}>
      <label className="form-lable h4">Search</label>
            <input 
            type="text" 
            className="form-control"
            placeholder='Search'
             value={filter}
             onChange={searchText.bind(this)}
            />
      {dataSearch.map((cv, index) => (
        <div  key={index}>
          <div className={style.cards} data-aos="fade-up">
            <div className={style.image}>
            <img src={img3} />
            <h3>{cv.name}</h3>
            </div>
            <div>
              <p>{cv.email}</p>
              <p>{cv.country}</p>
            </div>
            <div className={style.sochial}>
                <NavLink to={cv.linkin}>
                  <img src={img} alt="" />
                </NavLink>
                <NavLink to={cv.facebook}>
                  <img src={img2} alt="" />
                </NavLink>
              </div>

    </div>
    </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Home;
