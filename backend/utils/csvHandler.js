const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

const submissionsFilePath = path.join(__dirname, '..', 'data', 'submissions.csv');

const readSubmissions = () => {
    return new Promise((resolve, reject) => {
        const submissions = [];
        fs.createReadStream(submissionsFilePath)
            .pipe(csv())
            .on('data', (row) => submissions.push(row))
            .on('end', () => resolve(submissions))
            .on('error', (err) => reject(err));
    });
};

const saveSubmission = (userId, gigId, status = 'Pending') => {
    return new Promise((resolve, reject) => {
        const submission = { id: uuidv4(), userId, gigId, status };
        const csvData = `${submission.id},${submission.userId},${submission.gigId},${submission.status}\n`;

        fs.appendFile(submissionsFilePath, csvData, (err) => {
            if (err) return reject(err);
            resolve(submission);
        });
    });
};

module.exports = {
    readSubmissions,
    saveSubmission
};
