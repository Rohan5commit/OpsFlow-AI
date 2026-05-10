'use client';
import { useState } from 'react';

export default function RequestForm() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [analysis, setAnalysis] = useState<any>(null);
  const [state, setState] = useState<'idle'|'loading'|'error'|'ok'>('idle');
  const [message, setMessage] = useState('');

  async function preview() {
    setState('loading');
    try {
      const res = await fetch('/api/analyze', { method: 'POST', body: JSON.stringify(form) });
      setAnalysis(await res.json());
      setState('ok');
    } catch {
      setState('error');
      setMessage('Could not analyze request.');
    }
  }

  async function submit() {
    setState('loading');
    try {
      const res = await fetch('/api/requests', { method: 'POST', body: JSON.stringify(form) });
      const data = await res.json();
      setMessage(`Submitted ${data.id} → ${data.routeTeam} (${data.status})`);
      setState('ok');
    } catch {
      setState('error');
      setMessage('Submission failed. Please retry.');
    }
  }

  return <div className="card space-y-3">
    <h2 className="text-lg font-semibold">Submit an Operations Request</h2>
    {['employeeName','department','title','description','amount','tool_name','business_justification','manager_name','vendor_name','vendor_quote','destination','dates','estimated_cost','business_purpose'].map((f)=><input key={f} placeholder={f.replaceAll('_',' ')} className="w-full border rounded p-2" onChange={e=>setForm({...form,[f]:e.target.value})}/>) }
    <div className="flex gap-2">
      <button onClick={preview} disabled={state==='loading'} className="bg-slate-200 rounded px-4 py-2">Analyze</button>
      <button onClick={submit} disabled={state==='loading'} className="bg-blue-600 text-white rounded px-4 py-2">{state === 'loading' ? 'Submitting...' : 'Submit Request'}</button>
    </div>
    {analysis && <div className="text-sm bg-slate-100 p-2 rounded">Type: {analysis.type} · Urgency: {analysis.urgency} · Route: {analysis.routeTeam} ({analysis.approver}) · Missing: {analysis.missingFields.join(', ') || 'none'}</div>}
    {message && <p className={`text-sm ${state==='error' ? 'text-red-700' : 'text-green-700'}`}>{message}</p>}
  </div>;
}
