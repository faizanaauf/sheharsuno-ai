import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BottomNavigation from "@/components/BottomNavigation";
import { ShieldCheck, AlertCircle, KeyRound, Database, Image as ImageIcon, Sparkles } from "lucide-react";

export default function DataSafetyPage() {
  return (
    <>
      <AppHeader activePage="report" />

      <main className="flex-grow w-full max-w-screen-md mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00513a] uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Architecture</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#00513a] tracking-tight mb-4">
          Data Safety Overview
        </h1>

        <div className="bg-[#ffdad6]/60 border border-[#ffdad6] p-3.5 rounded-xl text-xs text-[#93000a] font-bold mb-6 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Prototype draft — review with a qualified lawyer before public launch.</span>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-6 text-xs md:text-sm text-[#191c1b] leading-relaxed">
          
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]">
            <KeyRound className="w-5 h-5 text-[#00513a] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-sm text-[#00513a]">Server-Side API Key Protection</h2>
              <p className="text-[#56615c] text-xs mt-1">
                All AI model credentials (`GEMINI_API_KEY`) remain strictly isolated on server-side runtime environments. Client browsers never receive, inspect, or store private secret keys.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]">
            <ImageIcon className="w-5 h-5 text-[#00513a] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-sm text-[#00513a]">Optional Media Uploads</h2>
              <p className="text-[#56615c] text-xs mt-1">
                Attaching photos of civic damage is completely optional. The platform performs full categorization and complaint generation on pure text or voice transcripts alone.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]">
            <Sparkles className="w-5 h-5 text-[#00513a] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-sm text-[#00513a]">AI Processing Safeguards</h2>
              <p className="text-[#56615c] text-xs mt-1">
                When an AI provider is connected, request payloads are sent via secure HTTPS to Google Gemini endpoints. If network issues occur or no API key is provided, the application falls back safely to deterministic local demo responses without crashing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f9faf7] border border-[#e2e3e0]">
            <Database className="w-5 h-5 text-[#00513a] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-sm text-[#00513a]">Prototype Demonstration Data</h2>
              <p className="text-[#56615c] text-xs mt-1">
                The Community Pulse counts and issue map points represent seeded prototype demonstrations across Pakistani districts. They do not claim active government integration or real-time municipality tracking.
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
