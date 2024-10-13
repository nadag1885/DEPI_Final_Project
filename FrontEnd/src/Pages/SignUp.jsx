import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignUp.css';

const SignUp = ({ handleLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',  
    });

    const [isLoginMode, setIsLoginMode] = useState(true);  

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
    };
    const navigate = useNavigate();




    const onSubmit = (e) => {
        e.preventDefault();  
        const url = isLoginMode ? process.env.REACT_APP_BE_API +'/users/login' : process.env.REACT_APP_BE_API +'/users/register';  
        fetch(url, {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                
                response.json().then((body)=>localStorage.setItem('token',body.type + " " + body.token))
                handleLogin(); 
                console.error(`${isLoginMode ? 'Login' : 'Signup'} failed`);
                navigate('/');

            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };




    return (
        <div className="wrapper">
            <div className="card-switch">
                <label className="switch">
                    <input className="toggle" type="checkbox" onClick={toggleMode} />
                    <span className="slider" />
                    <span className="card-side" />
                    <div className="flip-card__inner">
                        <div className={`flip-card__front ${isLoginMode ? 'visible' : ''}`}>
                            <div className="title">Log in</div>
                            <form className="flip-card__form" onSubmit={onSubmit}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="flip-card__input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="flip-card__input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button className="flip-card__btn" type="submit" onSubmit={onSubmit}>Log In</button>
                            </form>
                        </div>

                        <div className={`flip-card__back ${!isLoginMode ? 'visible' : ''}`}>
                            <div className="title">Sign up</div>
                            <form className="flip-card__form" onSubmit={onSubmit}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className="flip-card__input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="flip-card__input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className="flip-card__input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button className="flip-card__btn" type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default SignUp;
