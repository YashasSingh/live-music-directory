// backend/routes/gigs.js

const express = require('express');
const auth = require('../middleware/auth');
const Gig = require('../models/Gig');

const router = express.Router();

// Get all gigs
router.get('/', async (req, res) => {
    try {
        const gigs = await Gig.findAll();
        res.json(gigs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a new gig
router.post('/', auth, async (req, res) => {
    const { title, description, date } = req.body;

    try {
        const gig = await Gig.create({ title, description, date });
        res.json(gig);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
