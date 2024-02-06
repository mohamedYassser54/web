import React from 'react'
import {BrowserRouter, NavLink,Route,Routes} from 'react-router-dom'
import Cv from './component/Cv'; 
import Cv2 from './component/CV2'; 
import M from './component/m'; 
import Emp from './component/emp'; 
import Navbar from './component/Navbar';
import Test18n from './component/Test18n';
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
        <Route path='/Cv' element={<Cv/>}/>
        <Route path='/Cv2' element={<Cv2/>}/>
        <Route path='/m' element={<M/>}/> 
        <Route path='/emp' element={<Emp/>}/> 
        <Route element={<Test18n />}/>
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;


