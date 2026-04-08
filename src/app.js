const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    message: 'Backend Manajemen Informasi Pengalaman Tenaga Ahli aktif.'
  });
});

module.exports = app;
