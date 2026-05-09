'use client';
import { useState } from 'react';

export default function RequestForm() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const res = await fetch('/api/requests', { method: 'POST', body: JSON.stringify(form) });
    const data = await res.json();
    setResult(`Submitted ${data.id} → ${data.routeTeam} (${data.status})`);
    setLoading(false);
  }

  return <div className="card space-y-3">
    <h2 className="text-lg font-semibold">Submit an Operations Request</h2>
    {['employeeName','department','title','description','amount','tool_name','vendor_name','vendor_quote','destination','dates'].map((f)=><input key={f} placeholder={f} className="w-full border rounded p-2" onChange={e=>setForm({...form,[f]:e.target.value})}/>) }
    <button onClick={submit} disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2">{loading ? 'Submitting...' : 'Submit Request'}</button>
    {result && <p className="text-sm text-green-700">{result}</p>}
  </div>;
}
