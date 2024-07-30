// backend/routes/likes.js

const express = require('express');
const auth = require('../middleware/auth');
const Like = require('../models/Like');

const router = express.Router();

// Get likes for a profile
router.get('/:profileId', auth, async (req, res) => {
    try {
        const likes = await Like.count({ where: { profileId: req.params.profileId } });
        res.json({ count: likes });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Like a profile
router.post('/:profileId', auth, async (req, res) => {
    try {
        const existingLike = await Like.findOne({
            where: { userId: req.user.id, profileId: req.params.profileId },
        });
        if (existingLike) return res.status(400).json({ msg: 'Profile already liked' });

        await Like.create({ userId: req.user.id, profileId: req.params.profileId });
        res.json({ msg: 'Profile liked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Unlike a profile
router.delete('/:profileId', auth, async (req, res) => {
    try {
        const existingLike = await Like.findOne({
            where: { userId: req.user.id, profileId: req.params.profileId },
        });
        if (!existingLike) return res.status(400).json({ msg: 'Profile not liked' });

        await existingLike.destroy();
        res.json({ msg: 'Profile unliked' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
