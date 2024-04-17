import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import img from './image/1.png';
import img2 from './image/2.png';
import img4 from './image/4.png';
import style from './CssUser/home.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img3 from './image/3.png';
import Aos from 'aos'
import  "aos/dist/aos.css" 


function Home() {
  const [cvList, setCvList] = useState([]);
  const [cvListcompany, setCvListCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  const settings = {
    dots: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1200, 
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, 
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/getdata', { withCredentials: true });
      setCvList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };
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
  

  useEffect(() => {
    const isLoggedIn = Cookies.get('login') === 'true';
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    // 
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Shuffle cvList and take the first five items
  const shuffledCvList = cvList.sort(() => Math.random() - 0.5).slice(0, 5);
  const shuffledCvListt = cvListcompany.sort(() => Math.random() - 0.5).slice(0, 5);

  return (
    <div className={style.homeuser}>
      <div className={style.container}data-aos="fade-down">
        <Slider {...settings} className={style.Slider} >
          {shuffledCvList.map((cv, index) => (
            <div className={style.card} key={index}>
              {/* <div className={style.image}>{cv.img && <img src={cv.img} alt="" />}</div> */}
              <div className={style.image}>
                <img src={img4} alt="" />
              </div>
              <h3>{cv.name}</h3>
              <h6>{cv.country}</h6>
              <div className={style.bdf}>
             <button> <a href={`data:application/pdf;base64,${cv.cv}`} download={`${cv.name}_cv.pdf`}>
                Download CV
              </a>
              </button>
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
          ))}
        </Slider>
      </div>
      <div className={style.cardsuser}>
      {shuffledCvListt.map((cv, index) => (
        <div className={style.cards} key={index}>
           <div  key={index}>
          <div className={style.cardss} data-aos="fade-up">
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
    </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
