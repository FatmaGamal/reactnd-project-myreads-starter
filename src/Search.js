import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Search extends Component {
    render() {
        const {query, updateQuery } = this.props;
        return (
        <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => updateQuery(e.target.value)}/>
            </div>
        </div>
        );
    }
}

export default Search;