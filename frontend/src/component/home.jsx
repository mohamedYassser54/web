import React,{useEffect} from 'react'
import { NavLink,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import Aos from 'aos'
import  "aos/dist/aos.css" 
import style from './css/home.module.css'
function Home() {
  const navigate = useNavigate();

  // useEffect(() => {
  
  // //   const login = Cookies.get('login');
  // //   if (login !== 'true') {
      
  // //     navigate('/signin');
  // //   }
  // }, [navigate]);
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  return (
    <div className={style.home}>
      <div className={style.flex}>
        {/* company */}
       <div className={style.Company} data-aos="zoom-in">
        <div className={style.btn} >
        <NavLink to="/homecompany" className={style.navLink}>Company</NavLink>
        </div>
        
       </div>
       {/* user */}
       <div className={style.user} data-aos="zoom-in-up">
       <div className={style.btn}>
       <NavLink to="/HomeUser" className={style.navLink}>user</NavLink>
        </div>
       </div>
      </div>
    </div>
  )
}

export default Home
