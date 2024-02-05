import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cv from './component/Cv'; 
import Cv2 from './component/CV2'; 
import Login from './component/emp';
import Home from './component/m';
import Navbar from  "./component/Navbar";
import './App.css';
import Home2 from './component/home';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <div className="App">
      {/* <h1 className="k">Home page</h1> */}
      <Router>
      <Routes>
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/m" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/m"
          element={loggedIn ? <Home /> : <Navigate to="/login" />}
        />
         <Route path='/' element={
          <div>
            <Navbar/>
         <Home2/>
         </div>
         }/>
        <Route path='/Cv' element={
          <div>
          <Navbar/>
        <Cv/>
        </div>
        }/>
        <Route path='/support' element={
        <div>
        <Navbar/>
        <Cv2/>
        </div>
        }/>
      </Routes>
    </Router>
      
      {/* <Routes>
        <Route path='/' element={<Home2/>}/>
        <Route path='/Cv' element={<Cv/>}/>
        <Route path='/Cv2' element={<Cv2/>}/>
        <Route path='/m' element={<M/>}/> 
        <Route path='/emp' element={<Emp/>}/> 
      </Routes> */}

    </div>
  );
}

export default App;


