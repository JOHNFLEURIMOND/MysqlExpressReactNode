const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/database.js');
const userRoutes = require('../routes/users.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
db.authenticate()
  .then(() => console.log('Database connected successfully 💯'))
  .catch(err => console.error('Error connecting to database:', err));

// Sync User model
db.User.sync()
  .then(() => console.log('User Table Created Successfully!'))
  .catch(err => console.error('Error creating User Table:', err));

// Route Handling
app.use('/users', userRoutes);

// Serve static files from Vite build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
} else {
  app.get('*', (req, res) =>
    res.status(200).send({ message: 'Development environment' })
  );
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
