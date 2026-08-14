'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LoadingAnalysis() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 text-center">
      <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
        <div className="absolute w-full h-full bg-[#0d6b4f]/40 rounded-full animate-pulse-ring" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-full h-full bg-[#0d6b4f]/40 rounded-full animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
        <div className="relative z-10 w-16 h-16 bg-[#00513a] text-white rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="w-8 h-8 text-[#a1f3cf] animate-spin" style={{ animationDuration: '6s' }} />
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#00513a] mb-2">
        SheharSuno is understanding your report...
      </h2>
      
      <p className="text-sm md:text-base text-[#56615c] max-w-md">
        Extracting context, evaluating priority, and preparing bilingual official drafts.
      </p>

      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      `}</style>
    </div>
  );
}
