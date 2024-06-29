const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Data = sequelize.define('Data', {
  actionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  editedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  editedWhen: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Data;
