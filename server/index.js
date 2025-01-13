const express = require('express');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/api');
const db = require('./models');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
// app.use('/api', userRoutes);
app.get("/users", (req, res) => {
  Subject.findAll()
    .then((subjects) => {
      res.send(subjects);
    })
    .catch((err) => {
      console.log(err);
    })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
