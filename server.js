const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeOriginalName = file.originalname.replace(/\s+/g, '_');
    const uniqueName = `${Date.now()}-${safeOriginalName}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// expose files supaya bisa diakses langsung lewat URL /uploads/<filename>
app.use('/uploads', express.static(uploadsDir));

// POST /api/upload
// mendukung field:
// - photo: upload foto tenaga ahli
// - reference: upload file referensi pengalaman
app.post(
  '/api/upload',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'reference', maxCount: 1 },
  ]),
  (req, res) => {
    const photoFile = req.files?.photo?.[0] || null;
    const referenceFile = req.files?.reference?.[0] || null;

    if (!photoFile && !referenceFile) {
      return res.status(400).json({
        message: 'Tidak ada file yang diupload. Gunakan field photo dan/atau reference.',
      });
    }

    return res.status(201).json({
      message: 'Upload berhasil',
      data: {
        photo: photoFile
          ? {
              filename: photoFile.filename,
              originalname: photoFile.originalname,
              url: `/uploads/${photoFile.filename}`,
            }
          : null,
        reference: referenceFile
          ? {
              filename: referenceFile.filename,
              originalname: referenceFile.originalname,
              url: `/uploads/${referenceFile.filename}`,
            }
          : null,
      },
    });
  }
);

// GET /api/download/:filename
app.get('/api/download/:filename', (req, res) => {
  const requestedName = path.basename(req.params.filename);
  const filePath = path.join(uploadsDir, requestedName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File tidak ditemukan' });
  }

  return res.download(filePath, requestedName);
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
const dotenv = require('dotenv');
const app = require('./src/app');
const sequelize = require('./src/config/database');

dotenv.config();

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database terhubung.');

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Gagal menghubungkan database:', error.message);
    process.exit(1);
  }
}

startServer();
