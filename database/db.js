const Sequelize = require('sequelize');

module.exports =  new Sequelize('acme', 'root', 'Hellodear83!', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


