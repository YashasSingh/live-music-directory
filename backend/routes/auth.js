const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const users = {}; // Simulate a database with an object

const csvFilePath = path.join(__dirname, '../utils/user.csv');

// Middleware to save user info to CSV
const saveUserToCSV = (username, email) => {
    const user = { username, email };
    const csvLine = `${user.username},${user.email}\n`;
    fs.appendFileSync(csvFilePath, csvLine, (err) => {
        if (err) {
            console.error('Failed to save user to CSV:', err);
        }
    });
};

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
    '/login',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            // Simulate user lookup in database
            const user = users[username];

            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                user: {
                    id: username
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    saveUserToCSV(username, user.email); // Save user info to CSV
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
