import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './css/emp.module.css'
const M = () => {

    const navigate = useNavigate();
    const [name ,setName] = useState('');
  
    axios.defaults.withCredentials =true;
    useEffect(()=>{
      axios.get("http://localhost:8081/m")
      .then((res)=>{
        if(res.data.valid){
          setName(res.data.name)
        }else{
          navigate("/emp")
        }
      })
      .catch(err => console.log(err))
    },[])
  const [cvList, setCvList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/get');
      setCvList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // remove
  const handleRemove = async(id)=>{
    try{
      await axios.delete(`http://localhost:8081/remove/${id}`)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className={style.tablee}>
        <h1 >welcom {name}</h1>
        <table>
          <thead>
            <tr>
              <th>Delete</th>
            <th>CV</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
      {cvList.map((cv) => (
        <tr key={cv.id}>
          <td><button  onClick={()=>handleRemove(cv.id)}>delete</button></td>
           <td>
          <a
            href={`data:application/pdf;base64,${cv.cv}`}
            download={`${cv.name}_cv.pdf`}
          >
            Download CV
          </a>
          </td>
         <td><p>{cv.name}</p></td> 
         
        </tr>
      ))}
      </tbody>
      </table>
    </div>
  );
};

export default M;
