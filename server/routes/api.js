const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/users', async (req, res) => {
  // try {
    const users = await User.findAll();
    res.json(users);
    // res.json('woi');
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
});

module.exports = router;
