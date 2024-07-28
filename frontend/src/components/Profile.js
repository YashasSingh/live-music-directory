// frontend/src/components/Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await axios.get('/api/profile', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setProfile(res.data);
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Bio: {profile.bio}</p>
            <p>Band Picture: <img src={profile.bandPicture} alt="Band" /></p>
            <p>Video: <a href={profile.video}>Watch</a></p>
            <p>Social Media Links: {JSON.stringify(profile.socialMediaLinks)}</p>
            <p>Streaming Data: {JSON.stringify(profile.streamingData)}</p>
        </div>
    );
};

export default Profile;
