// backend/routes/comments.js

const express = require('express');
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const User = require('../models/User');

const router = express.Router();

// Get comments for a profile
router.get('/:profileId', auth, async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { profileId: req.params.profileId },
            include: [{ model: User, attributes: ['name'] }]
        });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Post a comment
router.post('/:profileId', auth, async (req, res) => {
    const { content } = req.body;

    try {
        const newComment = await Comment.create({
            content,
            userId: req.user.id,
            profileId: req.params.profileId
        });
        const comment = await Comment.findByPk(newComment.id, {
            include: [{ model: User, attributes: ['name'] }]
        });
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
