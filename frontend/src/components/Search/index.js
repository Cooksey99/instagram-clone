import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchUser } from '../../store/profile';
import './Search.css'
import SearchResults from './searchResults';

export default function Search() {

    const dispatch = useDispatch();
    const [searchVal, setSearchVal] = useState('');
    const results = useSelector(state => state?.profile?.search);
    const [searching, setSearching] = useState(false);
    const [focus, setFocus] = useState(false);
    const searchInput = useRef(null);

    const handleSubmit = (value) => {
        setSearchVal(value)
        console.log(searchVal);
        dispatch(fetchSearchUser(searchVal));
    }

    useEffect(() => {
        if (document.activeElement === searchInput.current) setFocus(true);
        else setFocus(false)
    }, [dispatch, handleSubmit, searchInput])

    return (
        <>
            <section id='search-container'>
                <div id='search-component'>
                    <SearchIcon />
                    <input type="search" placeholder="Search" className='search-bar'
                        ref={searchInput}
                        value={searchVal}
                        onClick={() => setFocus(true)}
                        onChange={(e) => {
                            handleSubmit(e.target.value);
                            setSearching(true)
                        }}
                        maxLength='30' />
                </div>
                {focus && (
                    <SearchResults results={results} setFocus={setFocus} />
                )}
            </section>

        </>
    )
}
