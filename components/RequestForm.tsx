'use client';
import { useState, useEffect } from 'react';

export default function RequestForm() {
  const [form, setForm] = useState<Record<string, string>>({
    employeeName: '',
    department: '',
    title: '',
    description: '',
  });
  const [analysis, setAnalysis] = useState<any>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Debounced AI Analysis
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (form.description.length > 10) {
        setAnalyzing(true);
        try {
          const res = await fetch('/api/analyze', {
            method: 'POST',
            body: JSON.stringify(form)
          });
          const data = await res.json();
          setAnalysis(data);
        } catch (err) {
          console.error("Analysis failed", err);
        } finally {
          setAnalyzing(false);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [form.description, form.title]);

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch('/api/requests', { method: 'POST', body: JSON.stringify(form) });
      const data = await res.json();
      setResult(`Submitted ${data.id} → ${data.routeTeam} (${data.status})`);
      if (data.status === 'submitted') {
        setForm({ employeeName: '', department: '', title: '', description: '' });
        setAnalysis(null);
      }
    } catch (err) {
      setResult('Failed to submit request.');
    } finally {
      setLoading(false);
    }
  }

  const fieldsByType: Record<string, { label: string, key: string }[]> = {
    software_access: [
      { label: 'Tool Name', key: 'tool_name' },
      { label: 'Business Justification', key: 'business_justification' },
      { label: 'Manager Name', key: 'manager_name' }
    ],
    purchase_approval: [
      { label: 'Amount ($)', key: 'amount' },
      { label: 'Vendor Name', key: 'vendor_name' },
      { label: 'Vendor Quote URL', key: 'vendor_quote' },
      { label: 'Business Justification', key: 'business_justification' }
    ],
    travel_request: [
      { label: 'Destination', key: 'destination' },
      { label: 'Dates', key: 'dates' },
      { label: 'Estimated Cost ($)', key: 'estimated_cost' },
      { label: 'Business Purpose', key: 'business_purpose' }
    ]
  };

  return (
    <div className="space-y-4">
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold text-slate-800">Submit an Operations Request</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <input 
            placeholder="Employee Name" 
            className="input" 
            value={form.employeeName}
            onChange={e => setForm({...form, employeeName: e.target.value})}
          />
          <input 
            placeholder="Department" 
            className="input" 
            value={form.department}
            onChange={e => setForm({...form, department: e.target.value})}
          />
        </div>

        <input 
          placeholder="Request Title" 
          className="input" 
          value={form.title}
          onChange={e => setForm({...form, title: e.target.value})}
        />
        
        <textarea 
          placeholder="Describe your request in detail..." 
          className="input min-h-[100px]" 
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
        />

        {analyzing && <p className="text-xs text-blue-500 animate-pulse">AI is analyzing your request...</p>}

        {analysis && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">AI Insights ({analysis.provider})</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                analysis.urgency === 'high' ? 'bg-red-100 text-red-600' : 
                analysis.urgency === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
              }`}>
                {analysis.urgency} Priority
              </span>
            </div>
            <p className="text-sm text-slate-700">{analysis.summary}</p>
            
            {analysis.missingFields?.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-semibold text-slate-600 mb-2">Additional Information Required:</p>
                <div className="space-y-2">
                  {fieldsByType[analysis.type]?.filter(f => analysis.missingFields.includes(f.key)).map(f => (
                    <input 
                      key={f.key}
                      placeholder={f.label}
                      className="input bg-white"
                      onChange={e => setForm({...form, [f.key]: e.target.value})}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <p className="text-[10px] text-slate-400">
              Routed to: <span className="font-semibold">{analysis.routeTeam}</span> (Approver: {analysis.approver})
            </p>
          </div>
        )}

        <button 
          onClick={submit} 
          disabled={loading || !form.description} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-3 transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
        
        {result && (
          <div className={`p-3 text-sm rounded-lg border ${result.includes('Failed') ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
