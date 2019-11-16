//server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());
app.use(express.json());
var Users = require('./routes/Users')

app.use('/users', Users)
app.use(bodyParser.json()); // get information from html forms
if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('/app/index.html'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('/app/index.html'));
  });
}

// Listen to whatever port above.
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
  });