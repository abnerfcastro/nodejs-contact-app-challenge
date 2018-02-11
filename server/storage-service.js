
const fs = require('fs');
const path = require('path');

const FILENAME = path.join(__dirname, '/storage/data.json');

const StorageService = function() {};

StorageService.prototype.load = function () {
    return new Promise((resolve, reject) => {
        fs.readFile(FILENAME, 'utf8', (err, data) => {
            if (err) reject(err);            
            resolve(JSON.parse(data));
        });
    });
}

StorageService.prototype.save = function (contacts) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(contacts);
        fs.writeFile(FILENAME, data, err => {
            if (err) reject(err);
            resolve();
        });        
    });
}



module.exports = new StorageService();