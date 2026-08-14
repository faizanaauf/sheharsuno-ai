"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReportInput from "@/components/ReportInput";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";
import { Mic, Sparkles, FileText, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ReportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    message: string;
    location?: string;
    imageDataUrl?: string;
  }) => {
    setIsSubmitting(true);
    const params = new URLSearchParams();
    params.set("message", data.message);
    if (data.location) params.set("location", data.location);
    router.push(`/result?${params.toString()}`);
  };

  return (
    <>
      <AppHeader activePage="report" />

      <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-28 md:pb-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#a1f3cf]/30 border border-[#00513a]/20 text-[#00513a] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00513a] animate-pulse" />
            <span>For Pakistan • English • Urdu • Roman Urdu</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#00513a] tracking-tight leading-tight mb-3">
            Your city deserves to be heard.
          </h1>
          <p className="text-base md:text-lg text-[#56615c] leading-relaxed">
            Report a civic problem in your own words. AI turns it into a clear, action-ready report.
          </p>
        </div>

        {/* Two-Column Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Report Input + Demo Chips + 3-Step Guide (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <ReportInput onSubmit={handleSubmit} isSubmitting={isSubmitting} />

            {/* 3-Step Section */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#e2e3e0] shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#56615c] mb-4">
                How SheharSuno Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Step 1 */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]/60">
                  <div className="w-9 h-9 rounded-lg bg-[#00513a] text-white flex items-center justify-center shrink-0">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-[#191c1b]">1. Speak or upload</h4>
                    <p className="text-[11px] text-[#56615c] mt-0.5">Use voice or photo in any local language</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]/60">
                  <div className="w-9 h-9 rounded-lg bg-[#0060a7] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-[#191c1b]">2. AI understands</h4>
                    <p className="text-[11px] text-[#56615c] mt-0.5">Detects severity & suggested civic body</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]/60">
                  <div className="w-9 h-9 rounded-lg bg-[#0d6b4f] text-white flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-[#191c1b]">3. City-ready report</h4>
                    <p className="text-[11px] text-[#56615c] mt-0.5">Copy bilingual official complaint draft</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Today's Community Pulse (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Pulse Card */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#e2e3e0] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00513a] animate-ping" />
                  <h3 className="font-bold text-base md:text-lg text-[#00513a]">
                    Today’s community pulse
                  </h3>
                </div>
                <span className="text-[10px] font-semibold text-[#56615c] bg-[#edeeeb] px-2 py-0.5 rounded-full">
                  Lahore
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                <div className="bg-[#f3f4f1] p-3 rounded-xl border border-[#e2e3e0] text-center">
                  <p className="text-xl md:text-2xl font-extrabold text-[#00513a]">32</p>
                  <p className="text-[10px] text-[#56615c] font-medium mt-0.5">reports structured</p>
                </div>
                <div className="bg-[#ffdad6]/60 p-3 rounded-xl border border-[#ffdad6] text-center">
                  <p className="text-xl md:text-2xl font-extrabold text-[#ba1a1a]">8</p>
                  <p className="text-[10px] text-[#93000a] font-medium mt-0.5">high-priority issues</p>
                </div>
                <div className="bg-[#e8f5e9] p-3 rounded-xl border border-[#c8e6c9] text-center">
                  <p className="text-xl md:text-2xl font-extrabold text-[#00513a]">71%</p>
                  <p className="text-[10px] text-[#00513a] font-medium mt-0.5">resolved</p>
                </div>
              </div>

              {/* Stylized Lahore Mini-Map */}
              <div className="relative rounded-xl overflow-hidden border border-[#bec9c2]/60 h-44 bg-[#e8ede9] mb-4">
                {/* Road grid simulation */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(190, 201, 194, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(190, 201, 194, 0.4) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                
                {/* 3 Colored Issue Pins */}
                {/* Pin 1: High Priority (Red) */}
                <div className="absolute top-[28%] left-[38%] flex items-center gap-1 group cursor-pointer">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#ba1a1a] border-2 border-white"></span>
                  </span>
                  <span className="text-[9px] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-2xs text-[#ba1a1a] hidden group-hover:block">
                    Model Town
                  </span>
                </div>

                {/* Pin 2: Active (Green) */}
                <div className="absolute top-[52%] left-[62%] flex items-center gap-1 group cursor-pointer">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00513a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00513a] border-2 border-white"></span>
                  </span>
                  <span className="text-[9px] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-2xs text-[#00513a] hidden group-hover:block">
                    Gulberg
                  </span>
                </div>

                {/* Pin 3: Tertiary (Blue) */}
                <div className="absolute top-[75%] left-[30%] flex items-center gap-1 group cursor-pointer">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#0060a7] border-2 border-white"></span>
                  </span>
                  <span className="text-[9px] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-2xs text-[#0060a7] hidden group-hover:block">
                    Johar Town
                  </span>
                </div>

                {/* Mini Legend */}
                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-[#e2e3e0] text-[10px] flex items-center gap-3 text-[#56615c]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00513a]" />
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#0060a7]" />
                    <span>Other</span>
                  </div>
                </div>
              </div>

              {/* Footer label + Link to full dashboard */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] text-[#56615c]/80 italic">
                  Demo data for prototype
                </span>
                <Link
                  href="/dashboard"
                  className="font-bold text-[#00513a] hover:underline flex items-center gap-1"
                >
                  <span>View full dashboard</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Civic Trust Badge */}
            <div className="bg-[#dae5df]/40 rounded-2xl p-4 border border-[#bec9c2]/50 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#00513a] shrink-0" />
              <p className="text-xs text-[#56615c] leading-relaxed">
                <strong className="text-[#00513a]">Civic Clarity:</strong> SheharSuno formats complaints according to Pakistani municipal structures (WASA, LWMC, TEPA, LESCO, Municipal Corp).
              </p>
            </div>

          </div>

        </div>

        {/* Bottom Disclaimer */}
        <footer className="mt-12 text-center border-t border-[#e2e3e0] pt-6">
          <p className="text-xs text-[#56615c]/80">
            SheharSuno provides structured reporting guidance. It does not replace emergency services.
          </p>
        </footer>

      </main>

      <BottomNavigation activePage="report" />
    </>
  );
}
