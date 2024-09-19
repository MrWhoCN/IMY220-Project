import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../LoginPage/css/LoginPage.css';
import InputField from '../../components/LoginPageComponent/InputField';
import Button from '../../components/LoginPageComponent/Button';

function SignUpForm() {
    // State for form values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for validation errors
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // State for form validity
    const [formValid, setFormValid] = useState(false);

    // State for submission error or success message
    const [submitError, setSubmitError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Validation functions
    const validateName = (nameValue) => {
        if (!nameValue.trim()) {
            setNameError('Name is required.');
        } else {
            setNameError('');
        }
    };

    const validateEmail = (emailValue) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            setEmailError('Email is required.');
        } else if (!emailPattern.test(emailValue)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = (passwordValue) => {
        if (!passwordValue) {
            setPasswordError('Password is required.');
        } else if (passwordValue.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
        } else {
            setPasswordError('');
        }
    };

    // Input change handlers
    const handleNameChange = (e) => {
        const nameValue = e.target.value;
        setName(nameValue);
        validateName(nameValue);
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        validateEmail(emailValue);
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        validatePassword(passwordValue);
    };

    // Check form validity whenever there's an update in any field
    React.useEffect(() => {
        if (!nameError && !emailError && !passwordError && name && email && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [nameError, emailError, passwordError, name, email, password]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValid) {
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: name,
                        email: email,
                        password: password,
                    }),
                });

                if (response.ok) {
                    const data = await response.text();
                    setSuccessMessage(data);
                    setSubmitError('');
                } else {
                    const errorData = await response.text();
                    setSubmitError(errorData);
                    setSuccessMessage('');
                }
            } catch (error) {
                setSubmitError('An error occurred. Please try again.');
                setSuccessMessage('');
            }
        }
    };

    return (
        <main className="loginContainer">
            <div className="contentWrapper">
                <section className="formSection">
                    <div className="formContent">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e03d653b62cc505993e9401f4fb2e675a31c8ae6f6e7f72abb5faa7e8555ea88?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                            alt="Sign up page illustration"
                            className="loginIllustration"
                        />
                        <div className="formWrapper">
                            <div className="formInner">
                                <h1 className="welcomeTitle">Get Started Now</h1>
                                <p className="loginInstruction">
                                    Join us to get access to our services
                                </p>
                                <form className="loginForm" onSubmit={handleSubmit}>
                                    {/* Name Field */}
                                    <InputField
                                        label="Name"
                                        placeholder="Enter your name"
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        error={nameError}
                                    />
                                    {nameError && <p className="errorText">{nameError}</p>}

                                    {/* Email Field */}
                                    <InputField
                                        label="Email address"
                                        placeholder="Enter your email"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        error={emailError}
                                    />
                                    {emailError && <p className="errorText">{emailError}</p>}

                                    {/* Password Field */}
                                    <InputField
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        error={passwordError}
                                    />
                                    {passwordError && <p className="errorText">{passwordError}</p>}

                                    {/* Submit Button */}
                                    <Button type="submit" disabled={!formValid}> Sign Up </Button>
                                </form>
                                {/* Show error or success message */}
                                {submitError && <p className="errorText">{submitError}</p>}
                                {successMessage && <p className="successText">{successMessage}</p>}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="imageSection">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ade2b578052d3dacbcc8e6e943afa1644eb7b9913ebe4758b47030ec9f18e863?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                        alt="Sign up page feature"
                        className="featureImage"
                    />
                </section>
            </div>
        </main>
    );
}

export default SignUpForm;
