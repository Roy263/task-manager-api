const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Set your desired port

const sequelize = require('./config/database');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

async function start() {
  try {
    await sequelize.sync(); // This will create tables if they don't exist

    // Start your Express app or perform other actions here
  } catch (error) {
    console.error('Database synchronization failed:', error);
  }
}



// Other middleware and configurations can be added here

// Import your route file (index.js)
const taskRoutes = require('./index'); // Adjust the path accordingly

// Use the routes in your Express app
app.use('/tasks', taskRoutes); // Define the base URL for your routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  start();
});
