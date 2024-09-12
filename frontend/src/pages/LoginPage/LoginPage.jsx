import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/LoginPage.css'; // Import the CSS directly without assigning to `styles`
import InputField from '../../components/LoginPageComponent/InputField';
import Button from '../../components/LoginPageComponent/Button';
import CheckboxField from '../../components/LoginPageComponent/CheckboxField';

function LoginPage() {
    // State for form values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);

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

    // Check if the form is valid
    React.useEffect(() => {
        if (!emailError && !passwordError && email && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [emailError, passwordError, email, password]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValid) {
            console.log("Form submitted with email:", email, "and password:", password);
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
                            alt="Login page illustration"
                            className="loginIllustration"
                        />
                        <div className="formWrapper">
                            <div className="formInner">
                                <h1 className="welcomeTitle">Welcome</h1>
                                <p className="loginInstruction">Enter your Credentials to access your account</p>
                                <form className="loginForm" onSubmit={handleSubmit}>
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

                                    <CheckboxField label="Remember for 30 days" />

                                    {/* Submit Button - Disabled if form is not valid */}
                                    <Button type="submit" disabled={!formValid}>Login</Button>
                                </form>
                                <p className="signUpPrompt">
                                    Don't have an account? <Link to="/signup" className="signUpLink">Sign Up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="imageSection">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ade2b578052d3dacbcc8e6e943afa1644eb7b9913ebe4758b47030ec9f18e863?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                        alt="Login page feature"
                        className="featureImage"
                    />
                </section>
            </div>
        </main>
    );
}

export default LoginPage;