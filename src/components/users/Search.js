import React from 'react';
import PropTypes from "prop-types";

class Search extends React.Component {
    state = {
        query: ''
    }

    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.query.trim() === '') {
            this.props.setAlert('Please enter something!', 'light')
            return;
        }
        this.props.onSearch(this.state.query)
        this.setState({query: ''})
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" value={this.state.query} name='query' onChange={this.onChange} placeholder='search'/>
                <input
                    type="submit"
                    value='search'
                    className='btn btn-dark btn-block'/>
                {this.props.showClear && <input
                    onClick={this.props.onClear}
                    type="button"
                    value='clear'
                    className='btn btn-light btn-block'/>}
            </form>
        );
    }
}

export default Search;