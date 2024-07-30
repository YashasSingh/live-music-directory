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
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProfileItem = styled.div`
    margin: 1rem 0;
    text-align: center;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
`;

const Video = styled.video`
    width: 100%;
    height: auto;
    margin-bottom: 10px;
`;

const SocialLink = styled.a`
    display: inline-block;
    margin-right: 10px;
    color: #1db954;
    &:hover {
        color: #1ed760;
    }
`;

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [editing, setEditing] = useState(false);

    const [bio, setBio] = useState('');
    const [bandPicture, setBandPicture] = useState('');
    const [videos, setVideos] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [streamingData, setStreamingData] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await axios.get('/api/profile', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setProfile(res.data);
            setBio(res.data.bio);
            setBandPicture(res.data.bandPicture);
            setVideos(res.data.videos || []);
            setSocialMediaLinks(res.data.socialMediaLinks || []);
            setStreamingData(res.data.streamingData);
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            await axios.put('/api/profile', {
                bio,
                bandPicture,
                videos,
                socialMediaLinks,
                streamingData,
            });
            setEditing(false);
            const res = await axios.get('/api/profile'); // Refresh profile data
            setProfile(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleImageUpload = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    const handleVideoUpload = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    return (
        <ProfileContainer>
            <ProfileImage src={bandPicture} alt="Band" />
            {editing ? (
                <>
                    <input
                        type="text"
                        value={bandPicture}
                        onChange={(e) => setBandPicture(e.target.value)}
                    />
                    <input
                        type="text"
                        value={profile.name}
                        readOnly
                    />
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <ProfileItem>
                        <h2>{profile.name}</h2>
                    </ProfileItem>
                    <ProfileItem>
                        <p>{bio}</p>
                    </ProfileItem>
                </>
            )}
            <ProfileItem>
                <h3>Videos</h3>
                {videos.map((video, index) => (
                    <Video key={index} controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </Video>
                ))}
                {editing && (
                    <textarea
                        value={videos.join(',')}
                        onChange={(e) => setVideos(e.target.value.split(','))}
                    />
                )}
            </ProfileItem>
            <ProfileItem>
                <h3>Social Media Links</h3>
                {socialMediaLinks.map((link, index) => (
                    <SocialLink key={index} href={link.url} target="_blank">
                        {link.platform}
                    </SocialLink>
                ))}
                {editing && (
                    <textarea
                        value={socialMediaLinks.map(link => `${link.platform}:${link.url}`).join(',')}
                        onChange={(e) => setSocialMediaLinks(e.target.value.split(',').map(link => {
                            const [platform, url] = link.split(':');
                            return { platform, url };
                        }))}
                    />
                )}
            </ProfileItem>
            <ProfileItem>
                <h3>Streaming Data</h3>
                {editing ? (
                    <textarea
                        value={streamingData}
                        onChange={(e) => setStreamingData(e.target.value)}
                    />
                ) : (
                    <p>{streamingData}</p>
                )}
            </ProfileItem>
            <button onClick={() => setEditing(!editing)}>
                {editing ? 'Cancel' : 'Edit'}
            </button>
            {editing && <button onClick={handleSave}>Save</button>}
            <UploadFile type="image" onUpload={handleImageUpload} />
            <UploadFile type="video" onUpload={handleVideoUpload} />
            <Comments profileId={profile.id} />
        </ProfileContainer>
    );
};

export default Profile;
