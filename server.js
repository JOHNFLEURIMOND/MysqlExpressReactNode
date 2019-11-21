//server.js

const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

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

var Users = require('./routes/Users')

app.use('/users', Users)

var mysqlConnection = mysql.createConnection({
    host: 'localhost/8080',
    user: 'root',
    password: 'Hellodear83!',
    database: 'acme',
    multipleStatements: true,
});

mysqlConnection.connect(err => {
    if (!err) {
        console.log('Database is connected ... JF');
    } else {
        console.log('Error connecting database ... JF');
    }
});

app.post('/api/form', function (req, res) {

});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
