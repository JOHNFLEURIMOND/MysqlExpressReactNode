const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    middleName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    StreetAddress: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    confirmEmail: {
      type: Sequelize.STRING,
    },
    unit: {
      type: Sequelize.INTEGER,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    typeOfDegree: {
      type: Sequelize.STRING,
    },
    degreeAttained: {
      type: Sequelize.STRING,
    },
    educationalInstitution: {
      type: Sequelize.STRING,
    },
    otherInformation: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
