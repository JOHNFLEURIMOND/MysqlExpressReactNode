const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const path = require('path');
const db = require('../../database/database.js');
const userRoutes = require('../../routes/users.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://bostonmernstackapp.netlify.app' 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Database connection
const connectDatabase = async () => {
  try {
    await db.authenticate();
    console.log('Database connected successfully 💯');
    await db.User.sync();
    console.log('User Table Created Successfully!');
  } catch (err) {
    console.error('Database error:', err);
  }
};
connectDatabase();

// API routes
const apiPrefix = process.env.NODE_ENV === 'production' ? '' : '/api';
console.log('API Prefix:', apiPrefix);
app.use(`${apiPrefix}/users`, userRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../../dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).send('Something went wrong!');
});

// Export as serverless function for Netlify
module.exports.handler = serverless(app);

// Start server locally
if (!process.env.NETLIFY || process.env.NETLIFY_LOCAL === 'true') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
