// backend/server.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const profileRoutes = require('./routes/profile');
const profilesRoutes = require('./routes/profiles');
const gigRoutes = require('./routes/gigs');
const submissionRoutes = require('./routes/submissions');
const commentsRoutes = require('./routes/comments');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Body parser middleware
app.use(bodyParser.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define routes
app.use('/api/profile', profileRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/comments', commentsRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Notify submission status updates
const notifyStatusUpdate = (submission) => {
    io.emit('statusUpdate', submission);
};

// Mock function to simulate status update
const simulateStatusUpdate = () => {
    setInterval(async () => {
        const submissions = await Submission.findAll();
        if (submissions.length > 0) {
            const submission = submissions[Math.floor(Math.random() * submissions.length)];
            submission.status = submission.status === 'Pending' ? 'Approved' : 'Pending';
            await submission.save();
            notifyStatusUpdate(submission);
        }
    }, 10000); // Update every 10 seconds for demo purposes
};
const spotifyRoutes = require('./routes/spotify');



const likesRoutes = require('./routes/likes');




app.use('/api/likes', likesRoutes);


app.use('/api/spotify', spotifyRoutes);

// Start server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    simulateStatusUpdate();
});
