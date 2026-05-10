import RequestForm from '@/components/RequestForm';

export default function Home() {
  return (
    <div className="grid md:grid-cols-5 gap-8 items-start">
      <section className="md:col-span-2 space-y-6 py-4">
        <div className="space-y-2">
          <span className="badge bg-blue-100 text-blue-700">Internal Operations</span>
          <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter">
            Smart Routing for <span className="text-blue-600">Operations</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            AI-assisted internal request routing and approvals for software access, purchasing, and travel.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex-shrink-0 flex items-center justify-center text-green-600 font-bold">✓</div>
            <div>
              <p className="font-bold text-slate-800">Automated Triage</p>
              <p className="text-sm text-slate-500">LLM-powered classification detects request type and urgency instantly.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex-shrink-0 flex items-center justify-center text-purple-600 font-bold">→</div>
            <div>
              <p className="font-bold text-slate-800">Deterministic Routing</p>
              <p className="text-sm text-slate-500">Requests are routed to the correct team with all required data upfront.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold">📊</div>
            <div>
              <p className="font-bold text-slate-800">ROI Tracking</p>
              <p className="text-sm text-slate-500">Measure time saved and operational efficiency in real-time.</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Live Demo Data</p>
          <p className="text-sm font-medium">Try typing: <span className="text-blue-400">"I need to buy a new MacBook Pro for my project"</span> or <span className="text-blue-400">"Booking a flight to NYC for the conference"</span></p>
        </div>
      </section>

      <div className="md:col-span-3">
        <RequestForm />
      </div>
    </div>
  );
}
