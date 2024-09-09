import React from 'react';
import '../../pages/SignUpPage/css/SignUpForm.css';

const SignUpInputField = ({ label, type, id, placeholder }) => {
    return (
        <div className="inputGroup">
            <label htmlFor={id} className="inputLabel">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className="inputField"
                aria-label={label}
            />
        </div>
    );
};

export default SignUpInputField;