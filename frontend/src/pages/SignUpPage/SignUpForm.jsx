import React, { useState } from "react";
import InputField from '../../components/LoginPageComponent/InputField';
import Button from '../../components/LoginPageComponent/Button';

function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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

    React.useEffect(() => {
        if (!nameError && !emailError && !passwordError && name && email && password) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [nameError, emailError, passwordError, name, email, password]);

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
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 3000);
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
        <main className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                <section className="md:w-1/2 p-8 flex flex-col items-center">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e03d653b62cc505993e9401f4fb2e675a31c8ae6f6e7f72abb5faa7e8555ea88?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                        alt="Sign up page illustration"
                    />
                    <h1 className="text-3xl font-semibold text-gray-700">Get Started Now</h1>
                    <p className="text-gray-500 mt-2 mb-6 text-center">
                        Join us to get access to our services
                    </p>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <InputField
                            label="Name"
                            placeholder="Enter your name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            error={nameError}
                        />
                        {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}

                        <InputField
                            label="Email address"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                        <InputField
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

                        <Button type="submit" disabled={!formValid}>
                            Sign Up
                        </Button>
                    </form>
                    {submitError && <p className="text-red-500 text-sm mt-4">{submitError}</p>}
                    {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}
                </section>
                <section className="md:w-1/2">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ade2b578052d3dacbcc8e6e943afa1644eb7b9913ebe4758b47030ec9f18e863?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346"
                        alt="Sign up page feature"
                        className="w-full h-full object-cover"
                    />
                </section>
            </div>
        </main>
    );
}

export default SignUpForm;
