import { Link } from 'react-router-dom'

const TopNav = ({steps, value}) => {
    return (
        <div className='top-nav'>
            <div>
                <div class='path'>
                    <ol>
                        <li>
                            <Link to='/all' className='step'>All</Link>
                        </li>
                        {steps.map((step) => (
                            <li>
                                <Link to={step.path} className='step'>{step.name}</Link>
                            </li>
                        ))}
                    </ol>
                </div>
                <div class='results'>
                    Wyniki: 
                    <span class='value'>2440</span>
                </div>
                <div class='sorting'>Sortowanie:</div>
            </div>
        </div>
    )
}

export default TopNav