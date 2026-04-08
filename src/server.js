const express = require('express');

const app = express();
app.use(express.json());

const tenagaAhliStore = [];
let nextId = 1;

function authMiddleware(req, res, next) {
  const userId = req.header('x-user-id');

  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return res.status(401).json({
      message: 'Unauthorized. Header x-user-id wajib diisi.'
    });
  }

  req.userId = userId.trim();
  return next();
}

function validatePagination(req, res, next) {
  const { page = '1', limit = '10' } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ message: 'Parameter page harus bilangan bulat >= 1.' });
  }

  if (!Number.isInteger(limitNumber) || limitNumber < 1 || limitNumber > 100) {
    return res.status(400).json({ message: 'Parameter limit harus bilangan bulat 1-100.' });
  }

  req.pagination = { page: pageNumber, limit: limitNumber };
  return next();
}

function validateTenagaAhliInput(req, res, next) {
  const { nama, keahlian } = req.body;

  if (typeof nama !== 'string' || nama.trim().length < 2 || nama.trim().length > 120) {
    return res.status(400).json({ message: 'Field nama wajib string dengan panjang 2-120 karakter.' });
  }

  if (typeof keahlian !== 'string' || keahlian.trim().length < 2 || keahlian.trim().length > 120) {
    return res.status(400).json({ message: 'Field keahlian wajib string dengan panjang 2-120 karakter.' });
  }

  req.validatedBody = {
    nama: nama.trim(),
    keahlian: keahlian.trim()
  };

  return next();
}

function findUserItemById(userId, id) {
  return tenagaAhliStore.find((item) => item.id === id && item.userId === userId);
}

app.use('/api/tenaga-ahli', authMiddleware);

app.get('/api/tenaga-ahli', validatePagination, (req, res) => {
  const { search = '' } = req.query;
  const { page, limit } = req.pagination;
  const normalizedSearch = String(search).trim().toLowerCase();

  const userItems = tenagaAhliStore.filter((item) => item.userId === req.userId);

  const filtered = normalizedSearch
    ? userItems.filter((item) =>
        item.nama.toLowerCase().includes(normalizedSearch) ||
        item.keahlian.toLowerCase().includes(normalizedSearch)
      )
    : userItems;

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const startIndex = (page - 1) * limit;
  const data = filtered.slice(startIndex, startIndex + limit);

  return res.json({
    data,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages
    }
  });
});

app.get('/api/tenaga-ahli/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ message: 'Parameter id harus bilangan bulat positif.' });
  }

  const item = findUserItemById(req.userId, id);
  if (!item) {
    return res.status(404).json({ message: 'Data Tenaga Ahli tidak ditemukan.' });
  }

  return res.json({ data: item });
});

app.post('/api/tenaga-ahli', validateTenagaAhliInput, (req, res) => {
  const now = new Date().toISOString();

  const item = {
    id: nextId++,
    userId: req.userId,
    nama: req.validatedBody.nama,
    keahlian: req.validatedBody.keahlian,
    createdAt: now,
    updatedAt: now
  };

  tenagaAhliStore.push(item);
  return res.status(201).json({ data: item });
});

app.put('/api/tenaga-ahli/:id', validateTenagaAhliInput, (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ message: 'Parameter id harus bilangan bulat positif.' });
  }

  const item = findUserItemById(req.userId, id);
  if (!item) {
    return res.status(404).json({ message: 'Data Tenaga Ahli tidak ditemukan.' });
  }

  item.nama = req.validatedBody.nama;
  item.keahlian = req.validatedBody.keahlian;
  item.updatedAt = new Date().toISOString();

  return res.json({ data: item });
});

app.delete('/api/tenaga-ahli/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ message: 'Parameter id harus bilangan bulat positif.' });
  }

  const index = tenagaAhliStore.findIndex((item) => item.id === id && item.userId === req.userId);

  if (index === -1) {
    return res.status(404).json({ message: 'Data Tenaga Ahli tidak ditemukan.' });
  }

  const [deleted] = tenagaAhliStore.splice(index, 1);
  return res.json({ message: 'Data Tenaga Ahli berhasil dihapus.', data: deleted });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}`);
});
