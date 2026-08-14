import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BottomNavigation from "@/components/BottomNavigation";
import { Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <AppHeader activePage="report" />

      <main className="flex-grow w-full max-w-screen-md mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00513a] uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>About SheharSuno AI</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#00513a] tracking-tight mb-4">
          Empowering Every Citizen to Report Civic Issues
        </h1>

        <div className="bg-[#a1f3cf]/25 border border-[#00513a]/20 p-3 rounded-xl text-xs text-[#00513a] font-semibold mb-6">
          Prototype draft — review with a qualified lawyer before public launch.
        </div>

        <div className="prose prose-stone max-w-none text-[#191c1b] flex flex-col gap-6 text-sm md:text-base leading-relaxed">
          <p>
            <strong>SheharSuno AI</strong> is a voice-first, photo-enabled civic issue reporting assistant designed specifically for Pakistan. It bridges the communication gap between citizens experiencing local problems—such as overflowing drains, uncollected garbage, dangerous potholes, and broken streetlights—and the municipal frameworks responsible for resolving them.
          </p>

          <div className="bg-white p-5 rounded-2xl border border-[#e2e3e0] shadow-2xs flex flex-col gap-3">
            <h2 className="text-base font-bold text-[#00513a]">Why SheharSuno?</h2>
            <ul className="space-y-2.5 text-xs md:text-sm text-[#56615c]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00513a] shrink-0 mt-0.5" />
                <span><strong>Speaks Your Language:</strong> Citizens can speak or type in Urdu, Roman Urdu, or English without complex bureaucratic jargon.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00513a] shrink-0 mt-0.5" />
                <span><strong>Intelligent Structuring:</strong> AI automatically assesses severity, extracts key context, and drafts a formal bilingual complaint brief.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00513a] shrink-0 mt-0.5" />
                <span><strong>Targeted Suggestions:</strong> Suggests the relevant municipal entity (such as WASA, LWMC, TEPA, or local councils) with standardized case references.</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#f3f4f1] p-4 rounded-xl border border-[#e2e3e0] text-xs text-[#56615c]">
            <p>
              <strong>Important Notice:</strong> SheharSuno AI is an independent technological initiative for structuring citizen feedback. It does not replace emergency 15 / 1122 services, nor does it guarantee direct government intervention.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#00513a] text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl hover:bg-[#0d6b4f] transition-all"
            >
              <span>Try Reporting an Issue</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </main>

      <AppFooter />
      <BottomNavigation activePage="report" />
    </>
  );
}
