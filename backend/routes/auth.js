// backend/routes/auth.js
const express = require('express');
const fetch = require('node-fetch');
const { readUsers, saveUser } = require('../utils/csvHandler');

const router = express.Router();

const CAPTCHA_SECRET = 'your-captcha-secret-key';

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
    const { username, password, email, captcha } = req.body;

    if (!captcha) {
        return res.status(400).json({ success: false, message: 'CAPTCHA is required' });
    }

    // Verify CAPTCHA
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET}&response=${captcha}`;
    const response = await fetch(verifyUrl, { method: 'POST' });
    const captchaResult = await response.json();

    if (!captchaResult.success) {
        return res.status(400).json({ success: false, message: 'CAPTCHA verification failed' });
    }

    const users = await readUsers();
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    await saveUser(username, password, email);
    res.json({ success: true, message: 'User registered successfully' });
});

module.exports = router;
