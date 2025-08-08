import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthProvider';

export default function Nav() {
  const { user, roles } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/" className="font-bold">Utilitrack</Link>
      {user && <Link to="/">Dashboard</Link>}
      {user && roles.includes('admin') && <Link to="/users">Users</Link>}
      {user && roles.includes('admin') && <Link to="/config">Config</Link>}
      {!user && <Link to="/login">Login</Link>}
    </nav>
  );
}
