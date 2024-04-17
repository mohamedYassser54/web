import React,{useState,useEffect} from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import styles from "../css/signup.module.css"

function Signin() {
  const { t, i18n } = useTranslation();
  
    const [formData,setData] = useState({
        email:"",
        password:"",
    });
  const [login, setLogin] = useState(false);
    const navigate = useNavigate();

//   const handleChange =(e)=>{
//     setData({
//       ...formData,
//       [e.target.name]:e.target.value,
//     });
//   };
//   axios.defaults.withCredentials =true;
  
  // useEffect(()=>{
  //   axios.get("https://fashion-server-mu.vercel.app/home")
  //   .then((res)=>{
  //     if(res.data.valid){
  //       navigate("/home");
  //     }else{
  //       navigate("/Signin")
  //     }
  //   })
  //   .catch(err => console.log(err))
  // },[])  

  useEffect(() => {
    const loggedIn = Cookies.get('login');
    if (loggedIn === 'true') {
      setLogin(true);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/loginUser', formData);
      const responseData = response.data;
  
      if (responseData && responseData.Message === "Logged in successfully") {
        alert("Data is correct");
        setLogin(true);
        Cookies.set('login', true, { expires: 1 / 24 });
        Cookies.set('email', formData.email, { expires: 1 / 24 });
        setLogin(true);
        navigate("/HomeUser");
      } else {
        alert("Wrong password or email");
      }
      console.log(response);
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };
  

  useEffect(() => {
    
    document.body.classList.add(styles.signinBody);

    
    return () => {
      document.body.classList.remove(styles.signinBody);
    };
  }, []);
  return (
  
   
    
    <div className={styles.container}>
   
    <div className={styles.signbox}>
    <span className={styles.iconimage}>
    </span>
    {login ? (
        navigate("/") 
       ) : (
        <>
    <h1>{t("Sign in")}</h1>
    <div>
  
   
     <div className={styles.inp}>
        <input type="Email" placeholder={t("placeholderEmail")}name="email" required value={formData.email} onChange={(e) => setData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder={t("Password")}name="password" required value={formData.password} onChange={(e) => setData({ ...formData, password: e.target.value })}/>
        
      
     </div>
 
  <div className={styles.btn} > 
 <button onClick={handleSubmit}>{t("click")}</button>
  </div>
  <div className={styles.texts}>
 <span> {t("Don't have an account?")}</span>

 
  <strong> <NavLink to ="/signup">{t("Sign up")} </NavLink> {t("Here")}</strong>
 

  </div>
   
  
   </div>
  </>
  )}
    </div>
    </div>
    
  )
}

export default Signin;
