const User = require('../models/userModel');

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  User.findUserByEmail(email, (err, results) => {
    if (results.length > 0) return res.status(409).send('User exists');
    User.createUser({ name: username, email, password }, (err) => {
      if (err) return res.status(500).send('Server error');
      res.send('Registered');
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByEmail(email, (err, results) => {
    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).send('Invalid credentials');
    }
    res.send('Logged in');
  });
};

