const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// 1. رابط لإضافة سؤال جديد تم حله
router.post('/add', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. رابط لجلب جميع الأسئلة والإحصائيات
router.get('/all', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;