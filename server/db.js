const { Sequelize } = require('sequelize');

// Replace with your actual database credentials
const sequelize = new Sequelize('projecttracker', 'Freedomwithin', 'your_db_password', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    underscored: false, // Use camelCase for column names (optional)
  },
});

module.exports = sequelize;
