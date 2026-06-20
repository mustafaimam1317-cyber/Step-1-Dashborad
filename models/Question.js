const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: { type: String, required: true }, // مثل: Cardiology, Pathology, Dermatology
  status: { type: String, enum: ['Correct', 'Incorrect', 'Flagged', 'Unattempted'], default: 'Unattempted' },
  notes: { type: String, default: '' }, // ملاحظاتك الطبية على السؤال
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);