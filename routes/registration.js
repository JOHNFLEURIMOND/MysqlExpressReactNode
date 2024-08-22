const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../database/database.js');

const handleRegistration = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    confirmEmail,
    password,
    confirmPassword,
  } = req.body;

  if (!email || !confirmEmail || email !== confirmEmail) {
    return res.status(400).json({ error: 'Emails do not match' });
  }

  if (!password || password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const existingUser = await db.getUser({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      firstName,
      middleName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    };

    const user = await db.createUser(userData);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Registration error:', error.message); // Log error details
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = { handleRegistration };
