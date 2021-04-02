import { NavLink } from 'react-router-dom'

const Option = ({ text, where}) => {
    return (
        <div className='option'>
            <NavLink
                to={{where}}
                className='link'
            >
                {text}
            </NavLink>
        </div>
    )
}

export default Option
