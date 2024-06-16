require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').map((route) =>
  app.use('/api/v1', require('./routes/' + route))
);

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/v1', authRoutes);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
  });
};

server();
