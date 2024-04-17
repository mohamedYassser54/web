import React from 'react'
import '../css/OTP.css'
function OTP() {
  return (
    <div className='OTP'>
      <form className="form">
  <p className="heading">Verify</p>

  <div className="box">
  <input className="input" type="password" maxlength="1"/>
  <input className="input" type="password" maxlength="1"/> 
  <input className="input" type="password" maxlength="1"/>
  <input className="input" type="password" maxlength="1"/>
  </div>
  <button className="btn1">Submit</button>
  <button className="btn2">Back</button>
</form>
    </div>
  )
}

export default OTP
