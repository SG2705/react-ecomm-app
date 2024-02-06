import { useContext, useRef } from 'react'
import { CartList } from '../context/cartContext'

const Search = () => {
    const searchRef = useRef()
    const { setSearchTerm } = useContext(CartList)
    
    // Function to set the search term to the searchItem variable
    const handleSearch = () => {
        setSearchTerm(searchRef.current.value)
    }

    // Function to clear the search term from the searchItem variable
    const handleClear = () => {
        setSearchTerm("")
        searchRef.current.value = ""
    }

    return (
        <div className='search-box'>
            <input ref={searchRef} type='text' placeholder='Type here to search' />
            <button type='button' onClick={handleSearch}>Search</button>
            <button type='button' onClick={handleClear}>Clear</button>
        </div>
    )
}

export default Search