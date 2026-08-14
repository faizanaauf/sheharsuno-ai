'use client';

import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';

interface AppHeaderProps {
  activePage: 'report' | 'result' | 'dashboard';
}

export default function AppHeader({ activePage }: AppHeaderProps) {
  return (
    <header className="sticky top-0 bg-[#f9faf7]/95 backdrop-blur-md border-b border-[#e2e3e0]/80 z-40 px-4 py-3 md:px-8 transition-all">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#00513a] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Clean Speech bubble with location dot inside */}
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#00513a" />
              <circle cx="12" cy="10" r="2.5" fill="#a1f3cf" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#00513a] tracking-tight">SheharSuno AI</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold bg-[#a1f3cf]/40 text-[#00513a] px-2 py-0.5 rounded-full border border-[#00513a]/15">
                <Sparkles className="w-2.5 h-2.5" />
                Civic AI for every voice
              </span>
            </div>
            <span className="text-[11px] text-[#56615c] font-medium hidden md:block">
              Pakistan Civic Issue Resolver
            </span>
          </div>
        </Link>

        {/* Center/Right Nav Links */}
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="flex items-center gap-1 bg-[#edeeeb] p-1 rounded-full border border-[#bec9c2]/50">
            <Link
              href="/"
              className={`px-3.5 py-1.5 text-xs md:text-sm font-semibold rounded-full transition-all ${
                activePage === 'report'
                  ? 'bg-[#00513a] text-white shadow-sm'
                  : 'text-[#56615c] hover:text-[#00513a] hover:bg-white/60'
              }`}
            >
              Report
            </Link>
            <Link
              href="/dashboard"
              className={`px-3.5 py-1.5 text-xs md:text-sm font-semibold rounded-full transition-all ${
                activePage === 'dashboard'
                  ? 'bg-[#00513a] text-white shadow-sm'
                  : 'text-[#56615c] hover:text-[#00513a] hover:bg-white/60'
              }`}
            >
              Dashboard
            </Link>
          </nav>

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#00513a] hover:bg-[#0d6b4f] text-white rounded-full px-4 py-2 text-xs md:text-sm font-semibold shadow-sm hover:shadow transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Report New Issue</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
