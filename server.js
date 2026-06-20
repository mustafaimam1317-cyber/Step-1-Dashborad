const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// إعداد الـ DNS لتخطي مشاكل الشبكة
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

// إعدادات الـ Middleware
app.use(cors());
app.use(express.json());

// الاتصال بقاعدة البيانات باستخدام المتغير السري (Environment Variable)
// يفضل دائماً الاعتماد على process.env.MONGO_URI وتجنب كتابة الرابط صراحة في الكود
const mongoURI = process.env.MONGO_URI || "mongodb+srv://mustafa:Mustafa172004@cluster0.mxzojfq.mongodb.net/usmle_tracker?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log('Connected successfully to MongoDB 🎉🩺'))
  .catch(err => console.error('MongoDB connection error ❌:', err));

// --- Mongoose Model ---
const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  category: { type: String, default: 'Step 1' },
  status: { type: String, enum: ['Correct', 'Incorrect', 'Flagged', 'Unattempted'], default: 'Unattempted' },
  createdAt: { type: Date, default: Date.now }
});
const Question = mongoose.model('Question', QuestionSchema);

// --- Routes ---
// المسار الرئيسي للتأكد من عمل السيرفر
app.get('/', (req, res) => {
  res.send('Server is running and alive! API is ready.');
});

app.post('/api/questions/add', async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/questions/all', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const questions = await Question.find(filter);
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// إعداد البورت السحابي والاستماع
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});