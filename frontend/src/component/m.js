// في Welcome.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import style from './css/emp.module.css';


const Welcome = ({ username }) => {
  const { t, i18n } = useTranslation();
  const [cvList, setCvList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


   const changeEn = () =>{
     i18n.changeLanguage('en')
   }
   const changeFr = () =>{
     i18n.changeLanguage('ar')
   }




  const fetchData = async () => {
    try {
      const response = await axios.get('https://server-three-mauve-23.vercel.app/get', { withCredentials: true });
      setCvList(response.data);
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
    const isLoggedIn = Cookies.get('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/emp');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);


  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/emp');
  };

  return (
    <div className={style.all}>
      <div className={style.btn}>
      <button onClick={changeEn}>EN</button>
      <button onClick={changeFr}>AR</button>
       </div>
    <div className={style.tablee}>
    <div className={style.hh}>
        <h1 className={style.h1}>{t("hello")}</h1>
    <button onClick={handleLogout}>{t("Logout")}</button>
        </div>
      <table>
        <thead>
          <tr>
          <th>{t("username")}1</th>
          <th>{t("email")}</th>
          <th>{t("CV")}</th>
          <th>{t("Delete")}</th>
          </tr>
        </thead>
        <tbody>
          {cvList.map((cv) => (
             <tr key={cv.id}>
             <td><p>{cv.name}</p></td>
             <td><p>{cv.email}</p></td>
             <td>
               <a
                 href={`data:application/pdf;base64,${cv.cv}`}
                 download={`${cv.name}_cv.pdf`}
               >
                {t(" Download CV")}
               </a>
             </td>
             <td><button onClick={() => handleRemove(cv.id)}>{t("Delete")}</button></td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Welcome;
