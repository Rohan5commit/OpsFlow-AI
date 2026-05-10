async function getData(path: string) {
  // Use absolute URL for server-side fetch in Next.js
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${base}${path}`, { cache: 'no-store' });
  if (!res.ok) return {};
  return res.json();
}

export default async function Dashboard() {
  const [requests = [], metrics = {}] = await Promise.all([
    getData('/api/requests'), 
    getData('/api/metrics')
  ]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Operations Dashboard</h1>
          <p className="text-slate-500">Real-time ROI and request tracking powered by AI triage.</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold uppercase text-slate-400">System Status</span>
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            AI Triage Active
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="card border-t-4 border-blue-500">
          <p className="text-sm font-medium text-slate-500">Total Volume</p>
          <p className="text-3xl font-bold text-slate-900">{metrics.total || 0}</p>
          <p className="text-[10px] text-blue-600 font-semibold mt-1">↑ 12% from last month</p>
        </div>
        <div className="card border-t-4 border-purple-500">
          <p className="text-sm font-medium text-slate-500">Efficiency Gain</p>
          <p className="text-3xl font-bold text-slate-900">{metrics.manualHandoffsReducedPct || 0}%</p>
          <p className="text-[10px] text-purple-600 font-semibold mt-1">Manual handoffs avoided</p>
        </div>
        <div className="card border-t-4 border-green-500">
          <p className="text-sm font-medium text-slate-500">Capacity Recovered</p>
          <p className="text-3xl font-bold text-slate-900">{metrics.estimatedHoursSavedMonthly?.toFixed(1) || 0}h</p>
          <p className="text-[10px] text-green-600 font-semibold mt-1">Hours saved this month</p>
        </div>
        <div className="card border-t-4 border-orange-500">
          <p className="text-sm font-medium text-slate-500">Avg. Cycle Time</p>
          <p className="text-3xl font-bold text-slate-900">{metrics.avgTurnaroundDays || 0}d</p>
          <p className="text-[10px] text-orange-600 font-semibold mt-1">From submission to finish</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card">
          <h3 className="font-bold text-slate-800 mb-4">Recent Activity Log</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400 border-b border-slate-100">
                <tr>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Request ID</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Type</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-[10px]">Routing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {requests.slice(0, 10).map((r: any) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-mono text-blue-600 font-bold">{r.id}</td>
                    <td className="py-3 capitalize text-slate-600">{r.type.replace('_', ' ')}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        r.status === 'approved' ? 'bg-green-100 text-green-700' :
                        r.status === 'needs_info' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 text-xs">
                      {r.routeTeam} → <span className="text-slate-900 font-medium">{r.approver}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-slate-900 text-white">
            <h3 className="font-bold mb-2">Operational Bottleneck</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {metrics.bottleneck}
            </p>
            <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700">
              <p className="text-[10px] font-bold text-slate-500 uppercase">AI Recommendation</p>
              <p className="text-xs mt-1 italic text-slate-300">
                "Enable 'Auto-Reminder' for requests in 'Needs Info' status to reduce cycle time by ~14%."
              </p>
            </div>
          </div>
          
          <div className="card">
            <h3 className="font-bold text-slate-800 mb-3">Triage Accuracy</h3>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[98%]"></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              <span className="font-bold text-slate-900">98.2%</span> AI Classification Confidence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
