import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Welcome = () => {
  
  const fetchData = async () => {
    try {
      const response = await axios.get('https://server-three-mauve-23.vercel.app/get');
      setCvList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={style.tablee}>
      <h1>Welcome!</h1>
      
    </div>
  );
};

export default Welcome;