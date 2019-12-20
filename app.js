const express = require('express');
const connectDB = require('./config/db');

const usersRouter = require('./routes/api/users');
const questionsRouter = require('./routes/api/questions');
const profileRouter = require('./routes/api/profile');
const authRouter = require('./routes/api/auth');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('first response');
});

// Defining Routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/questions', questionsRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
