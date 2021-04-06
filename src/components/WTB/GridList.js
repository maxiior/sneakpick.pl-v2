const GridList = ({name, elements, width, grid}) => {
    return (
        <div className='elements'>
            <p>{name}</p>
            <div className='elements-grid' style={{ gridTemplateColumns: grid }}>
                {elements.map((e, i) => (
                    <div key={i} className='grid-element'>
                        <label>
                            <input type='checkbox'/>
                            <span style={{ width: width }}>{e.text}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GridList
