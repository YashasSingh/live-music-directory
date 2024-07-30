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

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const res = await axios.get('/api/profile'); // Assuming the user is logged in and the endpoint returns their profile
                setArtist(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchArtistData();
    }, []);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <EPKContainer>
            <Section>
                <ProfileImage src={artist.bandPicture} alt="Artist" />
                <h2>{artist.name}</h2>
                <p>{artist.bio}</p>
            </Section>
            <Section>
                <h3>Videos</h3>
                {artist.videos.map((video, index) => (
                    <Video key={index} controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </Video>
                ))}
            </Section>
            <Section>
                <h3>Social Media</h3>
                {artist.socialMediaLinks.map((link, index) => (
                    <SocialLink key={index} href={link.url} target="_blank">
                        {link.platform}
                    </SocialLink>
                ))}
            </Section>
            <Section>
                <h3>Streaming Data</h3>
                <p>{artist.streamingData}</p>
            </Section>
        </EPKContainer>
    );
};

export default EPK;
