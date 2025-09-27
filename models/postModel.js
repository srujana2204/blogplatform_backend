const db = require('./db');

exports.getAllPosts = (callback) => {
  db.query('SELECT * FROM posts ORDER BY created_at DESC', callback);
};

exports.createPost = (post, callback) => {
  db.query('INSERT INTO posts SET ?', post, callback);
};
