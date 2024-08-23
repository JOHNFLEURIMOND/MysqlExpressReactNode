const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const path = require('path');
const db = require('../../database/database.js');
const userRoutes = require('../../routes/users.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://bostonmernstackapp.netlify.app/' : 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Database connection
db.authenticate()
  .then(() => console.log('Database connected successfully 💯'))
  .catch(err => console.error('Error connecting to database:', err));

// Sync User model
db.User.sync()
  .then(() => console.log('User Table Created Successfully!'))
  .catch(err => console.error('Error creating User Table:', err));

// API routes
const apiPrefix = process.env.NODE_ENV === 'production' ? '' : '/api';
app.use(`${apiPrefix}/users`, userRoutes);

// Serve static files from Vite build (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
  });
}

// Export the app as a serverless function for Netlify
module.exports.handler = serverless(app);

// Start the server if running locally
if (!process.env.NETLIFY || process.env.NETLIFY_LOCAL === 'true') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
