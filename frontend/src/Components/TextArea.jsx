import React from 'react';
import '../Telas/css/global.css';

const TextArea = ({ placeholder, value, onChange, rows = 4 }) => {
    return (
        <div className="input-group">
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
                className="textarea"
                rows={rows}
            />
        </div>
    );
};

export default TextArea;
