import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { getExperiences, uploadExperience } from '../services/api';

export default function ExperienceManagementPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });
  const [search, setSearch] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    try {
      const response = await getExperiences({ page, perPage: 10, q: search });
      setItems(response.items ?? []);
      setMeta({ totalPages: response.totalPages ?? 1 });
    } catch {
      setItems([]);
      setMeta({ totalPages: 1 });
    }
  };

  useEffect(() => {
    loadData();
  }, [page, search]);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await uploadExperience(formData);
      setFile(null);
      await loadData();
      event.target.reset();
    } finally {
      setUploading(false);
    }
  };

  return (
    <section>
      <h1>Manajemen Pengalaman</h1>

      <form className="upload-form" onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>

      <div className="toolbar">
        <input
          placeholder="Cari pengalaman"
          value={search}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Judul Pengalaman</th>
            <th>Tenaga Ahli</th>
            <th>Tahun</th>
            <th>Dokumen</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={4}>Belum ada data pengalaman.</td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.expertName}</td>
                <td>{item.year}</td>
                <td>
                  <a href={item.fileUrl} target="_blank" rel="noreferrer">
                    Lihat File
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination page={page} totalPages={meta.totalPages} onPageChange={setPage} />
    </section>
  );
}
