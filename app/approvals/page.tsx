import Link from 'next/link';
import { listRequests } from '@/lib/workflow';

export default function Approvals() {
  const queue = listRequests().filter((r) => ['submitted', 'in_review', 'needs_info'].includes(r.status));
  return <div className="space-y-4">
    <h1 className="text-2xl font-bold">Approver Queue</h1>
    {queue.length === 0 ? <div className="card">No items in queue.</div> : queue.map((r) => <div key={r.id} className="card flex justify-between"><div><p className="font-semibold">{r.title}</p><p className="text-sm">{r.id} • {r.routeTeam} • {r.urgency}</p></div><Link className="text-blue-600" href={`/requests/${r.id}`}>Open</Link></div>)}
  </div>;
}
