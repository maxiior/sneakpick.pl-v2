import React, { useState } from 'react'

const List = ({name, elements}) => {
    const [showList, setShowList] = useState(false)
    const [n, setn] = useState(6)
    const [showMore, setShowMore] = useState('Pokaż więcej')

    const show = () => {
        if(!showList)
        {
            setShowList(true)
            setn(elements.length)
            setShowMore('Pokaż mniej')
        } 
        else
        {
            setShowList(false)
            setn(6)
            setShowMore('Pokaż więcej')
        } 
    }

    return (
        <div className='elements'>
            <p>{name}</p>
            <div className='elements-list'>
                {elements.slice(0,n).map((e) => (
                    <div key={e.id} className='element'>
                        <label>
                            <div>{e.text}</div>
                        </label>
                    </div>
                ))}
                {showList && (<div className='element'>
                    <label>
                        <div className='other'>Inne</div>
                    </label>
                </div>)}
            </div>
            <div className='show-more' onClick={show}>
                {showMore}
            </div>
        </div>
    )
}

export default List
