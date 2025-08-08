import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';
import AppRouter from './router';
import { AuthProvider } from '../features/auth/AuthProvider';
import Toaster from './Toaster';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 p-4">
            <AppRouter />
          </main>
          <Toaster />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
