"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import IssueResultCard from "@/components/IssueResultCard";
import { AnalyzeResponse } from "@/lib/types";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const message = searchParams.get("message");
    const location = searchParams.get("location");

    if (!message) {
      router.push("/");
      return;
    }

    const analyze = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            location: location || undefined,
          }),
        });
        const data: AnalyzeResponse = await res.json();
        // Minimum 2.5s loading to show animation
        setTimeout(() => {
          setResult(data);
          setIsLoading(false);
        }, 2500);
      } catch {
        // On any error, try to get demo fallback
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "fallback" }),
        });
        const data: AnalyzeResponse = await res.json();
        setTimeout(() => {
          setResult(data);
          setIsLoading(false);
        }, 2500);
      }
    };

    analyze();
  }, [searchParams, router]);

  return (
    <>
      <AppHeader activePage="result" />
      <main className="flex-grow flex flex-col items-center justify-start px-5 py-6 w-full max-w-screen-md mx-auto pb-12">
        {isLoading ? (
          <LoadingAnalysis />
        ) : result ? (
          <div className="w-full animate-fade-in">
            <IssueResultCard result={result} />
          </div>
        ) : null}
      </main>
      <AppFooter />
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <>
        <AppHeader activePage="result" />
        <main className="flex-grow flex flex-col items-center justify-start px-5 py-6 w-full max-w-screen-md mx-auto pb-12">
          <LoadingAnalysis />
        </main>
      </>
    }>
      <ResultContent />
    </Suspense>
  );
}
