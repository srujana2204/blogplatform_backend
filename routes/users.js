const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const db      = require('../config/db');

// POST /api/users/register
router.post('/register', async (req, res) => {
  const {username, email, password } = req.body;     // <-- 'name' here

  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  try {
    // Check duplicate email
    db.query('SELECT id FROM users WHERE email = ?', [email], async (err, rows) => {
      if (err) {
        console.error('❌ DB select error:', err.message);
        return res.status(500).json({ message: 'DB error' });
      }
      if (rows.length) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      // Hash pwd & insert
      const hashed = await bcrypt.hash(password, 10);
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [username, email, hashed],
        (err2) => {
          if (err2) {
            console.error('❌ DB insert error:', err2.message);
            return res.status(500).json({ message: 'DB error' });
          }
          res.status(201).json({ message: 'User registered' });
        }
      );
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

/* --------------------  LOGIN  -------------------- */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, rows) => {
    if (err) {
      console.error('❌ DB select error:', err.message);
      return res.status(500).json({ message: 'DB error' });
    }
    if (rows.length === 0)
      return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const ok   = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ message: 'Invalid credentials' });

    // simple success payload (add JWT later if desired)
    res.json({ message: 'Login ok', user: { id: user.id, name: user.name } });
  });
});
module.exports = router;  // ✅ exports the actual router function
