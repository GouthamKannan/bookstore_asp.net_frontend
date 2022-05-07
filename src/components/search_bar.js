import React from 'react';

// Search bar component
class SearchBar extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            search_text  : ""
        }
    }

    // Search button click
    search() {
        this.props.onSearch(this.state.search_text)
    }

    // Handle change in search input
    handleChange = ({ target: { name, value } }) => {
        this.setState({ ...this.state, [name]: value });
        this.props.onSearch(value)
    };

    render() {
        return (
            <div className='search-bar'>
                <input className="search-input" type="text" name="search_text" placeholder="Search book name"
                value={this.state.search_text} onChange={evt => this.handleChange(evt)}/>
                <button className="btn-primary search-button" onClick={this.search}>search</button>
            </div>
        )
    }
}

export default SearchBar;