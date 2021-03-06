const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('../database/db');
const express = require('express');
const users = express.Router();
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'secret';
users.get('/', (req, res) => 
User.findAll()
    .then(users => res.render('User', {
        users
      }))
    .catch(err => console.log(err)));

users.post('/users', (req, res) => {
  const today = new Date();
  const userData = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    phone: Number(req.body.phone),
    confirmEmail: req.body.confirmEmail,
    comments: req.body.comments,
    StreetAddress: req.body.StreetAddress,
    unit: req.body.unit,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
    typeOfDegree: req.body.typeOfDegree,
    degreeAttained: req.body.degreeAttained,
    educationalInstitution: req.body.educationalInstitution,
    otherInformation: req.body.otherInformation,
    created: today,
  };

  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' });
            })
            .catch(err => {
              res.send('error: ' + err);
            });
        });
      } else {
        res.json({ error: 'User already exists' });
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

users.post('/users', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        }
      } else {
        res.status(400).json({ error: 'User does not exist' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

users.get('/users', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

  User.findOne({
    where: {
      id: decoded.id,
    },
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

module.exports = users;
