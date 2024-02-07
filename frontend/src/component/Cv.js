import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import style from'./css/css.module.css';
const Cv = () => {
  const [cvName, setCvName] = useState({
    name: '',
    cv: null, 
  });
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    const isLoggedIn =Cookies.get("isLoggedIn");
    if(isLoggedIn !== "true"){
      navigate("/signin")
    }
  })
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCvName((prev) => ({
      ...prev,
      [name]: name === 'cv' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', cvName.name);
    formData.append('cv', cvName.cv);
  
    try {
        const response = await axios.post('https://server-three-mauve-23.vercel.app/employees', formData);
        if (response.status === 200) {
          alert('CV has been added successfully');
          
          setCvName({ username: '', cv: null });
        } else {
          alert('Failed to add CV. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to add CV. Please try again.');
      }
      
  };
  

  return (
    <div className={style.cv}>
      <form onSubmit={handleSubmit} className={style.form}>
     <div className={style.text}>
          <input
            type='text'
            name='name'
            placeholder={t('placeholderName')}
            spellCheck='false'
            required
            value={cvName.name}
            onChange={handleChange}
          />
        </div>
        <input type='file' name='cv'  accept='.pdf,.doc,.docx' onChange={handleChange} />
        <button type='submit'>{t("click")}</button>
      </form>
    </div>
  );
};

export default Cv;
