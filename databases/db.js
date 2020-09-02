const path = require('path');
const sqlite3 = require('sqlite3').verbose();

//Connection at the Database Sqlite
const dbName = path.join(__dirname,'301.db');

module.exports = {
    connect: new sqlite3.Database(dbName, (err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log('Connect to the Database success');
    }),
} 