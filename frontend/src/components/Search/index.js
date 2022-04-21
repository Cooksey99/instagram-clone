import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import './Search.css'

export default function Search() {

    const [searchVal, setSearchVal] = useState('');

    const handleSearch = () => {

    }

    return (
        <>
            <form>
                <div id='search-component'>
                    {/* <SearchIcon />
                    <input type="search" placeholder="Search" className='search-bar'
                    onChange={(e) => {
                        setSearchVal(e.target.value);
                        handleSearch();
                    }}
                    maxLength='30'/> */}
                </div>
            </form>
        </>
    )
}
