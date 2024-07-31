// backend/routes/test.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Backend is connected' });
});

module.exports = router;
