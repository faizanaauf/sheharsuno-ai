'use client';

import Link from 'next/link';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f3f4f1] border-t border-[#e2e3e0] text-[#56615c] mt-16 pb-24 md:pb-12 pt-10 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-8">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#bec9c2]/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00513a] flex items-center justify-center text-white shadow-2xs">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#00513a" />
                <circle cx="12" cy="10" r="2.5" fill="#a1f3cf" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-base text-[#00513a] tracking-tight">SheharSuno AI</span>
              <p className="text-xs text-[#56615c]">Civic AI for every voice in Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#00513a] bg-[#a1f3cf]/30 border border-[#00513a]/15 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built for Pakistani cities • Urdu, Roman Urdu & English</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-xs font-semibold">
          <Link href="/about" className="hover:text-[#00513a] transition-colors py-1">
            About SheharSuno
          </Link>
          <Link href="/terms" className="hover:text-[#00513a] transition-colors py-1">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-[#00513a] transition-colors py-1">
            Privacy Policy
          </Link>
          <Link href="/data-safety" className="hover:text-[#00513a] transition-colors py-1">
            Data Safety
          </Link>
          <Link href="/accessibility" className="hover:text-[#00513a] transition-colors py-1">
            Accessibility
          </Link>
          <Link href="/contact" className="hover:text-[#00513a] transition-colors py-1">
            Contact / Feedback
          </Link>
        </div>

        {/* Prototype Legal Notice & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#56615c]/80 pt-4">
          <p className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00513a] shrink-0" />
            <span>SheharSuno is an independent civic reporting prototype. Not an emergency service.</span>
          </p>
          <p>
            © {currentYear} SheharSuno AI · All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
