import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

const PagesList = () => {
    return (
        <div className='pages-list'>
            <div className='arrow'>
                <VscChevronLeft />
            </div>
            <div className='single-number'>1</div>
            <div className='single-number'>2</div>
            <div className='single-number'>3</div>
            <div className='three-dots'>...</div>
            <div className='single-number'>10</div>
            <div className='arrow'>
                <VscChevronRight />
            </div>
        </div>
    )
}

export default PagesList
