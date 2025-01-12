const express = require('express');
const Subject = require('../models/subject');

const router = express.Router();

router.get('/users', async (req, res) => {
  // try {
    const subject = await Subject.findAll();
    res.json(subject);
    // res.json('woi');
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
});

module.exports = router;
