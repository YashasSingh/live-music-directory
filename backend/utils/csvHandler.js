const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.csv');

// Read all users from the CSV file
const readUsers = () => {
    return new Promise((resolve, reject) => {
        const users = [];
        fs.createReadStream(usersFilePath)
            .pipe(csv())
            .on('data', (row) => users.push(row))
            .on('end', () => resolve(users))
            .on('error', (err) => reject(err));
    });
};

// Save a new user to the CSV file
const saveUser = (name, email, password, bio = '', bandPicture = '', video = '', socialMediaLinks = '{}', streamingData = '{}') => {
    return new Promise((resolve, reject) => {
        const user = { id: uuidv4(), name, email, password, bio, bandPicture, video, socialMediaLinks, streamingData };
        const csvData = `${user.id},${user.name},${user.email},${user.password},${user.bio},${user.bandPicture},${user.video},${JSON.stringify(user.socialMediaLinks)},${JSON.stringify(user.streamingData)}\n`;

        fs.appendFile(usersFilePath, csvData, (err) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
};

module.exports = {
    readUsers,
    saveUser
};
