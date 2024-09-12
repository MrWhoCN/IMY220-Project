import React from 'react';
import './CheckboxField.css'; // Import the CSS file without assigning to `styles`

function CheckboxField({ label }) {
    return (
        <div className="checkboxWrapper"> {/* Use the class name as a string */}
            <input type="checkbox" id="rememberMe" className="checkbox" />
            <label htmlFor="rememberMe" className="checkboxLabel">
                {label}
            </label>
        </div>
    );
}

export default CheckboxField;