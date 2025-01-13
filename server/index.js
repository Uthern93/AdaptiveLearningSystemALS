const express = require('express');
const cors = require('cors');  // Import the cors middleware
const userRoutes = require('./routes/api');
const db = require('./models');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only your frontend's origin (React app)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific HTTP methods
  credentials: true,  // If you need to allow cookies/auth tokens
}));

app.use(express.json());  // Middleware to parse JSON bodies
app.use('/api', userRoutes);  // Your API routes

app.listen(port, () => {
  console.log(`🚀 Backend server is running on port ${port}`);
});
