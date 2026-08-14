'use client';

import Link from 'next/link';

interface BottomNavigationProps {
  activePage: 'report' | 'dashboard' | 'result';
}

export default function BottomNavigation({ activePage }: BottomNavigationProps) {
  // Hidden on the result page or if not report/dashboard
  if (activePage !== 'report' && activePage !== 'dashboard') {
    return null;
  }

  const iconStyle = { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-xl bg-secondary-container/80 backdrop-blur-md px-4 py-3 pb-6 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-outline-variant/30">
      <Link 
        href="/"
        className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'report' ? 'bg-primary text-on-primary rounded-full px-4 py-1 pointer-events-none' : 'text-on-secondary-container hover:opacity-80'}`}
      >
        <span className={`material-symbols-outlined ${activePage === 'report' ? 'filled-icon' : ''}`} style={activePage === 'report' ? iconStyle : {}}>add_circle</span>
        <span className="text-[10px] font-medium mt-0.5">Report</span>
      </Link>

      <Link 
        href="/dashboard"
        className={`flex flex-col items-center gap-1 transition-colors ${activePage === 'dashboard' ? 'bg-primary text-on-primary rounded-full px-4 py-1 pointer-events-none' : 'text-on-secondary-container hover:opacity-80'}`}
      >
        <span className={`material-symbols-outlined ${activePage === 'dashboard' ? 'filled-icon' : ''}`} style={activePage === 'dashboard' ? iconStyle : {}}>dashboard</span>
        <span className="text-[10px] font-medium mt-0.5">Dashboard</span>
      </Link>

      <button className="flex flex-col items-center gap-1 text-on-secondary-container hover:opacity-80 transition-colors">
        <span className="material-symbols-outlined">info</span>
        <span className="text-[10px] font-medium mt-0.5">How It Works</span>
      </button>
    </nav>
  );
}
