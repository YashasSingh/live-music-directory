// backend/services/spotifyService.js

const axios = require('axios');
const querystring = require('querystring');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const getSpotifyToken = async () => {
    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({ grant_type: 'client_credentials' }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
        }
    );
    return response.data.access_token;
};

const getArtist = async (artistId) => {
    const token = await getSpotifyToken();
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

module.exports = { getArtist };
