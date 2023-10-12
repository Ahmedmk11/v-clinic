import { useState } from 'react'
import './search.css'

const Search = ({ onSearch, placeholder, disabled }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const onSearchTermChange = (e, mode = false) => {
        let searchString = e.target.value
        if (mode === true) {
            searchString = e.target.value.replace(/[^a-z\s]/gi, '')
        }
        setSearchTerm(searchString)
        onSearch(searchString)
    }

    return (
        <div className='search-bar'>
            <input
                disabled={disabled}
                type='text'
                placeholder={`Search by ${placeholder || 'name'}...`}
                value={searchTerm}
                onChange={onSearchTermChange}
            />
        </div>
    )
}

Search.defaultProps = {
    disabled: false,
}

export default Search
