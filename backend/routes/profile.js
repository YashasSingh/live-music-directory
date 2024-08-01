const express = require('express');
const { readUsers, saveUser } = require('../utils/csvHandler');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        const users = await readUsers();
        const user = users.find((user) => user.id === req.user.id);
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update user profile
router.post('/update', auth, async (req, res) => {
    const { name, bio, bandPicture, video, socialMediaLinks, streamingData } = req.body;

    try {
        const users = await readUsers();
        const userIndex = users.findIndex((user) => user.id === req.user.id);
        if (userIndex === -1) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const user = users[userIndex];
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.bandPicture = bandPicture || user.bandPicture;
        user.video = video || user.video;
        user.socialMediaLinks = socialMediaLinks || user.socialMediaLinks;
        user.streamingData = streamingData || user.streamingData;

        // Save the updated user data
        const updatedUsers = users.map((u, index) => (index === userIndex ? user : u));
        fs.writeFileSync(usersFilePath, updatedUsers.map(u => `${u.id},${u.name},${u.email},${u.password},${u.bio},${u.bandPicture},${u.video},${JSON.stringify(u.socialMediaLinks)},${JSON.stringify(u.streamingData)}\n`).join(''));

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
