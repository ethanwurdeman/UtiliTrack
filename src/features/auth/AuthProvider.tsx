import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../../lib/firebase';

export type OrgRole = 'admin' | 'locator' | 'viewer';
interface AuthContextValue {
  user: User | null;
  roles: OrgRole[];
  loading: boolean;
}
const AuthContext = createContext<AuthContextValue>({ user: null, roles: [], loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<OrgRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setRoles([]);
        setLoading(false);
        return;
      }
      const ref = doc(firestore, 'orgs', 'utilitrack', 'users', u.uid);
      return onSnapshot(ref, (snap) => {
        setRoles((snap.data()?.roles as OrgRole[]) || []);
        setLoading(false);
      });
    });
    return () => unsub();
  }, []);

  return <AuthContext.Provider value={{ user, roles, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
