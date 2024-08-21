// handleRegistration.js

const bcrypt = require('bcrypt');
const saltRounds = 10;

export const handleRegistration = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    confirmEmail,
    streetAddress,
    unit,
    city,
    state,
    zip,
    password, // Add password field
  } = req.body;

  if (!email || !confirmEmail || email !== confirmEmail) {
    return res.status(400).json({ error: 'Emails do not match' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Use ORM methods to interact with the database
    const user = await db.createUser({
      firstName,
      middleName,
      lastName,
      phone,
      email,
      streetAddress,
      unit,
      city,
      state,
      zip,
      password: hashedPassword, // Store the hashed password
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
