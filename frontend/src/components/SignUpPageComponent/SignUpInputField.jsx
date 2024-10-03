import React from 'react';

const SignUpInputField = ({ label, type = 'text', id, placeholder }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                aria-label={label}
            />
        </div>
    );
};

export default SignUpInputField;
