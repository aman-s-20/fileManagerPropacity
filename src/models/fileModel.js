const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const File = sequelize.define('File', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  s3Key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  s3Location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add an ID field for the file
  fileId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Add a foreign key to associate files with folders
  folderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},
{
  timestamps: false
});

module.exports = { File };
