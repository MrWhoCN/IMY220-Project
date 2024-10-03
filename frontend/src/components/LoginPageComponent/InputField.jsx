import React from 'react';

function InputField({ label, placeholder, type = 'text', value, onChange, error }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-label={label}
                aria-invalid={error ? 'true' : 'false'}
            />
            {error && (
                <span className="text-red-500 text-sm mt-1">
                    {error}
                </span>
            )}
        </div>
    );
}

export default InputField;
