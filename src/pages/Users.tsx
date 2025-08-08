import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(firestore, 'orgs/utilitrack/users'));
      setUsers(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Users</h1>
      <button className="bg-blue-500 text-white p-2">Add user</button>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{(u.roles || []).join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
