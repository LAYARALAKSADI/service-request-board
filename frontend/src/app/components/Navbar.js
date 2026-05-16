'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link href="/" className="navbar-brand">
          🛠️ ServiceBoard
        </Link>
        <div className="navbar-links">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            🏠 Home
          </Link>
          <Link href="/jobs/new" className={`nav-link ${pathname === '/jobs/new' ? 'active' : ''}`}>
            ➕ Post Job
          </Link>
        </div>
      </div>
    </nav>
  );
}