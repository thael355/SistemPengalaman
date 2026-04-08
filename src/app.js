const express = require('express');
const dashboardRouter = require('./routes/dashboard');

const app = express();

app.use('/api', dashboardRouter);

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const _next = next;
  return res.status(500).json({
    message: 'Terjadi kesalahan pada server',
    error: err.message,
  });
});

module.exports = app;
