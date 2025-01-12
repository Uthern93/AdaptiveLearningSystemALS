const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Make sure dotenv is required here

const sequelize = new Sequelize(
  process.env.DB_NAME,  // Database name
  process.env.DB_USER,  // Database user
  process.env.DB_PASSWORD,  // Leave blank if no password
  {
    host: process.env.DB_HOST, // Host
    dialect: 'mysql',
    logging: console.log,
  }
);

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
