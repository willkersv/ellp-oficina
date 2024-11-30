import React from 'react';
import '../Telas/css/global.css';

const InputField = ({ icon, type, placeholder, value, onChange }) => {
    return (
        <div className="input-group">
            <img src={icon} alt={`${placeholder} Icon`} className="icon" />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                className="input"
            />
        </div>
    );
};

export default InputField;
