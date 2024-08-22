// server.js

const express = require('express');
const serverless = require('serverless-http'); // Required for serverless deployment
const cors = require('cors');
const path = require('path');
const db = require('../../database/database.js'); // Adjust path if necessary
const userRoutes = require('../../routes/users.js'); // Adjust path if necessary
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080; // Used in local development

// Middleware
app.use(cors());
app.use(express.json()); // Only use express.json()

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

// Serve static files from Vite build if necessary
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

// Export the app as a serverless function for Netlify
module.exports.handler = serverless(app);

// Start the server if running locally
if (!process.env.NETLIFY || process.env.NETLIFY_LOCAL === 'true') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
