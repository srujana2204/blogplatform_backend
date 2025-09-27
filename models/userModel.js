
const db = require('./db');

exports.findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

exports.createUser = (user, callback) => {
  db.query('INSERT INTO users SET ?', user, callback);
};



