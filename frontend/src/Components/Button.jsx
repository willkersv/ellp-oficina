import React from 'react';
import '../Telas/css/global.css';

const Button = ({ onClick, type = 'button', children, className = '' }) => {
    return (
        <button type={type} onClick={onClick} className={`button ${className}`}>
            {children}
        </button>
    );
};

export default Button;
