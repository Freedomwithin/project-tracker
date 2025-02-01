const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Projects',
  timestamps: true,
  underscored: false, // Use camelCase for column names (optional)
});

// Define the association: A Project belongs to a User
Project.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE' // Optional: Delete projects if a user is deleted
});

module.exports = Project;
