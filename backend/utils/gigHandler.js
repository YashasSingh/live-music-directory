const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

const gigsFilePath = path.join(__dirname, '..', 'data', 'gigs.csv');

const readGigs = () => {
    return new Promise((resolve, reject) => {
        const gigs = [];
        fs.createReadStream(gigsFilePath)
            .pipe(csv())
            .on('data', (row) => gigs.push(row))
            .on('end', () => resolve(gigs))
            .on('error', (err) => reject(err));
    });
};

const saveGig = (title, description, date, location) => {
    return new Promise((resolve, reject) => {
        const gig = { id: uuidv4(), title, description, date, location };
        const csvData = `${gig.id},${gig.title},${gig.description},${gig.date},${gig.location}\n`;

        fs.appendFile(gigsFilePath, csvData, (err) => {
            if (err) return reject(err);
            resolve(gig);
        });
    });
};

module.exports = {
    readGigs,
    saveGig
};
