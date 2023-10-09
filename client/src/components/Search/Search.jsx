import { useState } from 'react'
import './search.css'

const Search = ({ onSearch,placeholder }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const onSearchTermChange = (e) => {
        const searchString = e.target.value;
        setSearchTerm(searchString)
        onSearch(searchString)
    }

    return (
        <div className='search-bar'>
            <input
                type='text'
                placeholder={`Search by ${placeholder||'name'}...`}
                value={searchTerm}
                onChange={onSearchTermChange}
            />
        </div>
    )
}

export default Search