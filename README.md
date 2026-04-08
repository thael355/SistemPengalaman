# Backend Dasar - Manajemen Informasi Pengalaman Tenaga Ahli

Setup awal backend Node.js (Express) dengan Sequelize + MySQL, tanpa fitur bisnis.

## Struktur Folder (MVC)

```text
.
├── server.js
├── src
│   ├── app.js
│   ├── config
│   │   ├── database.js
│   │   └── testConnection.js
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
├── .env.example
└── package.json
```

## Menjalankan Project

1. Install dependency:
   - `npm install`
2. Buat file environment dari contoh:
   - `cp .env.example .env`
3. Sesuaikan konfigurasi database MySQL di `.env`.
4. Jalankan server:
   - `npm run dev` atau `npm start`

## Test Koneksi Database

Gunakan:

```bash
npm run db:test
```

Contoh jika berhasil:

```text
✅ Koneksi database berhasil.
```
