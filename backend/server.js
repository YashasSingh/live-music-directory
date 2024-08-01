const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profile');
const profilesRoutes = require('./routes/profiles');
const gigRoutes = require('./routes/gigs');
const submissionRoutes = require('./routes/submissions');
const commentsRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/profile', profileRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/recaptcha-site-key', (req, res) => {
    res.json({ siteKey: process.env.RECAPTCHA_SITE_KEY });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const notifyStatusUpdate = (submission) => {
    io.emit('statusUpdate', submission);
};

const simulateStatusUpdate = () => {
    setInterval(async () => {
        const submissions = await readSubmissions();
        if (submissions.length > 0) {
            const submission = submissions[Math.floor(Math.random() * submissions.length)];
            submission.status = submission.status === 'Pending' ? 'Approved' : 'Pending';
            await saveSubmission(submission.userId, submission.gigId, submission.status);
            notifyStatusUpdate(submission);
        }
    }, 10000);
};

const spotifyRoutes = require('./routes/spotify');
const likesRoutes = require('./routes/likes');

app.use('/api/likes', likesRoutes);
app.use('/api/spotify', spotifyRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    simulateStatusUpdate();
});
