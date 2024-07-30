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

const SocialMediaLinks = styled.div`
    margin: 1rem 0;
    text-align: center;

    a {
        margin: 0 10px;
    }
`;

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [socialMediaLinks, setSocialMediaLinks] = useState({});
    const [streamingData, setStreamingData] = useState({});

    const fetchProfile = async () => {
        const res = await axios.get('/api/profile', {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        setProfile(res.data);
        setSocialMediaLinks(res.data.socialMediaLinks || {});
        setStreamingData(res.data.streamingData || {});
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSave = async () => {
        const res = await axios.put(
            '/api/profile',
            { socialMediaLinks, streamingData },
            {
                headers: {
                    'x-auth-token': localStorage.getItem('token'),
                },
            }
        );
        setProfile(res.data);
        setEditMode(false);
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
                <h3>Social Media Links</h3>
                {editMode ? (
                    <div>
                        <input
                            type="text"
                            value={socialMediaLinks.facebook || ''}
                            onChange={(e) =>
                                setSocialMediaLinks({
                                    ...socialMediaLinks,
                                    facebook: e.target.value,
                                })
                            }
                            placeholder="Facebook"
                        />
                        <input
                            type="text"
                            value={socialMediaLinks.twitter || ''}
                            onChange={(e) =>
                                setSocialMediaLinks({
                                    ...socialMediaLinks,
                                    twitter: e.target.value,
                                })
                            }
                            placeholder="Twitter"
                        />
                        <input
                            type="text"
                            value={socialMediaLinks.instagram || ''}
                            onChange={(e) =>
                                setSocialMediaLinks({
                                    ...socialMediaLinks,
                                    instagram: e.target.value,
                                })
                            }
                            placeholder="Instagram"
                        />
                    </div>
                ) : (
                    <SocialMediaLinks>
                        {socialMediaLinks.facebook && (
                            <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        )}
                        {socialMediaLinks.twitter && (
                            <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">
                                Twitter
                            </a>
                        )}
                        {socialMediaLinks.instagram && (
                            <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                        )}
                    </SocialMediaLinks>
                )}
            </ProfileItem>
            <ProfileItem>
                <h3>Streaming Data</h3>
                {editMode ? (
                    <div>
                        <input
                            type="text"
                            value={streamingData.spotify || ''}
                            onChange={(e) =>
                                setStreamingData({
                                    ...streamingData,
                                    spotify: e.target.value,
                                })
                            }
                            placeholder="Spotify"
                        />
                        <input
                            type="text"
                            value={streamingData.soundcloud || ''}
                            onChange={(e) =>
                                setStreamingData({
                                    ...streamingData,
                                    soundcloud: e.target.value,
                                })
                            }
                            placeholder="SoundCloud"
                        />
                    </div>
                ) : (
                    <div>
                        {streamingData.spotify && (
                            <p>Spotify: {streamingData.spotify}</p>
                        )}
                        {streamingData.soundcloud && (
                            <p>SoundCloud: {streamingData.soundcloud}</p>
                        )}
                    </div>
                )}
            </ProfileItem>
            <UploadFile type="image" onUpload={handleImageUpload} />
            <UploadFile type="video" onUpload={handleVideoUpload} />
            {editMode ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={() => setEditMode(true)}>Edit</button>
            )}
            <Comments profileId={profile.id} />
        </ProfileContainer>
    );
};

export default Profile;
