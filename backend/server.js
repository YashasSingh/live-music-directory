// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

app.get('/', (req, res) => {
    res.send('API is running...');
});


const authRoutes = require('./routes/auth');
// other middlewares and routes
app.use('/api/auth', authRoutes);
