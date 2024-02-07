import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
function CV2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(()=>{
    const isLoggedIn =Cookies.get("isLoggedIn");
    if(isLoggedIn !== "true"){
      navigate("/signin")
    }
  })


  return (
    <div className='cv'>
      support
    </div>
  )
}


export default CV2
