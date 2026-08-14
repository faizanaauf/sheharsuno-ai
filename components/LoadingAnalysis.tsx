'use client';

import React from 'react';

export default function LoadingAnalysis() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[530px] p-6 text-center">
      <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
        <div className="absolute w-full h-full bg-[#0d6b4f] rounded-full animate-pulse-ring" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-full h-full bg-[#0d6b4f] rounded-full animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
        <div className="relative z-10 w-16 h-16 bg-[#00513a] text-[#ffffff] rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-[#00513a] mb-4">
        Analyzing Report...
      </h2>
      
      <p className="text-base text-[#3f4944] max-w-md">
        SheharSuno AI is processing location, extracting context, and drafting formal complaints.
      </p>

      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
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
