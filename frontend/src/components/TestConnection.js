// frontend/src/components/TestConnection.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestConnection = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const res = await axios.get('/api/test');
                setMessage(res.data.message);
            } catch (err) {
                setMessage('Failed to connect to backend');
            }
        };
        checkConnection();
    }, []);

    return (
        <div>
            <h2>Backend Connection Test</h2>
            <p>{message}</p>
        </div>
    );
};

export default TestConnection;
