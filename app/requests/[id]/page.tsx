import { getRequest } from '@/lib/workflow';

export default async function RequestDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const req = getRequest(id);
  if (!req) return <div className="card">Request not found.</div>;
  return <div className="space-y-4">
    <div className="card"><h1 className="text-2xl font-bold">{req.title}</h1><p>{req.summary}</p><p className="text-sm">Status: {req.status} • Approver: {req.approver}</p></div>
    <div className="card"><h2 className="font-semibold">Missing Info</h2><p>{req.missingFields.length ? req.missingFields.join(', ') : 'None'}</p></div>
    <div className="card"><h2 className="font-semibold">History</h2>{req.history.map((h,i)=><p key={i}>{h.at}: {h.status}</p>)}</div>
  </div>;
}
