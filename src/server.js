const express = require('express');
const authRoutes = require('./routes/authRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API berjalan.' });
});

app.use('/api', authRoutes);
app.use('/api/experiences', experienceRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
