import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
function CV2() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(()=>{
    const login =Cookies.get("logincompany");
    if(login !== "true"){
      navigate("/logincompany")
    }
  })


  return (
    <div className='cv'>
      support
    </div>
  )
}


export default CV2
