// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const Subject = db.Subject;
const Tutorial = db.Tutorial;

// routes/api.js
  router.get("/subjects", async (req, res) => {
    console.log('GET /api/subjects request received');
    try {
      const subjects = await Subject.findAll();
      console.log('Subjects retrieved:', subjects);
      res.json(subjects);
    } catch (err) {
      console.error('Error in GET /api/subjects:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post("/subjects", async (req, res) => {
    console.log('POST /api/subjects request received');
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Subject name is required' });
    }

    try {
      const newSubject = await Subject.create({
        name,
        description,
      });
  
      console.log('New subject created:', newSubject);
      res.status(201).json(newSubject);
    } catch (err) {
      console.error('Error in POST /api/subjects:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get("/subjects/:subjectId/tutorials", async (req, res) => {
    const { subjectId } = req.params;
    console.log(`GET /api/subjects/${subjectId}/tutorials request received`);
  
    try {
      const subject = await Subject.findOne({
        where: { id: subjectId },
        include: [
          {
            model: db.Tutorial,
            as: 'tutorials',
          }
        ]
      });
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }
      res.json(subject.tutorials);
    } catch (err) {
      console.error('Error in GET /api/subjects/:subjectId/tutorials:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post("/subjects/:subjectId/tutorials", async (req, res) => {
    const { subjectId } = req.params;
    const { title, description, content_type, url } = req.body;
  
    console.log(`POST /api/subjects/${subjectId}/tutorials request received`);
    if (!title || !description || !content_type || !url) {
      return res.status(400).json({ error: 'All fields (title, description, content_type, url) are required' });
    }
    try {
      const subject = await Subject.findByPk(subjectId);
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }
      const newTutorial = await db.Tutorial.create({
        title,
        description,
        content_type,
        url,
        subject_id: subjectId,
      });
  
      console.log('New tutorial created:', newTutorial);
      res.status(201).json(newTutorial);
    } catch (err) {
      console.error('Error in POST /api/subjects/:subjectId/tutorials:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get("/tutorials/:tutorialId/questions", async (req, res) => {
    const { tutorialId } = req.params;
    console.log(`GET /api/subjects/${tutorialId}/question request received`);
  
    try {
      const tutorial = await Tutorial.findOne({
        where: { id: tutorialId },
        include: [
          {
            model: db.Question,
            as: 'questions',
          }
        ]
      });
      if (!tutorial) {
        return res.status(404).json({ error: 'Tutorial not found' });
      }
      res.json(tutorial.questions);
    } catch (err) {
      console.error('Error in GET /api/tutorials/:tutorialId/questions:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.post("/tutorials/:tutorialId/questions", async (req, res) => {
    const { tutorialId } = req.params;
    const { question_text, options, correct_answer, difficulty_level } = req.body;
  
    console.log(`POST /api/tutorials/${tutorialId}/questions request received`);
    if (!question_text || !options || !correct_answer || !difficulty_level) {
      return res.status(400).json({ error: 'All fields (question_text, options, correct_answer, difficulty_level) are required' });
    }
    try {
      const tutorial = await Tutorial.findByPk(tutorialId);
      if (!tutorial) {
        return res.status(404).json({ error: 'Tutorial not found' });
      }
      const newQuestion = await db.Question.create({
        question_text,
        options,
        correct_answer,
        difficulty_level,
        tutorial_id: tutorialId,
      });
  
      console.log('New question created:', newQuestion);
      res.status(201).json(newQuestion);
    } catch (err) {
      console.error('Error in POST /api/tutorials/:tutorialId/questions:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
module.exports = router;