import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dataContext from '../Context/dataContext'

function PositionWindow(props) {
    const navigate = useNavigate()
    const context = useContext(dataContext)
    const {updateAlignment } = context
    const positions = [
        { type: 'Standing', imageUrl: require("../images/standing.jpeg") },
        { type: 'Sitting', imageUrl: require("../images/sitting.jpg") },
        { type: 'Lying', imageUrl: require("../images/lying.png") },
    ]
    const [alignLeftOrRight, setAlignLeftOrRight] = useState('Right')
    const handleClick = ()=>{
        alignLeftOrRight==='Right'?setAlignLeftOrRight("Left"):setAlignLeftOrRight("Right")
    }
    const handleClickImg = (type)=>{
        updateAlignment(type, alignLeftOrRight)
        props.showAlert("Data Saved Successfully", "success")
        navigate('/')
    }
    return (
        <div className='container row my-3 bg-primary-subtle'>
            <div className="form-check form-switch position-relative my-3 mx-3">
                {/* i have to correct this broken code of checkbox */}
                <h3 className='text-primary text-start position-absolute top-50 start-0 translate-middle-y'>Select Position</h3>
                <div className='position-absolute top-50 end-0 translate-middle-y me-4' >
                    <input className="form-check-input " type="checkbox" id="flexSwitchCheckChecked" onClick={handleClick} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{alignLeftOrRight}</label>
                </div>
            </div>

            {
                positions.map((position) => {
                    return (
                        <div className='col md-3 my-2' key={position.type}>
                            <div className="card " >
                                <img src = {position.imageUrl} className="card-img" onClick={()=>handleClickImg(position.type)} alt="..." />
                            </div>
                            <h5>{position.type}</h5>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default PositionWindow
