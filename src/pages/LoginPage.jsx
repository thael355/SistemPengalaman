import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const { saveToken } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(form);
      saveToken(response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message ?? 'Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="card" onSubmit={onSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>
    </div>
  );
}
