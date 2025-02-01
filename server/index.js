const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');
const sequelize = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = 5001;

// Enable CORS for all origins (for development)
app.use(cors());
app.use(express.json());

// API documentation (Swagger)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// Test database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync(); // Sync models with database
  })
  .then(() => {
    console.log('Models synchronized with database.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;
