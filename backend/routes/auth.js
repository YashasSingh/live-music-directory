// backend/routes/auth.js
const express = require('express');
const { readUsers, saveUser } = require('../utils/csvHandler');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        return res.json({ success: true, message: 'Admin login successful' });
    }

    const users = await readUsers();
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        return res.json({ success: true, message: 'User login successful' });
    } else {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
});

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const users = await readUsers();
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    await saveUser(username, password);
    res.json({ success: true, message: 'User registered successfully' });
});

module.exports = router;
