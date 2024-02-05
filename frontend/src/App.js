import react from 'react'
import {BrowserRouter, NavLink,Route,Routes} from 'react-router-dom'
import Navbar from './component/Navbar'
import Cv from './component/Cv'; 
import Cv2 from './component/CV2'; 
import M from './component/m'; 
import Emp from './component/emp'; 
import Home from './component/home';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path='/m' element={<M/>}/> 
        <Route path='/emp' element={<Emp/>}/> 
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
       
      </Routes>

    </div>
    </BrowserRouter>
  );
}

export default App;


