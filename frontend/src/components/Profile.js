// frontend/src/components/Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UploadFile from './UploadFile';
import Comments from './Comments';

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
`;

const ProfileItem = styled.div`
    margin: 1rem 0;
    text-align: center;
`;

const Profile = () => {
    const [profile, setProfile] = useState({});

    const fetchProfile = async () => {
        const res = await axios.get('/api/profile', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        });
        setProfile(res.data);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleImageUpload = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    const handleVideoUpload = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    return (
        <ProfileContainer>
            <ProfileImage src={profile.bandPicture} alt="Band" />
            <ProfileItem>
                <h2>{profile.name}</h2>
            </ProfileItem>
            <ProfileItem>
                <p>{profile.bio}</p>
            </ProfileItem>
            <ProfileItem>
                <a href={profile.video}>Watch Video</a>
            </ProfileItem>
            <ProfileItem>
                <p>Social Media Links: {JSON.stringify(profile.socialMediaLinks)}</p>
            </ProfileItem>
            <ProfileItem>
                <p>Streaming Data: {JSON.stringify(profile.streamingData)}</p>
            </ProfileItem>
            <UploadFile type="image" onUpload={handleImageUpload} />
            <UploadFile type="video" onUpload={handleVideoUpload} />
            <Comments profileId={profile.id} />
        </ProfileContainer>
    );
};

export default Profile;
