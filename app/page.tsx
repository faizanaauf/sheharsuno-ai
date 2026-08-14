"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReportInput from "@/components/ReportInput";
import AppHeader from "@/components/AppHeader";
import BottomNavigation from "@/components/BottomNavigation";

export default function ReportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    message: string;
    location?: string;
    imageDataUrl?: string;
  }) => {
    setIsSubmitting(true);
    // Encode the data and navigate to the result page
    const params = new URLSearchParams();
    params.set("message", data.message);
    if (data.location) params.set("location", data.location);
    router.push(`/result?${params.toString()}`);
  };

  return (
    <>
      <AppHeader activePage="report" />
      <main className="flex-grow flex flex-col items-center justify-start px-5 py-6 w-full max-w-screen-md mx-auto pb-32 md:pb-8">
        <div className="w-full mb-6">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#00513a] leading-tight tracking-tight mb-2">
            Report a Civic Issue
          </h1>
          <p className="text-base text-[#3f4944]">
            Describe the problem in English, Urdu, or Roman Urdu.
            SheharSuno AI will classify it, suggest next steps, and draft a formal complaint.
          </p>
        </div>
        <ReportInput onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </main>
      <BottomNavigation activePage="report" />
    </>
  );
}
