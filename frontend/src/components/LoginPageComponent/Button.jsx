import React from 'react';
import '../../pages/LoginPage/css/Button.css'; // Import the CSS file without assigning it to `styles`

function Button({ children, type }) {
    return (
        <button type={type} className="button"> {/* Use the class name as a string */}
            {children}
        </button>
    );
}

export default Button;