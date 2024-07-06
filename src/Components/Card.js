import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Card(props) {
    const navigate = useNavigate()
    const { bodyPartName, imageUrl } = props
    const handleClick = () => {
        navigate('/positiontype')
    }
    return (
        <div className='d-grid gap-2'>
            <div className="card text-dark">
                <img src={imageUrl} className="card-img" alt="..." />
                <div>
                    <div className="card-img-overlay">
                        <h5 className="card-title text-start">{bodyPartName}</h5>
                    </div>
                </div>
            </div>
            <button type='button' className="btn btn-secondary " onClick={handleClick}>Start Assesment</button>
        </div>
    )
}

export default Card
