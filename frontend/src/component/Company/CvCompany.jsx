import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {useNavigate} from  "react-router-dom";
import Cookies from 'js-cookie';
import style from '../css/css.module.css';

const Cv = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [cvName, setCvName] = useState({
    email:Cookies.get('email'),
    name: '',
    country: '',
    linkin: '',
    facebook: '',
  });
  useEffect(() => {
    const isLoggedIn = Cookies.get('logincompany') === 'true';
    if (!isLoggedIn) {
      navigate('/logincompany');
    }
  }, [navigate]);

  const handleSubmit =  (event) => {
    event.preventDefault();
       axios.post('http://localhost:8081/companydata2', cvName)
      .then(res=>
        {
          console.log(res);
          console.log(cvName);
          alert("Data Insertd  Successfully")
        })
      .catch(err => console.log(err))
  };

  const handleChange =(e)=>{
    setCvName(prev=>({...prev,[e.target.name]:e.target.value}))
  
  };
  return (
    <div className={style.cv}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.allinput}>
          <div className={style.text}>
            <input
              type='text'
              name='name'
              placeholder={t('placeholderName')}
              spellCheck='false'
              required
              onChange={handleChange}
            />
            <input
              type='text'
              name='linkin'
              placeholder={t('Link Instagram')}
              spellCheck='false'
              required
              onChange={handleChange}
            />
            <input
              type='text'
              name='facebook'
              placeholder={t('Link Facebook')}
              spellCheck='false'
              required
              onChange={handleChange}
            />

            <div className={style.option}>
              <div className={style.selectbox}>
                <select
                  className='option'
                  name='country'
                  required
                  onChange={handleChange}
                  defaultValue='Alexandria Governorate'
                >
                  <option hidden> country</option>
                  <option value='Austria'>Austria</option>
                  <option value='Egypt'>Egypt</option>
                  <option value='United Arab Emirates'>United Arab Emirates</option>
                  <option value='The Kingdom of Saudi Arabia'>The Kingdom of Saudi Arabia</option>
                  <option value='State of Kuwait'>State of Kuwait</option>
                  <option value='State of Qatar'>State of Qatar</option>
                  <option value='United States of America'>United States of America</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <button type='submit'>{t('click')}</button>
      </form>
    </div>
  );
};

export default Cv;
