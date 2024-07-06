import React, {useState, useEffect} from 'react'
import Cards from './Cards'
import { useNavigate } from 'react-router-dom'

function Home() {
    let navigate = useNavigate()
    const host = "http://localhost:3003"
    const [user, setUser] = useState("")
    const getUser = async() =>{
        const response = await fetch(`${host}/v1/auth/getuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          const json = await response.json()
          setUser(json)
    }
    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log(localStorage.getItem('token'))
            getUser()
        }
        else{
            navigate("/login")
        }
        
    }, [])
    const newUser = JSON.parse(JSON.stringify(user))
    
    return (
        <div className='container mt-3 mb-0 text-start'>
            <h4 className='text-primary'>Patient Name: {newUser.name}</h4>
            <Cards/>
        </div>
    )
}

export default Home
