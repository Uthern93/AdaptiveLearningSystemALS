const express = require('express');
const Subject = require('../models/subject');


const router = express.Router();

// app.get("/users", (req, res) => {
//   Subject.findAll()
//     .then((subjects) => {
//       res.send(subjects);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })

module.exports = router;
