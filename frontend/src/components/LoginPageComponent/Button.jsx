import React from 'react';

function Button({ children, type = 'button', disabled = false }) {
    return (
        <button
            type={type}
            className={`px-4 py-2 bg-orange-400 hover:bg-orange-600-600 text-white font-bold rounded-lg transition-colors duration-300 ease-in-out 
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
