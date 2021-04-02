import Option from './Option'
import Login from './Login'
import Signup from './Signup'

const Options = () => {
    return (
        <div className='options'>
            <Option text='WTB' where='/'/>
            <Option text='WTS' where='/'/>
            <Option text='WTT' where='/'/>
            <Option text='PROXY' where='/'/>
            <Option text='STEAL' where='/'/>
            <Option text='TALK' where='/'/>
            <Login text='LOGIN' where='/'/>
            <Signup text='SIGN UP' where='/'/>
        </div>
    )
}

export default Options
