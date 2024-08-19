const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/database.js'); // Correct path to database file
const userRoutes = require('../routes/users.js'); // Correct path to routes file
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
  .then(() => console.log('Database is connected 💯 💯 💯 😀👍 📈... JF'))
  .catch(err =>
    console.error('Error connecting database 😒 😒 😒 😒👎 📉 ... JF  ', err)
  );

// Sync User model
db.User.sync()
  .then(() =>
    console.log('User Table Created Successfully! 💯 💯 💯 😀👍 📈... JF')
  )
  .catch(err =>
    console.error('Not Getting User Table 😒 😒 😒 😒👎 📉 ... JF  ', err)
  );

// Route Handling
app.use('/users', userRoutes);

// Production setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../public'))); // Correct path to public directory

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });
} else {
  app.get('*', (req, res) =>
    res
      .status(200)
      .send({ message: 'Welcome to the beginning of nothingness.' })
  );
}

// Start server
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
