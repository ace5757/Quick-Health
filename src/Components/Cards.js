import React, {useEffect} from 'react'
import Card from './Card'


function Cards() {
    
    const data = [
        { tag: 'Shoulder', url: require("../images/shoulder.jpg") },
        { tag: 'Elbow', url: require("../images/shoulder.jpg") },
        { tag: 'Ankle', url: require("../images/shoulder.jpg") },
        { tag: 'Hip', url: require("../images/shoulder.jpg") },
        { tag: 'Knee', url: require("../images/shoulder.jpg") },
        { tag: 'Wrist', url: require("../images/shoulder.jpg") },
        { tag: 'Hands', url: require("../images/shoulder.jpg") },
        { tag: 'Toes', url: require("../images/shoulder.jpg") }
    ]
    return (
        <div className='row'>
            {
                data.map((element) => {
                    return (
                        <div className='col-md-3 my-2' key={element.tag}>
                            <Card bodyPartName={element.tag} imageUrl={element.url} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Cards
