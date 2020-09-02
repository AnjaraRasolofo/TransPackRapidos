const db = require('../database/db');

const queryMoneys = `CREATE TABLE IF NOT EXISTS moneys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount INTEGER NOT NULL,
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
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)`;

db.connect.run(queryMoneys, (err) => {
    if(err) {
        console.error(err.message);
    }
    console.log('Moneys Table created Successfuly');
});


exports.getAll = (result) => {
    const query = `SELECT * 
                    FROM moneys
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
                    FROM moneys
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
                    FROM moneys
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
                    FROM moneys 
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
        amount,
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
    } = param;
    const query = `INSERT INTO moneys(
        amount,
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
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const newMoney = [
        amount,
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
        new Date(), 
        new Date(),
    ];
    db.connect.run(query, newMoney, function (err) {   
        if(err) {
            console.error(err.message);
            success = false;
        }
        success = true;
    }); 
}

exports.edit = (id, param, success) => {
    const {
        amount,
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
        receipt_at
    } = param;
    console.log(param);
    const query = `UPDATE moneys SET 
    amount = ?,
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
    updated_at = ? 
    WHERE id = ?`;
    const editMoney = [
        name,
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
        new Date(), 
        id
    ];
    db.connect.run(query, editMoney, function (err) {   
        if(err) {
            console.error(err.message);
            success = false;
        }
        success = true;
    }); 
}

exports.remove = (id, success) => {
    const query = 'DELETE FROM moneys WHERE id=?';
    db.connect.run(query, id, (err, row) => {
        if(err) {
            console.error(err.message);
            succes = false;
        }
        success = true;
    });
}