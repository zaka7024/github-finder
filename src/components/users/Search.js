import React, {useState} from 'react';
import PropTypes from "prop-types";

const Search = ({setAlert, onSearch, showClear, onClear}) => {
    const [query, setQuery] = useState('')

    const onChange = (e) => {
        setQuery(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            setAlert('Please enter something!', 'light')
            return;
        }
        onSearch(query)
        setQuery('')
    }

    return (
        <form onSubmit={onSubmit} className='fade-in'>
            <input type="text" value={query} name='query' onChange={onChange} placeholder='search'/>
            <input
                type="submit"
                value='search'
                className='btn btn-dark btn-block'/>
            {showClear && <input
                onClick={onClear}
                type="button"
                value='clear'
                className='btn btn-light btn-block'/>}
        </form>
    );
}

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}

export default Search;