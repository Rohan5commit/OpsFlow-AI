import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex gap-4">
            <Link href="/" className="font-bold">OpsFlow AI</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/approvals">Approver Queue</Link>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
