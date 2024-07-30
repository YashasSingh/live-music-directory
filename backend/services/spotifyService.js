// backend/services/spotifyService.js

const axios = require('axios');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const getAccessToken = async () => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const response = await axios.post(tokenUrl, 'grant_type=client_credentials', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        }
    });
    return response.data.access_token;
};

const getArtistInfo = async (artistId) => {
    const token = await getAccessToken();
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
    const response = await axios.get(artistUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

module.exports = {
    getArtistInfo
};
