import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Map from '../pages/Map';
import Users from '../pages/Users';
import Config from '../pages/Config';
import RequireAuth from '../features/auth/RequireAuth';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/project/:id" element={<RequireAuth><Map /></RequireAuth>} />
      <Route path="/users" element={<RequireAuth role="admin"><Users /></RequireAuth>} />
      <Route path="/config" element={<RequireAuth role="admin"><Config /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
