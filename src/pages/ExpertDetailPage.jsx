import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExpertDetail } from '../services/api';

export default function ExpertDetailPage() {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      try {
        const response = await getExpertDetail(id);
        setExpert(response);
      } catch {
        setExpert(null);
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [id]);

  if (loading) {
    return <p>Memuat detail tenaga ahli...</p>;
  }

  if (!expert) {
    return <p>Detail tenaga ahli tidak ditemukan.</p>;
  }

  return (
    <section>
      <h1>Detail Tenaga Ahli</h1>
      <div className="card">
        <p>
          <strong>Nama:</strong> {expert.name}
        </p>
        <p>
          <strong>Email:</strong> {expert.email}
        </p>
        <p>
          <strong>Keahlian:</strong> {expert.specialization}
        </p>
        <p>
          <strong>Status:</strong> {expert.status}
        </p>
        <p>
          <strong>Pengalaman:</strong> {expert.totalExperiences} data
        </p>
      </div>
    </section>
  );
}
