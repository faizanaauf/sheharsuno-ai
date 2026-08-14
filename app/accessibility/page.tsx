import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BottomNavigation from "@/components/BottomNavigation";
import { Eye, Keyboard, Volume2, Globe } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <>
      <AppHeader activePage="report" />

      <main className="flex-grow w-full max-w-screen-md mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00513a] uppercase tracking-wider mb-2">
          <Eye className="w-4 h-4" />
          <span>Inclusion & Design</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#00513a] tracking-tight mb-4">
          Accessibility Statement
        </h1>

        <div className="bg-[#a1f3cf]/25 border border-[#00513a]/20 p-3 rounded-xl text-xs text-[#00513a] font-semibold mb-6">
          Prototype draft — review with a qualified lawyer before public launch.
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-6 text-xs md:text-sm text-[#191c1b] leading-relaxed">
          <p className="text-[#56615c]">
            SheharSuno AI is committed to digital inclusion so that all citizens across Pakistan—regardless of physical ability, literacy level, or technical background—can voice civic concerns easily.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#f9faf7] border border-[#e2e3e0] flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#00513a] font-bold">
                <Volume2 className="w-4 h-4" />
                <span>Voice-First Reporting</span>
              </div>
              <p className="text-xs text-[#56615c]">
                Integrated Web Speech API enables audio reporting in Urdu, Roman Urdu, and English for low-literacy users.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f9faf7] border border-[#e2e3e0] flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#00513a] font-bold">
                <Keyboard className="w-4 h-4" />
                <span>Keyboard Navigation</span>
              </div>
              <p className="text-xs text-[#56615c]">
                All buttons, city pickers, text fields, and tabs include explicit keyboard focus rings and ARIA attributes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f9faf7] border border-[#e2e3e0] flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#00513a] font-bold">
                <Eye className="w-4 h-4" />
                <span>High Contrast & Sizing</span>
              </div>
              <p className="text-xs text-[#56615c]">
                Theme colors adhere to WCAG contrast standards using rich Pakistan greens, off-whites, and clear priority badges.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f9faf7] border border-[#e2e3e0] flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-[#00513a] font-bold">
                <Globe className="w-4 h-4" />
                <span>Bilingual Script Support</span>
              </div>
              <p className="text-xs text-[#56615c]">
                Full RTL (Right-to-Left) rendering for Urdu complaint drafts alongside standard LTR English typography.
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
