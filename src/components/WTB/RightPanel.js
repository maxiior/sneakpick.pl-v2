import TopNav from './TopNav'
import Announcements from './Announcements'
import './style/rightpanel.css'
import React, { useState } from 'react';

const RightPanel = () => {
    const [steps, setSteps] = useState([
        {
            id: 1,
            name: 'Sneakersy',
            path: '/all/sneakersy'
        },
        {
            id: 2,
            name: 'Nike',
            path: '/all/sneakersy/nike'
        }
    ])
    return (
        <div className='rightpanel'>
            <TopNav steps={steps}/>
            <Announcements />
        </div>
    )
}

export default RightPanel
