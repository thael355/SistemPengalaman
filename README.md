# Sistem Pengalaman API

Endpoint yang tersedia:

- `GET /api/pengalaman?tenaga_ahli_id=`
- `POST /api/pengalaman`
- `PUT /api/pengalaman/:id`
- `DELETE /api/pengalaman/:id`

## Upload file referensi

Gunakan field multipart `referensi_file`.

Ketentuan:
- Format file: PDF/DOC/DOCX
- Ukuran maksimal: 5MB
- File disimpan ke folder `/uploads`

## Menjalankan

```bash
npm install
npm run start
```
