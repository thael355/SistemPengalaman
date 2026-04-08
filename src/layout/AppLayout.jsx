import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const menus = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/tenaga-ahli', label: 'List Tenaga Ahli' },
  { path: '/manajemen-pengalaman', label: 'Manajemen Pengalaman' },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const { clearToken } = useAuth();

  const logout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Sistem Pengalaman</h2>
        <nav>
          {menus.map((menu) => (
            <Link key={menu.path} to={menu.path} className="nav-item">
              {menu.label}
            </Link>
          ))}
        </nav>
        <button type="button" className="danger" onClick={logout}>
          Logout
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
