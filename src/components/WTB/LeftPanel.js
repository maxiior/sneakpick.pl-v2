import React, { useState } from 'react'
import './style/leftpanel.css'
import Filters from './Filters'
import List from './List'

const LeftPanel = () => {

    const [categories, setCategory] = useState([
        {
            id: 1,
            text: 'Sneakersy'
        },
        {
            id: 2,
            text: 'Hoodie'
        },
        {
            id: 3,
            text: 'Teesy'
        },
        {
            id: 4,
            text: 'Koszule'
        },
        {
            id: 5,
            text: 'Crewnecki'
        },
        {
            id: 6,
            text: 'Longsleevy'
        },
        {
            id: 7,
            text: 'Katany'
        },
        {
            id: 8,
            text: 'Kurtki'
        },
        {
            id: 9,
            text: 'Płaszcze'
        },
        {
            id: 11,
            text: 'Spodnie'
        },
        {
            id: 12,
            text: 'Szale'
        },
        {
            id: 13,
            text: 'Portfele'
        },
        {
            id: 14,
            text: 'Plecaki'
        },
        {
            id: 15,
            text: 'Zegarki'
        },
        {
            id: 16,
            text: 'Czapki'
        },
        {
            id: 17,
            text: 'Belty'
        },
        {
            id: 18,
            text: 'Bielizna'
        }
      ])

      const [brand, setBrand] = useState([
        {
            id: 1,
            text: 'Nike'
        },
        {
            id: 2,
            text: 'Adidas'
        },
        {
            id: 3,
            text: 'Supreme'
        },
        {
            id: 4,
            text: 'Puma'
        },
        {
            id: 5,
            text: 'New Balance'
        },
        {
            id: 6,
            text: 'Vans'
        },
        {
            id: 7,
            text: 'Louis Vuitton'
        },
        {
            id: 8,
            text: 'Palace'
        },
        {
            id: 9,
            text: 'Diadora'
        },
        {
            id: 11,
            text: 'Reebok'
        },
        {
            id: 12,
            text: 'Balenciaga'
        },
        {
            id: 13,
            text: 'Lacoste'
        },
        {
            id: 14,
            text: 'Yeezy'
        },
        {
            id: 15,
            text: 'Off-White'
        },
        {
            id: 16,
            text: 'Converse'
        },
        {
            id: 17,
            text: 'Stone Island'
        },
        {
            id: 18,
            text: 'The North Face'
        },
        {
            id: 19,
            text: 'Ralph Lauren'
        },
        {
            id: 20,
            text: 'Guess'
        },
        {
            id: 21,
            text: 'Tommy Hilfiger'
        },
        {
            id: 22,
            text: 'VLONE'
        },
      ])

    return (
        <div className='leftpanel'>
            <Filters />
            <List name='Kategoria' elements={categories}/>
            <List name='Marka' elements={brand}/>
        </div>
    )
}

export default LeftPanel
