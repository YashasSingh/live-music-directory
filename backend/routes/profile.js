// backend/routes/profile.js

const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update user profile
router.put('/', auth, async (req, res) => {
    const { bio, bandPicture, videos, socialMediaLinks, streamingData } = req.body;

    try {
        let user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.bio = bio || user.bio;
        user.bandPicture = bandPicture || user.bandPicture;
        user.videos = videos || user.videos;
        user.socialMediaLinks = socialMediaLinks || user.socialMediaLinks;
        user.streamingData = streamingData || user.streamingData;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
