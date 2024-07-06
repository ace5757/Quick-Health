import React from 'react'
import { useState } from "react"
import DataContext from "./dataContext"

const DataState = (props) => {
    const host = "http://localhost:3003"
    const [data, setData] = useState({ assesmentType: '', alignment: '', direction: 'Right' })
    const addExercise = async()=>{
        if(data.assesmentType===''||data.alignment===''||data.direction===''){
            console.log(data)
            return 
        }
        const response = await fetch(`${host}/v1/auth/assesment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(data.assesmentType, data.alignment, data.direction)
          });
          const user = await response.json()
          const newUser = JSON.parse(JSON.stringify(user))
          console.log(newUser)
          setData({ assesmentType: '', alignment: '', direction: 'Right' })
          
    }
    const updateData = (x) => {
        const myobj = {...data,assesmentType: x }
        setData(myobj)

    }
    const updateAlignment = async(type, alignLeftOrRight) => {
        
        if(data.assesmentType===''||type===''||alignLeftOrRight===''){
            console.log(data)
            return 
        }
        const assesmentType = data.assesmentType
        const response = await fetch(`${host}/v1/auth/assesment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({assesmentType, type, alignLeftOrRight})
          });
          const user = await response.json()
          const newUser = JSON.parse(JSON.stringify(user))
          console.log(newUser)
          setData({ assesmentType: '', alignment: '', direction: 'Right' })
        
    }
    return (
        <DataContext.Provider value={{ data, updateData, updateAlignment }}>
            {props.children}       {/* allowing all children to use states we created here */}
        </DataContext.Provider>
    )
}

export default DataState
