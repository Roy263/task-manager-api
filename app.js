const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Set your desired port

const sequelize = require('./config/database');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

async function start() {
  try {
    await sequelize.sync(); // This will create tables if they don't exist
  } catch (error) {
    console.error('Database synchronization failed:', error);
  }
}

// Import task routes from index file
const taskRoutes = require('./index');

// Use the routes in your Express app
app.use('/api/tasks', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  start();
});

module.exports = app
