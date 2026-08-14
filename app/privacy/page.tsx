import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import BottomNavigation from "@/components/BottomNavigation";
import { Lock, AlertCircle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <AppHeader activePage="report" />

      <main className="flex-grow w-full max-w-screen-md mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00513a] uppercase tracking-wider mb-2">
          <Lock className="w-4 h-4" />
          <span>Privacy & Data Practices</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#00513a] tracking-tight mb-4">
          Privacy Policy
        </h1>

        <div className="bg-[#ffdad6]/60 border border-[#ffdad6] p-3.5 rounded-xl text-xs text-[#93000a] font-bold mb-6 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Prototype draft — review with a qualified lawyer before public launch.</span>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2e3e0] shadow-sm flex flex-col gap-6 text-xs md:text-sm text-[#191c1b] leading-relaxed">
          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">1. Information We Process</h2>
            <p className="text-[#56615c]">
              When using SheharSuno AI, the application processes:
            </p>
            <ul className="list-disc list-inside text-[#56615c] space-y-1 pl-2">
              <li>Text descriptions submitted by the user in Urdu, Roman Urdu, or English.</li>
              <li>Selected or entered location data (such as city, town, or neighborhood).</li>
              <li>Optional civic problem photos uploaded directly via the user interface.</li>
              <li>Language and UI preferences during active sessions.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">2. How We Use This Information</h2>
            <p className="text-[#56615c]">
              Submitted information is used exclusively to categorize civic issues, assess relative urgency, recommend safety steps, and generate structured bilingual complaint letters.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">3. Third-Party AI Processing</h2>
            <p className="text-[#56615c]">
              When live AI processing is enabled via the Gemini API, report text and location descriptors are sent to the AI service provider strictly for text classification and complaint synthesis. This processing is subject to the provider&apos;s standard data terms and policies.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">4. Sensitive Personal Data Notice</h2>
            <p className="text-[#56615c]">
              Please do <strong>not</strong> include sensitive personal details—such as Pakistani CNIC numbers, residential telephone numbers, banking credentials, or personal medical information—in your report descriptions or uploaded photos.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-sm md:text-base font-bold text-[#00513a]">5. Data Retention & Privacy Inquiries</h2>
            <p className="text-[#56615c]">
              As a demonstration prototype, SheharSuno does not operate a persistent user tracking database. For questions regarding privacy or data handling, contact us at: <span className="font-mono text-[#00513a]">privacy@sheharsuno.demo</span> (replace this demo contact address before public launch).
            </p>
          </section>
        </div>
      </main>

      <AppFooter />
      <BottomNavigation activePage="report" />
    </>
  );
}
