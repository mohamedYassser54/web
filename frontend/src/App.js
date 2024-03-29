import React from 'react'
import {BrowserRouter, NavLink,Route,Routes} from 'react-router-dom'
import Cv from './component/Cv'; 
import Cv2 from './component/CV2'; 
import M from './component/m'; 
import Emp from './component/emp'; 
import Navbar from './component/Navbar';
import Signup from './component/RegLo/Register';
import Signin from './component/RegLo/signin';
import './App.css';
import Home from './component/home';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <h1 className="k">Home page</h1> */}
      
      <Routes>
        <Route path='/' element={
          <div>
         <Navbar/>
        <Home/>
        </div>
        }/>
        <Route path='/Cv' element={
        <div>
        <Navbar/>
        <Cv/>
        </div>
        }/>
        <Route path='/Cv2' element={
         <div>
         <Navbar/>
        <Cv2/>
        </div>
        }/>
        <Route path='/m' element={<M/>}/> 
        <Route path='/emp' element={<Emp/>}/> 
        <Route path='/signup' element={
          <div>
          {/* <Navbar/> */}
        <Signup/>
        </div>
        }/>  
        <Route path='/signin' element={<Signin/>}/> 
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;


