import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const [credential, setCredential] = useState({ name: '', email: '', password: '', cpassword: '' })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3003/v1/auth/createUser', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {

            //save token
            localStorage.setItem('token', json.authtoken)
            props.showAlert("created a user succesfully", "success")

            //redirect
            navigate("/")
            //console.log("redirect")
        }
        else {
            props.showAlert("Choose a diff email", "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3 '>
            <h2>SignUp</h2>
            <div className='container my-3 d-flex justify-content-center align-items-center'>
                <form onSubmit={handleSubmit}>
                    <div className=" row mb-2">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-12">
                            <input type="text" className="form-control" id="name" name='name' onChange={onChange} required />

                        </div>

                    </div>
                    <div className=" row mb-2">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-12">
                            <input type="email" className="form-control" id="email" name='email' onChange={onChange} />

                        </div>

                    </div>
                    <div className="row mb-2">
                        <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-12">
                            <input type="password" className="form-control" id="password" name='password' minLength={5} onChange={onChange} />
                        </div>


                    </div>
                    <div className="row mb-2">
                        <label htmlFor="cpassword" className="col-sm-5 col-form-label">Confirm Password</label>
                        <div className="col-sm-12">
                            <input type="password" className="form-control" id="cpassword" name='cpassword' minLength={5} onChange={onChange} />
                        </div>


                    </div>

                    <button type="submit" className="btn btn-primary my-3" >Sign in</button>
                </form>

            </div>
        </div>
    )
}

export default Signup
