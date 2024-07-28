// frontend/src/components/Gigs.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gigs = () => {
    const [gigs, setGigs] = useState([]);

    useEffect(() => {
        const fetchGigs = async () => {
            const res = await axios.get('/api/gigs');
            setGigs(res.data);
        };
        fetchGigs();
    }, []);

    return (
        <div>
            <h1>Available Gigs</h1>
            <ul>
                {gigs.map(gig => (
                    <li key={gig.id}>
                        <h2>{gig.title}</h2>
                        <p>{gig.description}</p>
                        <p>{new Date(gig.date).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gigs;
