// backend/routes/spotify.js

const express = require('express');
const { getArtist } = require('../services/spotifyService');
const router = express.Router();

// Get artist information
router.get('/artist/:id', async (req, res) => {
    try {
        const artist = await getArtist(req.params.id);
        res.json(artist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
