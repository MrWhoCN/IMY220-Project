import React from 'react';

function CheckboxField({ label }) {
    return (
        <div className="flex items-center space-x-2"> {/* Flexbox for alignment */}
            <input
                type="checkbox"
                id="rememberMe"
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
                htmlFor="rememberMe"
                className="text-gray-700">
                {label}
            </label>
        </div>
    );
}

export default CheckboxField;
