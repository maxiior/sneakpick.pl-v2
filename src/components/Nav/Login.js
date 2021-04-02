import { NavLink } from 'react-router-dom'

const Login = ({ text, where}) => {
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

export default Login
