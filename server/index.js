const express = require('express');
const userRoutes = require('./routes/api');
const db = require('./models');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`🚀 Backend server is running on port ${port}`);
});