import { NavLink } from 'react-router-dom'

const Signup = ({ text, where}) => {
    return (
        <div className='logoption'>
            <NavLink
                to={{where}}
                className='loglink'
            >
                {text}
            </NavLink>
        </div>
    )
}

export default Signup
