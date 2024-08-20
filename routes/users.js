// routes/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/database.js'); // Correct path to database
const router = express.Router();
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

// Route to get all users
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
router.post('/register', async (req, res) => {
  try {
    const { email, password, ...userData } = req.body;
    const existingUser = await db.getUser({ email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userData.password = hashedPassword;
      await db.createUser(userData);
      res.status(201).json({ message: `${email} Registered!` });
    } else {
      res.status(400).json({ error: 'User already exists' });
    }
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Error registering user');
  }
});

// Route to authenticate a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.getUser({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '24h',
      });
      res.json({ token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
});

// Route to get a user by ID (requires token)
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await db.getUser({ id: decoded.id });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).send('Error retrieving user');
  }
});

module.exports = router;
