// backend/routes/profiles.js

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const auth = require('../middleware/auth');

// Get all profiles
router.get('/', auth, async (req, res) => {
    try {
        const profiles = await User.findAll();
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
