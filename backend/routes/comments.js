const express = require('express');
const { readComments, saveComment } = require('../utils/commentHandler');

const router = express.Router();

// Get all comments for a profile
router.get('/:profileId', async (req, res) => {
    try {
        const comments = await readComments();
        const profileComments = comments.filter(comment => comment.profileId === req.params.profileId);
        res.json(profileComments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    const { text, userId, profileId } = req.body;

    try {
        const comment = await saveComment(text, userId, profileId);
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
