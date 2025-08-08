import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { StateProfile, AppConfig } from '../types/models';

export default function Config() {
  const [profile, setProfile] = useState<StateProfile | null>(null);
  const [config, setConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    const load = async () => {
      const prof = await getDoc(doc(firestore, 'orgs/utilitrack/config/state'));
      const cfg = await getDoc(doc(firestore, 'orgs/utilitrack/config/app'));
      setProfile(prof.data() as StateProfile);
      setConfig(cfg.data() as AppConfig);
    };
    load();
  }, []);

  const save = async () => {
    if (profile) await setDoc(doc(firestore, 'orgs/utilitrack/config/state'), profile);
    if (config) await setDoc(doc(firestore, 'orgs/utilitrack/config/app'), config);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Config</h1>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          value={profile?.callAheadDays ?? ''}
          onChange={(e) => setProfile({ ...(profile || {}), callAheadDays: Number(e.target.value) })}
          placeholder="callAheadDays"
          className="border p-2"
        />
        {/* More fields as needed */}
        <button onClick={save} className="bg-blue-500 text-white p-2">Save</button>
      </div>
    </div>
  );
}
