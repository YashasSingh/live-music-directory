// frontend/src/components/EPK.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EPKContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
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

const EPK = () => {
    const [artist, setArtist] = useState(null);
    const [editing, setEditing] = useState(false);

    const [bio, setBio] = useState('');
    const [bandPicture, setBandPicture] = useState('');
    const [videos, setVideos] = useState([]);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [streamingData, setStreamingData] = useState('');

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const res = await axios.get('/api/profile'); // Assuming the user is logged in and the endpoint returns their profile
                setArtist(res.data);
                setBio(res.data.bio);
                setBandPicture(res.data.bandPicture);
                setVideos(res.data.videos);
                setSocialMediaLinks(res.data.socialMediaLinks);
                setStreamingData(res.data.streamingData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchArtistData();
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
            setArtist(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <EPKContainer>
            <Section>
                <ProfileImage src={bandPicture} alt="Artist" />
                {editing ? (
                    <>
                        <input
                            type="text"
                            value={bandPicture}
                            onChange={(e) => setBandPicture(e.target.value)}
                        />
                        <input
                            type="text"
                            value={artist.name}
                            readOnly
                        />
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <h2>{artist.name}</h2>
                        <p>{bio}</p>
                    </>
                )}
            </Section>
            <Section>
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
            </Section>
            <Section>
                <h3>Social Media</h3>
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
            </Section>
            <Section>
                <h3>Streaming Data</h3>
                {editing ? (
                    <textarea
                        value={streamingData}
                        onChange={(e) => setStreamingData(e.target.value)}
                    />
                ) : (
                    <p>{streamingData}</p>
                )}
            </Section>
            <button onClick={() => setEditing(!editing)}>
                {editing ? 'Cancel' : 'Edit'}
            </button>
            {editing && <button onClick={handleSave}>Save</button>}
        </EPKContainer>
    );
};

export default EPK;
