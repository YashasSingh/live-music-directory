// frontend/src/components/Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const HomeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ArtistCard = styled.div`
    width: 200px;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
`;

const ArtistImage = styled.img`
    width: 100%;
    border-radius: 50%;
`;

const LikeButton = styled.button`
    background: #f0f0f0;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background: #ddd;
    }
`;

const Home = () => {
    const [artists, setArtists] = useState([]);
    const artistIds = ['<SPOTIFY_ARTIST_ID_1>', '<SPOTIFY_ARTIST_ID_2>']; // Add artist IDs here

    useEffect(() => {
        const fetchArtists = async () => {
            const promises = artistIds.map(id => axios.get(`/api/spotify/artist/${id}`));
            const results = await Promise.all(promises);
            setArtists(results.map(res => res.data));
        };

        fetchArtists();
    }, []);

    const handleLike = async (profileId) => {
        try {
            await axios.post(`/api/likes/${profileId}`, {}, {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            // Optionally, update state to reflect the like
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <HomeContainer>
            {artists.map(artist => (
                <ArtistCard key={artist.id}>
                    <ArtistImage src={artist.images[0]?.url} alt={artist.name} />
                    <h3>{artist.name}</h3>
                    <LikeButton onClick={() => handleLike(artist.id)}>Like</LikeButton>
                </ArtistCard>
            ))}
        </HomeContainer>
    );
};

export default Home;
