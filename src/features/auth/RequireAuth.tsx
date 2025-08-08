import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../app/Loading';
import { useAuth } from './AuthProvider';

export default function RequireAuth({ children, role }: { children: ReactNode; role?: 'admin' }) {
  const { user, roles, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role && !roles.includes(role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}
