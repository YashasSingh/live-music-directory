const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

const commentsFilePath = path.join(__dirname, '..', 'data', 'comments.csv');

const readComments = () => {
    return new Promise((resolve, reject) => {
        const comments = [];
        fs.createReadStream(commentsFilePath)
            .pipe(csv())
            .on('data', (row) => comments.push(row))
            .on('end', () => resolve(comments))
            .on('error', (err) => reject(err));
    });
};

const saveComment = (text, userId, profileId) => {
    return new Promise((resolve, reject) => {
        const comment = { id: uuidv4(), text, userId, profileId, createdAt: new Date().toISOString() };
        const csvData = `${comment.id},${comment.text},${comment.userId},${comment.profileId},${comment.createdAt}\n`;

        fs.appendFile(commentsFilePath, csvData, (err) => {
            if (err) return reject(err);
            resolve(comment);
        });
    });
};

module.exports = {
    readComments,
    saveComment
};
