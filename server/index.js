const express = require('express');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use('/api', userRoutes); // Add the API routes

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
