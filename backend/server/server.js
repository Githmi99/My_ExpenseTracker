require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { readdirSync } = require('fs');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Log environment variables for debugging
console.log('PORT:', PORT);
console.log('MONGO_URL:', MONGO_URL);

// Middleware
app.use(cors());
app.use(express.json());

// Dynamically load routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// MongoDB Connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
