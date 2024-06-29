const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('study_notion', 'root', 'Anurag@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
