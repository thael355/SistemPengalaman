import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/api';

const fallback = {
  totalExperts: 0,
  totalExperiences: 0,
  verifiedExperts: 0,
};

export default function DashboardPage() {
  const [stats, setStats] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboardStats();
        setStats({ ...fallback, ...data });
      } catch {
        setStats(fallback);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Memuat data dashboard...</p>
      ) : (
        <div className="grid-cards">
          <article className="stat-card">
            <h3>Total Tenaga Ahli</h3>
            <p>{stats.totalExperts}</p>
          </article>
          <article className="stat-card">
            <h3>Total Pengalaman</h3>
            <p>{stats.totalExperiences}</p>
          </article>
          <article className="stat-card">
            <h3>Tenaga Ahli Terverifikasi</h3>
            <p>{stats.verifiedExperts}</p>
          </article>
        </div>
      )}
    </section>
  );
}
