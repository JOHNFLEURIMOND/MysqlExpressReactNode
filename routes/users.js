const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database/database.js');
const { handleRegistration } = require('./registration'); // Import the registration handler
const router = express.Router();
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

// Route to get all users (for admin use, consider securing this route)
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).send('Error retrieving users');
  }
});

// Route to register a new user
router.post('/register', handleRegistration); // Use the registration handler

// Route to authenticate a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.getUser({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '24h',
      });
      res.json({ token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

// Route to get user profile (requires token)
router.get('/profile', async (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await db.getUser({ id: decoded.id });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send('Error retrieving user');
  }
});

module.exports = router;
