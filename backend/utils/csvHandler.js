// backend/utils/csvHandler.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const filePath = path.join(__dirname, '..', 'data', 'users.csv');

// Read all users from the CSV file
const readUsers = () => {
    return new Promise((resolve, reject) => {
        const users = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => users.push(row))
            .on('end', () => resolve(users))
            .on('error', (err) => reject(err));
    });
};

// Save a new user to the CSV file
const saveUser = (username, password, email) => {
    return new Promise((resolve, reject) => {
        const user = { username, password, email };
        const csvData = `${user.username},${user.password},${user.email}\n`;

        fs.appendFile(filePath, csvData, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

module.exports = {
    readUsers,
    saveUser
};
