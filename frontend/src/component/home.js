import React,{useEffect} from 'react'
import { NavLink,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
  
    const login = Cookies.get('login');
    if (login !== 'true') {
      
      navigate('/signin');
    }
  }, [navigate]);
  return (
    <div>
      <div className="flex">
        {/* <NavLink to="/CV" className="card">Cv</NavLink>
        <NavLink to="/CV2" className="card">Cv2</NavLink> */}
        {/* <NavLink to="/m" className="card">m</NavLink> */}
        {/* <NavLink to="/emp" className="card">emp</NavLink> */}
      </div>
    </div>
  )
}

export default Home
