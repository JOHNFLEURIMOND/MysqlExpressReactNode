// userModel.js

const Sequelize = require('sequelize');
require('dotenv').config();

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// User model
const User = sequelize.define(
  'user',
  {
    firstName: { type: Sequelize.STRING },
    middleName: Sequelize.STRING,
    lastName: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING }, // Change from Sequelize.INTEGER to Sequelize.STRING
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING }, // Store hashed password
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

const db = {
  sequelize,
  User,
  authenticate: () => sequelize.authenticate(),
  createUser: userData => User.create(userData),
  getAllUsers: () => User.findAll(),
  getUser: criteria => User.findOne({ where: criteria }),
};

module.exports = db;
