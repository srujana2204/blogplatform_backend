const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
//const db = require('../config/db');


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users',  userRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

