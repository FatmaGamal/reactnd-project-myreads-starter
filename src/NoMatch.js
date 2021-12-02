import React from 'react';

const NoMatch = () => {
    return (
        <h3>No match for <code>{window.location.pathname}</code>, please try using a valid URL!</h3>
    );
}

export default NoMatch;