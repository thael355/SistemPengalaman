# SistemPengalaman API

Fitur autentikasi:

- `POST /api/register`
- `POST /api/login`
- JWT Authentication (`Bearer <token>`)
- `authMiddleware` untuk validasi token
- `roleMiddleware` untuk validasi role (`admin` / `user`)
- Hash password dengan `bcrypt`

Hak akses data experiences:

- `admin`: full akses ke semua data
- `user`: hanya bisa melihat data miliknya

## Menjalankan

```bash
npm install
npm start
```

Default port: `3000`.

## Endpoint contoh

### Register

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@mail.com","password":"secret","role":"admin"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mail.com","password":"secret"}'
```

### Create data experience

```bash
curl -X POST http://localhost:3000/api/experiences \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Project A","description":"desc"}'
```
