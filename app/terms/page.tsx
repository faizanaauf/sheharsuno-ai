import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BottomNavigation from "@/components/BottomNavigation";
import { Scale, AlertCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <>
      <AppHeader activePage="report" />

      <main className="flex-grow w-full max-w-screen-md mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00513a] uppercase tracking-wider mb-2">
          <Scale className="w-4 h-4" />
          <span>Legal & Compliance</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#00513a] tracking-tight mb-4">
          Terms of Service
        </h1>

        <div className="bg-[#ffdad6]/60 border border-[#ffdad6] p-3.5 rounded-xl text-xs text-[#93000a] font-bold mb-6 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Prototype draft — review with a qualified lawyer before public launch.</span>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-6 text-xs md:text-sm text-[#191c1b] leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">1. Nature of the Prototype</h2>
            <p className="text-[#56615c]">
              SheharSuno AI is an independent research and civic-technology demonstration prototype. It is <strong>not</strong> an official government agency, government portal, or municipal authority service.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">2. Emergency Situations</h2>
            <p className="text-[#56615c]">
              SheharSuno is <strong>not</strong> intended for emergency situations, immediate safety threats, medical emergencies, or active crimes. For immediate assistance in Pakistan, please contact official emergency services directly (Police: 15, Rescue: 1122, Fire Brigade: 16).
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">3. AI-Generated Output & Accuracy</h2>
            <p className="text-[#56615c]">
              Categorizations, priority evaluations, summaries, and drafted complaints are generated using artificial intelligence. AI models may occasionally produce incorrect, incomplete, or inappropriate outputs. Users must review and verify all generated complaint drafts before sharing them with third parties.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">4. User Conduct & Prohibited Content</h2>
            <p className="text-[#56615c]">
              Users agree not to submit fraudulent reports, defamatory or abusive language, harassment, hate speech, or private personal data belonging to others (such as CNIC numbers, residential phone numbers, or private medical details).
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">5. No Guarantee of Government Action</h2>
            <p className="text-[#56615c]">
              SheharSuno provides structured reporting assistance to citizens. Generating a report or complaint does <strong>not</strong> guarantee that any government entity, municipal agency (such as WASA, LWMC, TEPA, or KMC), or municipal official will receive, review, or resolve the issue.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">6. Modifications & Availability</h2>
            <p className="text-[#56615c]">
              The SheharSuno project team reserves the right to modify, suspend, or discontinue any prototype feature or service at any time without prior notice.
            </p>
          </section>
        </div>
      </main>

      <AppFooter />
      <BottomNavigation activePage="report" />
    </>
  );
}
