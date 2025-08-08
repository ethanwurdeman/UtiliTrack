import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { Project } from '../types/models';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(firestore, 'orgs/utilitrack/projects'));
      setProjects(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Projects</h1>
      <ul className="list-disc ml-6">
        {projects.map((p) => (
          <li key={p.id}>
            <Link to={`/project/${p.id}`} className="text-blue-500 underline">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border">Tickets expiring soon (placeholder)</div>
        <div className="p-4 border">Locate status counts (placeholder)</div>
      </div>
    </div>
  );
}
