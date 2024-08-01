import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
`;

const Form = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    margin: 1rem 0;
    padding: 0.5rem;
    width: 200px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();



    const handleSignup = async () => {
        try {
            const res = await axios.post('/api/auth/signup', { username, password, email });
            if (res.data.success) {
                navigate('/login');
            } else {
                console.error(res.data.message);
            }
        } catch (err) {
            console.error(err.response.data.message);
        }
    };

    return (
        <SignupContainer>
            <Form>
                <h2>Signup</h2>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button onClick={handleSignup}>Signup</Button>
            </Form>
        </SignupContainer>
    );
};

export default Signup;
