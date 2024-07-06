import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login(props) {
  const [credential, setCredential] = useState({ email: '', password: '' })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3003/v1/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ email: credential.email, password: credential.password })
    })
    const json = await response.json()
    console.log(json)
    if (json.success) {

      //save token
      localStorage.setItem('token', json.authtoken)
      props.showAlert("Logged in succesfully", "success")

      //redirect to home page 
      navigate("/")
      //console.log("redirect")
    }
    else {
      props.showAlert("Wrong credentials", "danger")
    }
  }
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-3 '>
      <h2>Login</h2>
      <div className='container my-5 d-flex justify-content-center align-items-center'>
        <form onSubmit={handleSubmit}>
          <div className=" row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-12">
              <input type="email" className="form-control" value={credential.email} id="email" name='email' onChange={onChange} required />

            </div>

          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-12">
              <input type="password" className="form-control" value={credential.password} id="password" name='password' onChange={onChange} required />
            </div>


          </div>

          <button type="submit" className="btn btn-primary" >Log in</button>
        </form>

      </div>
    </div>
  )
}

export default Login
