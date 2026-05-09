async function getData(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}${path}`, { cache: 'no-store' });
  return res.json();
}

export default async function Dashboard() {
  const [requests, metrics] = await Promise.all([getData('/api/requests'), getData('/api/metrics')]);
  return <div className="space-y-4">
    <h1 className="text-2xl font-bold">Operations Dashboard</h1>
    <div className="grid md:grid-cols-4 gap-3">
      <div className="card"><p>Total Requests</p><p className="text-2xl font-bold">{metrics.total}</p></div>
      <div className="card"><p>Avg Turnaround</p><p className="text-2xl font-bold">{metrics.avgTurnaroundDays}d</p></div>
      <div className="card"><p>Monthly Hours Saved</p><p className="text-2xl font-bold">{metrics.estimatedHoursSavedMonthly.toFixed(1)}</p></div>
      <div className="card"><p>Handoffs Reduced</p><p className="text-2xl font-bold">{metrics.manualHandoffsReducedPct}%</p></div>
    </div>
    <div className="card"><p className="font-semibold">Bottleneck</p><p>{metrics.bottleneck}</p></div>
    <div className="card overflow-auto"><table className="w-full text-sm"><thead><tr><th>ID</th><th>Type</th><th>Status</th><th>Approver</th></tr></thead><tbody>{requests.map((r:any)=><tr key={r.id}><td>{r.id}</td><td>{r.type}</td><td>{r.status}</td><td>{r.approver}</td></tr>)}</tbody></table></div>
  </div>;
}
