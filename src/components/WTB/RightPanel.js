import Announcements from './Announcements'
import './style/rightpanel.css'
import PagesList from './PagesList'


const RightPanel = () => {

    return (
        <div className='rightpanel'>
            <Announcements />
            <div className='down-pages-list'>
                <PagesList />
            </div>
        </div>
    )
}

export default RightPanel
