require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not defined

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').forEach((route) => {
  const routePath = './routes/' + route;
  const routeModule = require(routePath);
  if (typeof routeModule === 'function') {
    app.use('/api/v1', routeModule);
  } else {
    console.error(`Skipping route ${routePath} because it does not export a function`);
  }
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('listening to port:', PORT);
  });
};

server();
