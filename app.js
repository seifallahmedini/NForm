const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('first response');
});

module.exports = app;
