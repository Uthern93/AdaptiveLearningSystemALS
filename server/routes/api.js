// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const Subject = db.Subject;

// routes/api.js
router.get("/users", async (req, res) => {
    console.log('GET /api/users request received');
    try {
      const subjects = await Subject.findAll();
      console.log('Subjects retrieved:', subjects);
      res.json(subjects);
    } catch (err) {
      console.error('Error in GET /api/users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get("/test", (req, res) => {
    res.json({ message: "API is working" });
  });

module.exports = router;