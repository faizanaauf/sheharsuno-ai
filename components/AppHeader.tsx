'use client';

import Link from 'next/link';

interface AppHeaderProps {
  activePage: 'report' | 'result' | 'dashboard';
}

export default function AppHeader({ activePage }: AppHeaderProps) {
  if (activePage === 'result') {
    return (
      <header className="sticky top-0 bg-surface-container-low z-40 px-4 py-3 md:px-6">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined filled-icon" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>record_voice_over</span>
            <span className="font-headline-md font-bold text-lg hidden md:block">SheharSuno AI</span>
            <span className="font-headline-md font-bold text-lg md:hidden absolute left-1/2 -translate-x-1/2">SheharSuno</span>
          </div>
          <button className="text-primary font-medium px-3 py-1 bg-primary-container/10 rounded-full text-sm">EN | اردو</button>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 bg-surface-container-low z-40 px-4 py-3 md:px-6">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined filled-icon" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>record_voice_over</span>
          <span className="font-headline-md font-bold text-lg hidden md:block">SheharSuno AI</span>
        </Link>

        {/* Mobile Title Centered */}
        <span className="font-headline-md font-bold text-lg md:hidden absolute left-1/2 -translate-x-1/2 text-primary pointer-events-none">SheharSuno</span>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-2">
            <Link 
              href="/" 
              className={`px-3 py-1 text-sm font-medium transition-colors ${activePage === 'report' ? 'bg-primary-container/10 text-primary rounded-full pointer-events-none' : 'text-on-surface hover:text-primary'}`}
            >
              Report
            </Link>
            <Link 
              href="/dashboard" 
              className={`px-3 py-1 text-sm font-medium transition-colors ${activePage === 'dashboard' ? 'bg-primary-container/10 text-primary rounded-full pointer-events-none' : 'text-on-surface hover:text-primary'}`}
            >
              Dashboard
            </Link>
          </nav>
          <Link 
            href="/" 
            className="bg-primary text-on-primary rounded-full px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Report New Issue
          </Link>
        </div>
      </div>
    </header>
  );
}
