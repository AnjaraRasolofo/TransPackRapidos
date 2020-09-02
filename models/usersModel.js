const db = require('../databases/db');

//Create Database Table and populating default datas
const queryCreateUsers = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)`;

db.connect.run(queryCreateUsers, (err) => {
    if(err) {
        console.error(err.message);
    }
    console.log('Users Table created Successfuly');
});

exports.getAll = (result) => {
    const query = `SELECT id, name, email, role FROM users`;
    db.connect.all(query, [], (err, rows) => {
        if(err) {
            console.error(err.message);
        }
        result(rows);
    })
}

exports.getById = (id, result) => {
    const query = `SELECT id, name, email, role FROM users WHERE id = ?`;
    db.connect.get(query, [id], (err, rows) => {
        if(err) {
            console.error(err.message);
        }
        result(rows);
    })
}

exports.getByEmail = (email, result) => {
    const query = `SELECT id, name, email,password, role FROM users WHERE email = ?`;
    db.connect.get(query, [email], (err, rows) => {
        if(err) {
            console.error(err.message);
        }
        result(rows);
    })
}

exports.add = (param, success) => {
    console.log(param);
    const {name, email, password} = param;
    var role = 'user';
    var passwordCrypted = password;
    const query = `INSERT INTO users(name, email, password, role, created_at, updated_at) VALUES (?,?,?,?,?,?)`;
    const newUser = [name, email, passwordCrypted, role, new Date(), new Date()];
    db.connect.run(query, newUser, (err) => {   
        if(err) {
            throw err;
        }
        success = true;
    }); 
}

exports.edit = (id, param, success) => {
    const {name, email, password, role} = param;
    const query = `UPDATE users SET password = ?, role = ?, updated_at = ? WHERE id = ?`;
    var passwordCrypted = password;
    const editUser = [passwordCrypted, role, new Date(), id];
    db.connect.run(query, editUser, function (err) {   
        if(err) {
            console.error(err.message);
            success = false;
        }
        success = true;
    }); 
}

exports.remove = (id, success) => {
    const query = 'DELETE FROM users WHERE id=?';
    db.connect.run(query, id, (err, row) => {
        if(err) {
            console.error(err.message);
            succes = false;
        }
        success = true;
    });
}
