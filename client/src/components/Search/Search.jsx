import { useState } from 'react'
import './search.css'

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const onSearchTermChange = (e) => {
        const searchString = e.target.value.replace(/[^a-z]/gi, '')
        setSearchTerm(searchString)
        onSearch(searchString)
    }

    return (
        <div className='search-bar'>
            <input
                type='text'
                placeholder='Search by name...'
                value={searchTerm}
                onChange={onSearchTermChange}
            />
        </div>
    )
}

export default Search