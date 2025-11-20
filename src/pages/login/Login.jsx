import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement login logic
        console.log('Login submitted:', formData);
        // Simulate successful login
        navigate('/dashboard');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="branding">
                    <h2>M-BOP</h2>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john.doe@example.com"
                            required
                            aria-label="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            aria-label="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="forgot-password">
                        <a href="#" aria-label="Forgot Password?">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn-primary">Login</button>
                </form>
                <p className="security-text">
                    Your data is secure. We use industry-standard encryption for your
                    information.
                </p>
            </div>
        </div>
    );
};

export default Login;
