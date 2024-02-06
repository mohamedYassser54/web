// في Welcome.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './css/emp.module.css';
import Cookies from 'js-cookie';

const Welcome = ({ username }) => {
  const [cvList, setCvList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://server-three-mauve-23.vercel.app/get');
      setCvList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://server-three-mauve-23.vercel.app/remove/${id}`);
      // تحديث الحالة المحلية بدلاً من إعادة تحميل الصفحة
      setCvList((prevCvList) => prevCvList.filter((cv) => cv.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // التحقق من تسجيل الدخول عند تحميل المكون
    const isLoggedIn = Cookies.get('isLoggedIn');
    if (isLoggedIn !== 'true') {
      // إذا لم يكن مسجل الدخول، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
      navigate('/emp');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, []);


  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    setIsLoggedIn(false);
    // يمكنك توجيه المستخدم إلى صفحة تسجيل الخروج أو أي صفحة أخرى بعد تسجيل الخروج
    navigate('/emp');
  };

  return (
    <div className={style.all}>
    <div className={style.tablee}>
    <div className={style.hh}>
        <h1 className={style.h1}>Welcome</h1>
    <button onClick={handleLogout}>Logout</button>
        </div>
      <table>
        <thead>
          <tr>
          <th>name</th>
          <th>CV</th>
          <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cvList.map((cv) => (
             <tr key={cv.id}>
             <td><p>{cv.name}</p></td>
             <td>
               <a
                 href={`data:application/pdf;base64,${cv.cv}`}
                 download={`${cv.name}_cv.pdf`}
               >
                 Download CV
               </a>
             </td>
             <td><button onClick={() => handleRemove(cv.id)}>delete</button></td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Welcome;
