import { Link } from 'react-router-dom'
import Filters from './Filters'
import PagesList from './PagesList'
import { VscTriangleDown } from "react-icons/vsc";

const TopNav = ({steps, value}) => {
    return (
        <div className='top-nav'>
            <Filters />
            <div className='right-top-nav'>
                <div>
                    <div className='path'>
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
                    <div className='results'>
                        Wyniki: 
                        <span className='value'>2440</span>
                    </div>
                    <div className='sorting'>Sortowanie:</div>
                    <div className='select-category'>
                        <div className='value-holder'>
                            Domyślne
                        </div>
                        <div className='arrow-down'>
                            <VscTriangleDown />
                        </div>
                        <div className='drop-container'>
                            <div className='drop-option'>Domyślne</div>
                            <div className='drop-option'>Cena Rosnąco</div>
                            <div className='drop-option'>Cena Malejąco</div>
                            <div className='drop-option'>Popularne</div>
                            <div className='drop-option'>Najnowsze</div>
                        </div>
                    </div>
                </div>
                <PagesList />
            </div>
        </div>
    )
}

export default TopNav