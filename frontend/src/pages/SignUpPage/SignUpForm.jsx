import React from "react";
import { Link } from 'react-router-dom';
import '../LoginPage/css/LoginPage.css';
import InputField from '../../components/LoginPageComponent/InputField';
import Button from '../../components/LoginPageComponent/Button';
import CheckboxField from '../../components/LoginPageComponent/CheckboxField';

function SignUpForm() {
    return (
        <main className="loginContainer">
            <div className="contentWrapper">
                <section className="formSection">
                    <div className="formContent">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e03d653b62cc505993e9401f4fb2e675a31c8ae6f6e7f72abb5faa7e8555ea88?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346" alt="Login page illustration" className="loginIllustration" />
                        <div className="formWrapper">
                            <div className="formInner">
                                <h1 className="welcomeTitle">Get Start Now</h1>
                                <p className="loginInstruction">
                                   Join us to get access to our services
                                </p>
                                <form className="loginForm">
                                    <InputField label="Name" placeholder="Enter your name" type="text" />
                                    <InputField label="Email address" placeholder="Enter your email" type="email" />
                                    <InputField label="Password" placeholder="Enter your password" type="password" />
                                    <Button type="submit" > Sign Up </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="imageSection">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ade2b578052d3dacbcc8e6e943afa1644eb7b9913ebe4758b47030ec9f18e863?placeholderIfAbsent=true&apiKey=109e5ef2921f4f19976eeca47438f346" alt="Login page feature" className="featureImage" />
                </section>
            </div>
        </main>
    );
}

export default SignUpForm;