import React from 'react';
import '../../pages/LoginPage/css/InputField.css'; // Import the CSS file without using `styles`

function InputField({ label, placeholder, type }) {
    return (
        <div className="inputWrapper"> {/* Use the class name as a string */}
            <label className="inputLabel">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="inputField"
                aria-label={label}
            />
        </div>
    );
}

export default InputField;