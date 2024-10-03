import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation
import Cookies from 'js-cookie'; // For handling cookies
import InputField from '../../components/LoginPageComponent/InputField';
import Button from '../../components/LoginPageComponent/Button';
import CheckboxField from '../../components/LoginPageComponent/CheckboxField';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate(); // React Router hook for navigation

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

    useEffect(() => {
        if (!emailError && !passwordError && email && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [emailError, passwordError, email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValid) {
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    Cookies.set('userId', data._id, { expires: 30 });
                    Cookies.set('username', data.username, { expires: 30 });
                    navigate('/home');
                } else {
                    const errorMessage = await response.text();
                    setSubmitError(errorMessage);
                }
            } catch (error) {
                setSubmitError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                <section className="md:w-1/2 p-8 flex flex-col items-center">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e03d653b62cc505993e9401f4fb2e675a31c8ae6f6e7f72abb5faa7e8555ea88?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                        alt="Login page illustration"
                    />
                    <h1 className="text-3xl font-semibold text-gray-700">Welcome</h1>
                    <p className="text-gray-500 mt-2 mb-6 text-center">
                        Enter your credentials to access your account
                    </p>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <InputField
                            label="Email address"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}

                        <InputField
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}

                        <CheckboxField label="Remember for 30 days" />

                        <Button type="submit" disabled={!formValid}>
                            Login
                        </Button>
                    </form>
                    {submitError && <p className="text-red-500 text-sm mt-4">{submitError}</p>}

                    <p className="text-gray-500 mt-4">
                        Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                    </p>
                </section>
                <section className="md:w-1/2">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ade2b578052d3dacbcc8e6e943afa1644eb7b9913ebe4758b47030ec9f18e863?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                        alt="Login page feature"
                        className="w-full h-full object-cover"
                    />
                </section>
            </div>
        </main>
    );
}

export default LoginPage;
