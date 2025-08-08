import { useEffect, useState } from 'react';
import maplibregl, { Map } from 'maplibre-gl';
import { useParams } from 'react-router-dom';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { Segment } from '../types/models';
import { useAuth } from '../features/auth/AuthProvider';
import ImportWizard from '../features/import/ImportWizard';

export default function MapPage() {
  const { id } = useParams();
  const { roles } = useAuth();
  const [map, setMap] = useState<Map>();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selected, setSelected] = useState<Segment | null>(null);

  useEffect(() => {
    const m = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [-96, 37.8],
      zoom: 3,
    });
    setMap(m);
    return () => m.remove();
  }, []);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(firestore, `orgs/utilitrack/projects/${id}/segments`));
      setSegments(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    };
    load();
  }, [id]);

  const save = async () => {
    if (!selected) return;
    const ref = doc(firestore, `orgs/utilitrack/projects/${id}/segments`, selected.id);
    await updateDoc(ref, selected as any);
  };

  return (
    <div className="flex h-full">
      <aside className="w-64 p-4 border-r">Sidebar (filters)</aside>
      <div id="map" className="flex-1" />
      {selected && (
        <div className="w-64 p-4 border-l flex flex-col gap-2">
          <input value={selected.ticket?.number || ''} placeholder="Ticket number" className="border p-1" />
          <button onClick={save} className="bg-blue-500 text-white p-2">Save</button>
        </div>
      )}
      {roles.includes('admin') && (
        <div className="absolute top-4 right-4">
          <ImportWizard />
        </div>
      )}
    </div>
  );
}
