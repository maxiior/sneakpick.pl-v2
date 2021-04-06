import { VscSearch } from "react-icons/vsc";

const Filters = () => {
    return (
        <div className='filters'>
            <div className='header-filters'>
                <VscSearch className='search'/>
                <div>Filtrowanie</div>
            </div>
            <button className='reset'>Reset</button>
        </div>
    )
}

export default Filters
