import './WTB/style/wtb.css'
import Panel from './WTB/Panel'
import React, { useState } from 'react';
import TopNav from './WTB/TopNav'


const WTB = () => {
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
        <main>
            <header>WANT TO BUY</header>
            <TopNav steps={steps}/>
            <Panel />
        </main>
    )
}

export default WTB
