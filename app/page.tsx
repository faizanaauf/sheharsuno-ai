"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReportInput from "@/components/ReportInput";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BottomNavigation from "@/components/BottomNavigation";
import CommunityPulse from "@/components/CommunityPulse";
import { Mic, Sparkles, FileText, ShieldCheck } from "lucide-react";

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

      <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-20 md:pb-12">
        
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

        {/* Two-Column Grid on Desktop / Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Report Input + Demo Chips + 3-Step Guide (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <ReportInput onSubmit={handleSubmit} isSubmitting={isSubmitting} />

            {/* 3-Step Guide */}
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#e2e3e0] shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#56615c] mb-4">
                How SheharSuno Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Step 1 */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3.5 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]/60">
                  <div className="w-9 h-9 rounded-lg bg-[#00513a] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-[#191c1b]">1. Speak or upload</h4>
                    <p className="text-[11px] text-[#56615c] mt-0.5">Use voice or photo in any local language</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3.5 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]/60">
                  <div className="w-9 h-9 rounded-lg bg-[#0060a7] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs md:text-sm text-[#191c1b]">2. AI understands</h4>
                    <p className="text-[11px] text-[#56615c] mt-0.5">Detects severity & suggested civic body</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 p-3.5 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]/60">
                  <div className="w-9 h-9 rounded-lg bg-[#0d6b4f] text-white flex items-center justify-center shrink-0 shadow-2xs">
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

          {/* Right Column on Desktop / Below on Mobile (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Enhanced Community Pulse Component */}
            <CommunityPulse />

            {/* Civic Clarity Badge */}
            <div className="bg-[#dae5df]/40 rounded-2xl p-4 border border-[#bec9c2]/50 flex items-center gap-3 shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-[#00513a] shrink-0" />
              <p className="text-xs text-[#56615c] leading-relaxed">
                <strong className="text-[#00513a]">Civic Clarity:</strong> SheharSuno structures citizen issues into formal terminology recognized across Pakistani municipal agencies (WASA, LWMC, TEPA, LESCO, Municipal Corporations).
              </p>
            </div>

          </div>

        </div>

      </main>

      <AppFooter />
      <BottomNavigation activePage="report" />
    </>
  );
}
