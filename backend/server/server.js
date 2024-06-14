require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware and other configurations
app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Log environment variables for debugging
console.log('PORT:', PORT);
console.log('MONGO_URL:', MONGO_URL);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
