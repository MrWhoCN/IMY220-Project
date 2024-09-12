import React, { useState } from 'react';
import './InputField.css';

function InputField({ label, placeholder, type = 'text', value, onChange, error }) {
    return (
        <div className="inputWrapper">
            <label className="inputLabel">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`inputField ${error ? 'inputError' : ''}`} // Add error class if validation fails
                aria-label={label}
                aria-invalid={error ? 'true' : 'false'} // Accessibility improvement
            />
            {error && <span className="errorMessage">{error}</span>} {/* Display error message if present */}
        </div>
    );
}

export default InputField;