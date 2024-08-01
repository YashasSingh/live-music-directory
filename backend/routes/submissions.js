const express = require('express');
const auth = require('../middleware/auth');
const { readSubmissions, saveSubmission } = require('../utils/csvHandler');

const router = express.Router();

// Get all submissions for a user
router.get('/', auth, async (req, res) => {
    try {
        const submissions = await readSubmissions();
        const userSubmissions = submissions.filter(submission => submission.userId === req.user.id);
        res.json(userSubmissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new submission
router.post('/', auth, async (req, res) => {
    const { gigId } = req.body;

    try {
        const submission = await saveSubmission(req.user.id, gigId);
        res.json(submission);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
