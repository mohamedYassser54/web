import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


import style from'./css/css.module.css';
const Cv = () => {
  const [cvName, setCvName] = useState({
    name: '',
    // img:'',
    email:'',
    country:'',
    linkin:'',
    facebook:'',
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
    // setImageUploaded(true);
    setCV(true)
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', cvName.name);
    formData.append('cv', cvName.cv);
    formData.append('email', Cookies.get('email'));
    // formData.append('img', cvName.img);
    formData.append('country', cvName.country);
    formData.append('linkin', cvName.linkin);
    formData.append('facebook', cvName.facebook);
  
    try {
      const response = await axios.post('http://localhost:8081/employees', formData);
  
      if (response.status === 200) {
        alert('CV has been added successfully');
        setCvName({ username: '',country:'',facebook:'',linkin:'',cv: null });
        window.location.reload()
      } else {
        // Handle other status codes if needed
        alert('Failed to add CV. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle specific error scenarios if needed
    }
  };
  
  
  // const [imageUploaded, setImageUploaded] = useState(false);
  const [CV, setCV] = useState(false);
  

  return (
    <div className={style.cv}>
      <form onSubmit={handleSubmit} className={style.form}>
      {/* <div className={`${style.image} ${imageUploaded ? style.greenText : ''}`}>
      {cvName.value && (
        <span className={imageUploaded ? style.greenText : ''}>
          {imageUploaded ? 'uploadd' : ''}
        </span>
        
      )}
      <label htmlFor="img" className={style.customFileInput}>
        <div>{t('uploadImage')}</div>
      </label>
      <input type="file" accept=".png, .jpg" name="img" id="img" hidden onChange={handleChange} />
    </div> */}
        <div className={style.allinput}>
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
          <input
            type='text'
            name='linkin'
            placeholder={t('Link Instagram')}
            spellCheck='false'
            required
            value={cvName.linkin}
            onChange={handleChange}
          />
          <input
            type='text'
            name='facebook'
            placeholder={t('Link Facebook')}
            spellCheck='false'
            required
            value={cvName.facebook}
            onChange={handleChange}
          />

          {/* option */}
           <div className={style.option}>
          <div className={style.selectbox}>
          <select className="option" name="country" required onChange={handleChange} defaultValue="Alexandria Governorate">
           <option hidden   > country</option>
           <option value="Austria" >Austria</option>
       
          <option value="Egypt" >Egypt</option>
          <option value="United Arab Emirates" >United Arab Emirates</option>
          <option value="The Kingdom of Saudi Arabia" >The Kingdom of Saudi Arabia</option>
      
          <option value="State of Kuwait" >State of Kuwait</option>
      <option value="State of Qatar" >State of Qatar</option>
         <option value="United States of America" >United States of America</option>
  </select>
   </div>
  </div>
        </div>
        <div className={CV ? style.cv2 : ''} style={{color:"#fff",width:"90",height:"100px"}}>
        <label htmlFor="cv">Upload CV</label>
        <input type='file' id='cv' name='cv' hidden  accept='.pdf,.doc,.docx' onChange={handleChange} />
        </div>
        </div>
        <button type='submit'>{t("click")}</button>
      </form>
    </div>

  );
};

export default Cv;
