const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Folder = sequelize.define('Folder', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  folderId: {         // Add an ID field for the folder
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow null for the root folder
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  }
},{
  timestamps: false
});

module.exports = { Folder };
