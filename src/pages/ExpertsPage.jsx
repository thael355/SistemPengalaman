import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { getExperts } from '../services/api';

export default function ExpertsPage() {
  const [experts, setExperts] = useState([]);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function loadExperts() {
      setLoading(true);
      try {
        const response = await getExperts({
          page,
          perPage: 10,
          q: query,
          status: filter !== 'all' ? filter : undefined,
        });
        setExperts(response.items ?? []);
        setMeta({ totalPages: response.totalPages ?? 1 });
      } catch {
        setExperts([]);
        setMeta({ totalPages: 1 });
      } finally {
        setLoading(false);
      }
    }

    loadExperts();
  }, [page, query, filter]);

  return (
    <section>
      <h1>List Tenaga Ahli</h1>

      <div className="toolbar">
        <input
          placeholder="Cari nama / keahlian"
          value={query}
          onChange={(event) => {
            setPage(1);
            setQuery(event.target.value);
          }}
        />
        <select
          value={filter}
          onChange={(event) => {
            setPage(1);
            setFilter(event.target.value);
          }}
        >
          <option value="all">Semua Status</option>
          <option value="verified">Terverifikasi</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {loading ? (
        <p>Memuat tenaga ahli...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Keahlian</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {experts.length === 0 ? (
              <tr>
                <td colSpan={4}>Data tidak ditemukan.</td>
              </tr>
            ) : (
              experts.map((expert) => (
                <tr key={expert.id}>
                  <td>{expert.name}</td>
                  <td>{expert.specialization}</td>
                  <td>{expert.status}</td>
                  <td>
                    <Link to={`/tenaga-ahli/${expert.id}`}>Detail</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <Pagination page={page} totalPages={meta.totalPages} onPageChange={setPage} />
    </section>
  );
}
