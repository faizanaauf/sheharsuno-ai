'use client';

import Link from 'next/link';
import { PlusCircle, LayoutDashboard, HelpCircle } from 'lucide-react';

interface BottomNavigationProps {
  activePage: 'report' | 'dashboard' | 'result';
}

export default function BottomNavigation({ activePage }: BottomNavigationProps) {
  // Hidden on the result page or if not report/dashboard
  if (activePage !== 'report' && activePage !== 'dashboard') {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-[#dae5df]/90 backdrop-blur-lg px-6 py-2.5 pb-5 flex items-center justify-around shadow-[0_-4px_24px_rgba(0,0,0,0.08)] border-t border-[#bec9c2]/40">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 transition-all py-1 px-4 rounded-xl ${
          activePage === 'report'
            ? 'bg-[#00513a] text-white shadow-sm scale-105'
            : 'text-[#56615c] hover:text-[#00513a]'
        }`}
      >
        <PlusCircle className="w-5 h-5" />
        <span className="text-[11px] font-semibold">Report</span>
      </Link>

      <Link
        href="/dashboard"
        className={`flex flex-col items-center gap-1 transition-all py-1 px-4 rounded-xl ${
          activePage === 'dashboard'
            ? 'bg-[#00513a] text-white shadow-sm scale-105'
            : 'text-[#56615c] hover:text-[#00513a]'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[11px] font-semibold">Dashboard</span>
      </Link>

      <button
        type="button"
        onClick={() => {
          alert("SheharSuno AI turns local citizen complaints into structured, department-ready civic issue briefs in Urdu, English, and Roman Urdu.");
        }}
        className="flex flex-col items-center gap-1 text-[#56615c] hover:text-[#00513a] py-1 px-4 transition-colors cursor-pointer"
      >
        <HelpCircle className="w-5 h-5" />
        <span className="text-[11px] font-semibold">How It Works</span>
      </button>
    </nav>
  );
}
