// frontend/src/components/Submissions.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            const res = await axios.get('/api/submissions', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setSubmissions(res.data);
        };
        fetchSubmissions();
    }, []);

    return (
        <div>
            <h1>My Submissions</h1>
            <ul>
                {submissions.map(submission => (
                    <li key={submission.id}>
                        <h2>{submission.Gig.title}</h2>
                        <p>Status: {submission.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Submissions;
