import RequestForm from '@/components/RequestForm';

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <section className="card">
        <h1 className="text-3xl font-bold mb-2">OpsFlow AI</h1>
        <p className="text-slate-600">AI-assisted internal request routing and approvals for software access, purchasing, and travel.</p>
        <ul className="mt-4 list-disc ml-5 text-sm text-slate-700">
          <li>Faster request classification and routing</li>
          <li>Transparent status and bottleneck visibility</li>
          <li>Measurable time savings for operations teams</li>
        </ul>
      </section>
      <RequestForm />
    </div>
  );
}
