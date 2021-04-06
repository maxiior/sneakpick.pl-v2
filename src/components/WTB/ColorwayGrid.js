import colorful from "./pictures/other.png";

const ColorwayGrid = ({colors}) => {
    return (
        <div className='elements'>
            <p>CW</p>
            <div className='cws-grid'>
                {colors.map((c, i) => (
                    <div key={i}>
                        <label>
                            <input type='checkbox'/>
                            <div className='single-cw' style={{backgroundColor: c.text}}>
                                <div className='checkmark'></div>
                            </div>
                        </label>
                    </div>
                ))}
                <div>
                    <label>
                        <input type='checkbox'/>
                        <div className='single-cw white-cw'>
                            <div className='checkmark' style={{borderColor: '#ddd'}}></div>
                        </div>
                    </label>
                </div>
                <div>
                    <label>
                        <input type='checkbox'/>
                        <div className='single-cw' style={{backgroundImage: `url(${colorful})`}}>
                            <div className='checkmark'></div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ColorwayGrid
