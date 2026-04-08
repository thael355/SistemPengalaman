import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ExpertDetailPage from './pages/ExpertDetailPage';
import ExpertsPage from './pages/ExpertsPage';
import ExperienceManagementPage from './pages/ExperienceManagementPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tenaga-ahli" element={<ExpertsPage />} />
        <Route path="tenaga-ahli/:id" element={<ExpertDetailPage />} />
        <Route path="manajemen-pengalaman" element={<ExperienceManagementPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
