import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">O</div>
                <span className="font-black text-xl tracking-tight text-slate-900">OpsFlow <span className="text-blue-600">AI</span></span>
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
                <Link href="/" className="hover:text-blue-600 transition-colors">Submit Request</Link>
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
                <Link href="/approvals" className="hover:text-blue-600 transition-colors">Approver Queue</Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Status</p>
                <p className="text-xs font-bold text-green-600">System Live</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                RS
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-grow max-w-6xl mx-auto w-full p-6">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400 font-medium">
              &copy; 2026 OpsFlow AI. Built for Internal Tools Hacks.
            </p>
            <div className="flex gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="hover:text-slate-600 cursor-pointer">Security</span>
              <span className="hover:text-slate-600 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-600 cursor-pointer">API Docs</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
