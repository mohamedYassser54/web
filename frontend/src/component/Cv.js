import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import style from'./css/css.module.css';
const Cv = () => {
  const [cvName, setCvName] = useState({
    name: '',
    email:'',
    cv: null, 
  });
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  useEffect(()=>{
    const login =Cookies.get("login");
    if(login !== "true"){
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
    formData.append('email', Cookies.get('email'));

    try {
        const response = await axios.post('https://server-three-mauve-23.vercel.app/employees', formData);
        if (response.status === 200) {
          alert('CV has been added successfully');
          
          setCvName({ username: '', cv: null });
          window.location.reload()
        } else {
          alert('Failed to add CV. Please try again.');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('User already exists. Please use a different email address.');
        } else {
          console.error('Error:', error);
          alert('Failed to add CV. Please try again.');
        }
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
