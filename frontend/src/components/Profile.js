import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UploadFile from './UploadFile';
import Comments from './Comments';

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9;
    min-height: 100vh;
`;

const ProfileCard = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 600px;
    width: 100%;
    margin-top: 2rem;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 4px solid #007bff;
    margin-bottom: 1rem;
`;

const ProfileItem = styled.div`
    margin: 1rem 0;
    text-align: center;
`;

const ProfileHeader = styled.h2`
    margin: 0.5rem 0;
    color: #333;
`;

const ProfileBio = styled.p`
    font-size: 1rem;
    color: #666;
`;

const ProfileLink = styled.a`
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const ProfileLabel = styled.p`
    font-weight: bold;
    color: #007bff;
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

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/api/profile/upload-image', formData, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        });
        setProfile(res.data);
    };

    const handleVideoUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/api/profile/upload-video', formData, {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        });
        setProfile(res.data);
    };

    return (
        <ProfileContainer>
            <ProfileCard>
                <ProfileImage src={profile.bandPicture} alt="Band" />
                <ProfileItem>
                    <ProfileHeader>{profile.name}</ProfileHeader>
                </ProfileItem>
                <ProfileItem>
                    <ProfileBio>{profile.bio}</ProfileBio>
                </ProfileItem>
                <ProfileItem>
                    <ProfileLink href={profile.video} target="_blank">Watch Video</ProfileLink>
                </ProfileItem>
                <ProfileItem>
                    <ProfileLabel>Social Media Links:</ProfileLabel>
                    <ProfileBio>{JSON.stringify(profile.socialMediaLinks)}</ProfileBio>
                </ProfileItem>
                <ProfileItem>
                    <ProfileLabel>Streaming Data:</ProfileLabel>
                    <ProfileBio>{JSON.stringify(profile.streamingData)}</ProfileBio>
                </ProfileItem>
                <UploadFile type="image" onUpload={handleImageUpload} />
                <UploadFile type="video" onUpload={handleVideoUpload} />
                <Comments profileId={profile.id} />
            </ProfileCard>
        </ProfileContainer>
    );
};

export default Profile;
