const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database/database'); // Updated path to database
const users = express.Router();
require('dotenv').config();

process.env.SECRET_KEY = 'secret';

users.use(cors());

// Route to get all users
users.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users');
  }
});

// Route to register a new user
users.post('/register', async (req, res) => {
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
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Route to authenticate a user
users.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.getUser({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: 1440 }
      );
      res.json({ token });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

// Route to get a user by ID (requires token)
users.get('/profile', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await db.getUser({ id: decoded.id });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving user');
  }
});

module.exports = users;
