// backend/routes/submissions.js

const express = require('express');
const auth = require('../middleware/auth');
const Submission = require('../models/Submission');
const Gig = require('../models/Gig');

const router = express.Router();

// Get all submissions for a user
router.get('/', auth, async (req, res) => {
    try {
        const submissions = await Submission.findAll({
            where: { UserId: req.user.id },
            include: [Gig]
        });
        res.json(submissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new submission
router.post('/', auth, async (req, res) => {
    const { gigId } = req.body;

    try {
        const submission = await Submission.create({
            UserId: req.user.id,
            GigId: gigId
        });
        res.json(submission);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
