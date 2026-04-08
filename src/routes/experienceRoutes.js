const express = require('express');

const {
  createExperience,
  getAllExperiences,
  getExperienceById,
} = require('../store/db');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title wajib diisi.' });
  }

  const item = createExperience({
    ownerId: req.user.sub,
    title,
    description: description || '',
  });

  return res.status(201).json(item);
});

router.get('/', (req, res) => {
  const all = getAllExperiences();

  if (req.user.role === 'admin') {
    return res.status(200).json(all);
  }

  const mine = all.filter((x) => x.ownerId === Number(req.user.sub));
  return res.status(200).json(mine);
});

router.get('/admin/all', roleMiddleware(['admin']), (req, res) => {
  return res.status(200).json(getAllExperiences());
});

router.get('/:id', (req, res) => {
  const item = getExperienceById(req.params.id);
  if (!item) {
    return res.status(404).json({ message: 'Data tidak ditemukan.' });
  }

  if (req.user.role === 'admin') {
    return res.status(200).json(item);
  }

  if (item.ownerId !== Number(req.user.sub)) {
    return res.status(403).json({ message: 'User hanya boleh mengakses data miliknya.' });
  }

  return res.status(200).json(item);
});

module.exports = router;
