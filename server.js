const express = require('express');
const mongooseConnection = require('./db');
const cors = require('cors'); 
const path = require('path');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes

// Use the routes defined in routes.js
app.use('/api', routes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});