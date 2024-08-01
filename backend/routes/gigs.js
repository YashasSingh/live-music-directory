const express = require('express');
const { readGigs, saveGig } = require('../utils/gigHandler');

const router = express.Router();

// Get all gigs
router.get('/', async (req, res) => {
    try {
        const gigs = await readGigs();
        res.json(gigs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new gig
router.post('/', async (req, res) => {
    const { title, description, date, location } = req.body;

    try {
        const gig = await saveGig(title, description, date, location);
        res.json(gig);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
