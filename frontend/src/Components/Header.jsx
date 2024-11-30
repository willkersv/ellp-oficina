import React from 'react';
import '../Telas/css/global.css';

const Header = ({ title }) => {
    return (
        <div className="header">
            <h2 className="text">{title}</h2>
        </div>
    );
};

export default Header;
