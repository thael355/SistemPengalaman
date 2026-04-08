const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const tenagaAhliStore = [
  { id: 1, nama: 'Tenaga Ahli 1' },
  { id: 2, nama: 'Tenaga Ahli 2' }
];

const pengalamanStore = [];
let nextPengalamanId = 1;

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

const allowedExtensions = new Set(['.pdf', '.doc', '.docx']);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedMimeTypes.has(file.mimetype) || !allowedExtensions.has(ext)) {
      return cb(new Error('File harus PDF/DOC/DOCX'));
    }
    cb(null, true);
  }
});

function parseTenagaAhliId(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }
  return parsed;
}

function tenagaAhliExists(id) {
  return tenagaAhliStore.some((item) => item.id === id);
}

function deleteFileIfExists(filename) {
  if (!filename) return;
  const filePath = path.join(uploadsDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function mapPengalaman(item) {
  return {
    id: item.id,
    tenaga_ahli_id: item.tenaga_ahli_id,
    judul: item.judul,
    deskripsi: item.deskripsi,
    referensi_file: item.referensi_file
      ? {
          filename: item.referensi_file,
          url: `/uploads/${item.referensi_file}`
        }
      : null,
    created_at: item.created_at,
    updated_at: item.updated_at
  };
}

app.get('/api/pengalaman', (req, res) => {
  const { tenaga_ahli_id: tenagaAhliIdQuery } = req.query;

  if (tenagaAhliIdQuery === undefined) {
    return res.status(400).json({
      message: 'Query tenaga_ahli_id wajib diisi'
    });
  }

  const tenagaAhliId = parseTenagaAhliId(tenagaAhliIdQuery);
  if (!tenagaAhliId) {
    return res.status(400).json({
      message: 'tenaga_ahli_id harus berupa bilangan bulat positif'
    });
  }

  const result = pengalamanStore
    .filter((item) => item.tenaga_ahli_id === tenagaAhliId)
    .map(mapPengalaman);

  return res.json({ data: result });
});

app.post('/api/pengalaman', upload.single('referensi_file'), (req, res) => {
  const tenagaAhliId = parseTenagaAhliId(req.body.tenaga_ahli_id);
  const { judul, deskripsi } = req.body;

  if (!tenagaAhliId) {
    deleteFileIfExists(req.file?.filename);
    return res.status(400).json({ message: 'tenaga_ahli_id tidak valid' });
  }

  if (!tenagaAhliExists(tenagaAhliId)) {
    deleteFileIfExists(req.file?.filename);
    return res.status(404).json({ message: 'Tenaga ahli tidak ditemukan' });
  }

  if (!judul || typeof judul !== 'string') {
    deleteFileIfExists(req.file?.filename);
    return res.status(400).json({ message: 'judul wajib diisi' });
  }

  const now = new Date().toISOString();
  const record = {
    id: nextPengalamanId++,
    tenaga_ahli_id: tenagaAhliId,
    judul: judul.trim(),
    deskripsi: deskripsi ? String(deskripsi) : null,
    referensi_file: req.file ? req.file.filename : null,
    created_at: now,
    updated_at: now
  };

  pengalamanStore.push(record);

  return res.status(201).json({
    message: 'Pengalaman berhasil dibuat',
    data: mapPengalaman(record)
  });
});

app.put('/api/pengalaman/:id', upload.single('referensi_file'), (req, res) => {
  const id = parseTenagaAhliId(req.params.id);
  if (!id) {
    deleteFileIfExists(req.file?.filename);
    return res.status(400).json({ message: 'ID pengalaman tidak valid' });
  }

  const record = pengalamanStore.find((item) => item.id === id);
  if (!record) {
    deleteFileIfExists(req.file?.filename);
    return res.status(404).json({ message: 'Pengalaman tidak ditemukan' });
  }

  if (req.body.tenaga_ahli_id !== undefined) {
    const tenagaAhliId = parseTenagaAhliId(req.body.tenaga_ahli_id);
    if (!tenagaAhliId) {
      deleteFileIfExists(req.file?.filename);
      return res.status(400).json({ message: 'tenaga_ahli_id tidak valid' });
    }

    if (!tenagaAhliExists(tenagaAhliId)) {
      deleteFileIfExists(req.file?.filename);
      return res.status(404).json({ message: 'Tenaga ahli tidak ditemukan' });
    }

    record.tenaga_ahli_id = tenagaAhliId;
  }

  if (req.body.judul !== undefined) {
    if (!req.body.judul || typeof req.body.judul !== 'string') {
      deleteFileIfExists(req.file?.filename);
      return res.status(400).json({ message: 'judul harus string dan tidak boleh kosong' });
    }
    record.judul = req.body.judul.trim();
  }

  if (req.body.deskripsi !== undefined) {
    record.deskripsi = req.body.deskripsi ? String(req.body.deskripsi) : null;
  }

  if (req.file) {
    deleteFileIfExists(record.referensi_file);
    record.referensi_file = req.file.filename;
  }

  record.updated_at = new Date().toISOString();

  return res.json({
    message: 'Pengalaman berhasil diperbarui',
    data: mapPengalaman(record)
  });
});

app.delete('/api/pengalaman/:id', (req, res) => {
  const id = parseTenagaAhliId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'ID pengalaman tidak valid' });
  }

  const recordIndex = pengalamanStore.findIndex((item) => item.id === id);
  if (recordIndex === -1) {
    return res.status(404).json({ message: 'Pengalaman tidak ditemukan' });
  }

  const [removed] = pengalamanStore.splice(recordIndex, 1);
  deleteFileIfExists(removed.referensi_file);

  return res.json({ message: 'Pengalaman berhasil dihapus' });
});

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Ukuran file maksimal 5MB' });
    }
    return res.status(400).json({ message: err.message });
  }

  if (err) {
    return res.status(400).json({ message: err.message || 'Terjadi kesalahan' });
  }

  return res.status(500).json({ message: 'Terjadi kesalahan internal' });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
