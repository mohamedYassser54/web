import React,{lazy} from 'react'
import {BrowserRouter, NavLink,Route,Routes} from 'react-router-dom'
import Navbar from './component/Navbar';
import NavbarUser from './component/user/NavbarUser'
import './App.css';
import Loading from './component/Loading';
// lazy
const Home = lazy(()=> import('./component/home'))
const Signin = lazy(()=> import('./component/RegLo/signin'))
const Signup = lazy(()=> import('./component/RegLo/Register'))
const Emp = lazy(()=> import('./component/emp'))
const M = lazy(()=> import('./component/m'))
const Cv2 = lazy(()=> import('./component/CV2'))
const Cv = lazy(()=> import('./component/Cv'))



// company
const RegisterCompany = lazy(()=> import('./component/Company/RegLo/RegisterCompany'))
const Logincompany = lazy(()=> import('./component/Company/RegLo/logincompany'))
const Homecompany = lazy(()=> import('./component/Company/homecompany'))
const CvCompany = lazy(()=> import('./component/Company/CvCompany'))
const Supportcompany = lazy(()=> import('./component/Company/supportcompany'))
const NavbarCompany = lazy(()=> import('./component/Company/NavbarCompany'))

// user
// Home User
const HomeUser = lazy(()=> import('./component/user/home'))
const Company  = lazy(()=> import('./component/user/company'))
const OTP  = lazy(()=> import('./component/RegLo/OTP'))

const Test  = lazy(()=> import('./component/test'))

const  TestHome = lazy(()=> import('./component/test/testHome'))
const  Testuploading = lazy(()=> import('./component/test/testuploading'))

// const  TestVR = lazy(()=> import('./component/testVR'))
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <h1 className="k">Home page</h1> */}
      
      <Routes>
        {/* home */}
        <Route path='/' element={
          <React.Suspense fallback={<Loading/>}>
          <div>
         <Navbar/>
        <Home/>
        </div>
        </React.Suspense>
        }/>
        <Route path='/test' element={
          <React.Suspense fallback={<Loading/>}>
          <div>
         {/* <Navbar/> */}
        <Test/>
        </div>
        </React.Suspense>
        }/>

        {/* <Route path='/TestVR' element={
          <React.Suspense fallback={<Loading/>}>
          <div>
        //  
        <TestVR/>
        </div>
        </React.Suspense>
        }/> */}

        <Route path='/TestHome' element={
          <React.Suspense fallback={<Loading/>}>
          <div>
         {/* <Navbar/> */}
        <TestHome/>
        </div>
        </React.Suspense>
        }/>
        <Route path='/Testuploading' element={
          <React.Suspense fallback={<Loading/>}>
          <div>
         {/* <Navbar/> */}
        <Testuploading/>
        </div>
        </React.Suspense>
        }/>

        

        {/* Cv2 */}
        <Route path='/Cv2' element={
          <React.Suspense fallback={<Loading/>}>

         <div>
         <Navbar/>
        <Cv2/>
        </div>
        </React.Suspense>
        }/>
        {/* m */}
        <Route path='/m' element={<M/>}/> 

        {/* emp */}
        <Route path='/emp' element={<Emp/>}/> 

        {/* signup */}
        <Route path='/signup' element={
          <React.Suspense fallback={<Loading/>}>

          <div>
          {/* <Navbar/> */}
        <Signup/>
        </div>
        </React.Suspense>
        }/>  

        {/* signin */}
        <Route path='/signin' element={
          <React.Suspense fallback={<Loading/>}>

         <div>
          <NavbarUser/>
          <Signin/>
          </div>
        </React.Suspense>
        }/> 

        {/* Home User */}
        <Route path='/HomeUser' element={
          <React.Suspense fallback={<Loading/>}>
            <div>
          <NavbarUser/>
          <HomeUser/>
          </div>
        </React.Suspense>
        }/> 
        {/* Cv */}
        <Route path='/Cv' element={
          <React.Suspense fallback={<Loading/>}>

        <div>
        <NavbarUser/>
        <Cv/>
        </div>
        </React.Suspense>
        }/>
        {/* Cv */}
        <Route path='/Company' element={
          <React.Suspense fallback={<Loading/>}>

        <div>
        <NavbarUser/>
        <Company/>
        </div>
        </React.Suspense>
        }/>
        <Route path='/OTP' element={
          <React.Suspense fallback={<Loading/>}>

        <div>
        <NavbarUser/>
        <OTP/>
        </div>
        </React.Suspense>
        }/>


        {/*end Home User */}
        {/* Company */}
        <Route path='/RegisterCompany' element={
          <React.Suspense fallback={<Loading/>}>

        <div>
        <NavbarUser/>
        <RegisterCompany/>
        </div>
        </React.Suspense>
        }/>
        <Route path='/logincompany' element={
          <React.Suspense fallback={<Loading/>}>

        <div>
        <NavbarUser/>
        <Logincompany/>
        </div>
        </React.Suspense>
        }/>
        <Route path='/homecompany' element={
          <React.Suspense fallback={<Loading/>}>

        <div>
        <NavbarCompany/>
        <Homecompany/>
        </div>
        </React.Suspense>
        }/>


        {/* Cv */}
        <Route path='/CvCompany' element={
          <React.Suspense fallback={<Loading/>}>

        <div>
        <NavbarCompany/>
        <CvCompany/>
        </div>
        </React.Suspense>
        }/>
        <Route path='/supportcompany' element={
          <React.Suspense fallback={<Loading/>}>

        <div>
        <NavbarCompany/>
        <Supportcompany/>
        </div>
        </React.Suspense>
        }/>
        {/*end Company */}

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;


