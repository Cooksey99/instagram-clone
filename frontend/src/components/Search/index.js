import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchUser } from '../../store/profile';
import './Search.css'

export default function Search() {

    const dispatch = useDispatch();
    const [searchVal, setSearchVal] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log(searchVal)
        dispatch(fetchSearchUser(searchVal))
    }

    useEffect(() => {

    }, [dispatch])

    return (
        <>
            <form id='search-component' onSubmit={handleSubmit}>
                <SearchIcon />
                <input type="search" placeholder="Search" className='search-bar'
                    value={searchVal}
                    onChange={(e) => {
                        setSearchVal(e.target.value);
                        console.log(e.target.value)
                        // handleSubmit();
                    }}
                    maxLength='30' />
            </form>
        </>
    )
}
