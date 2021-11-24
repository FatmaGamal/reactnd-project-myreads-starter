import React from 'react';

const Header = (props) => {
    return (
        <div className="list-books-title">
            {props.children ? props.children : (<h1>MyReads</h1>)}
        </div>
    );
}

export default Header;