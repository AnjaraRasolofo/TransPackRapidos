const db = require('../database/db');

const queryMails = `CREATE TABLE IF NOT EXISTS mails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    weight INTEGER NOT NULL,
    from VARCHAR(255) NOT NULL,
    to VARCHAT(255) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_address VARCHAR(255) NOT NULL,
    sender_phone VARCHAR(255) NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    receiver_phone VARCHAR(255) NOT NULL,
    sended_at TIMESTAMP,
    received_at TIMESTAMP,
    expected_at TIMESTAMP,
    receipt_at TIMESTAMP,
    shipping INTEGER NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)`;


db.connect.run(queryMails, (err) => {
    if(err) {
        console.error(err.message);
    }
    console.log('Mails Table created Successfuly');
});

exports.getAll = (result) => {
    const query = `SELECT * 
                    FROM mails
                    ORDER BY created_at ASC`;       
    db.connect.all(query, [], (err, rows) => {
        if(err) {
            console.error(err.message);
        }
        result(rows);
    })
}

exports.getLast = (result) => {
    const query = `SELECT * 
                    FROM mails 
                    ORDER BY created_at ASC
                    LIMIT 20`;       
    db.connect.all(query, [], (err, rows) => {
        if(err) {
            console.error(err.message);
        }
        result(rows);
    })
}

exports.getAllByLocation = (to, from, result) => {
    const query = `SELECT *
                    FROM mails
                    WHERE from = ? || to = ?`;
    db.connect.all(query, [to, from], (err, rows) => {
        if(err) {
            console.error(err.message);
        }
        result(rows);
    });
}

exports.getById = (id,result) => {
    const query = `SELECT *
                    FROM mails  
                    WHERE id = ?`;
    db.connect.get(query, [id], (err, rows) => {
        if(err) {
            console.error(err.message);
        }
        result(rows);
    });
}

exports.add = (param, success) => {
    const {
        description,
        content,
        weight,
        from,
        to,
        sender_name,
        sender_address,
        sender_phone,
        receiver_name,
        receiver_address,
        receiver_phone,
        sended_at,
        received_at,
        expected_at,
        receipt_at,
        shipping
    } = param;
    const query = `INSERT INTO mails(
        description,
        content,
        weight,
        from,
        to,
        sender_name,
        sender_address,
        sender_phone,
        receiver_name,
        receiver_address,
        receiver_phone,
        sended_at,
        received_at,
        expected_at,
        receipt_at,
        shipping
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const newMail = [
        description,
        content,
        weight,
        from,
        to,
        sender_name,
        sender_address,
        sender_phone,
        receiver_name,
        receiver_address,
        receiver_phone,
        sended_at,
        received_at,
        expected_at,
        receipt_at,
        shipping, 
        new Date(), 
        new Date(),
    ];
    db.connect.run(query, newMail, function (err) {   
        if(err) {
            console.error(err.message);
            success = false;
        }
        success = true;
    }); 
}

exports.edit = (id, param, success) => {
    const {
        description,
        content,
        weight,
        from,
        to,
        sender_name,
        sender_address,
        sender_phone,
        receiver_name,
        receiver_address,
        receiver_phone,
        sended_at,
        received_at,
        expected_at,
        receipt_at,
        shipping
    } = param;
    console.log(param);
    const query = `UPDATE mails SET 
    description = ?,
    content = ?,
    weight = ?,
    from = ?,
    to = ?,
    sender_name = ?,
    sender_address = ?,
    sender_phone = ?,
    receiver_name = ?,
    receiver_address = ?,
    receiver_phone = ?,
    sended_at = ?,
    received_at = ?,
    expected_at = ?,
    receipt_at = ?,
    shipping = ? 
    WHERE id = ?`;
    const editMail = [
        description,
        content,
        weight,
        from,
        to,
        sender_name,
        sender_address,
        sender_phone,
        receiver_name,
        receiver_address,
        receiver_phone,
        sended_at,
        received_at,
        expected_at,
        receipt_at,
        shipping, 
        new Date(), 
        new Date(), 
        id
    ];
    db.connect.run(query, editMail, function (err) {   
        if(err) {
            console.error(err.message);
            success = false;
        }
        success = true;
    }); 
}

exports.remove = (id, success) => {
    const query = 'DELETE FROM mails WHERE id=?';
    db.connect.run(query, id, (err, row) => {
        if(err) {
            console.error(err.message);
            succes = false;
        }
        success = true;
    });
}

