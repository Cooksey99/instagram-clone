import SearchIcon from '@mui/icons-material/Search';
import './Search.css'

export default function Search() {


    return (
        <>
            <form>
                <div id='search-component'>
                    <SearchIcon />
                    <input type="search" placeholder="Search" className='search-bar'
                    maxLength='30'/>
                </div>
            </form>
        </>
    )
}
