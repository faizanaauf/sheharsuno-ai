'use client';

import React, { useState } from 'react';
import { AnalyzeResponse } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface IssueResultCardProps {
  result: AnalyzeResponse;
}

export default function IssueResultCard({ result }: IssueResultCardProps) {
  const [activeTab, setActiveTab] = useState<'en' | 'ur'>('en');
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleCopy = () => {
    const textToCopy = activeTab === 'en' ? result.complaintEnglish : result.complaintUrdu;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = async () => {
    const textToShare = result.complaintEnglish;
    if (navigator.share) {
      try {
        await navigator.share({
          title: result.title,
          text: textToShare,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      alert('Report copied to clipboard');
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      {/* Header section */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-[#191c1b]">{result.title}</h1>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
            ${result.priority === 'High' ? 'bg-[#ba1a1a] text-[#ffffff]' : 
              result.priority === 'Medium' ? 'bg-[#e8a000] text-white' : 
              'bg-[#00513a] text-[#ffffff]'}`}>
            <span className="material-symbols-outlined text-[14px]">warning</span>
            {result.priority} PRIORITY
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#3f4944]">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span>{result.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            <span>Reported just now</span>
          </div>
          <div className="font-mono bg-[#edeeeb] px-2 py-0.5 rounded text-xs text-[#191c1b]">
            ID: {result.caseId}
          </div>
        </div>
      </div>

      {/* AI Summary card */}
      <div className="bg-[#dae5df] rounded-xl p-4 border border-[#bec9c2]">
        <div className="flex items-center gap-2 mb-3 text-[#00513a] font-bold">
          <span className="material-symbols-outlined">smart_toy</span>
          <h2>AI Summary</h2>
        </div>
        <p className="text-[#191c1b] text-sm md:text-base leading-relaxed mb-4">
          {result.summaryEnglish}
        </p>

        {result.priorityReason && (
          <div className="bg-[#ffdad6] rounded-lg p-3 mb-4">
            <div className="flex items-center gap-1 text-[#93000a] font-bold text-sm mb-1">
              <span className="material-symbols-outlined text-[18px]">report_problem</span>
              <span>AI DETECTED RISK</span>
            </div>
            <p className="text-[#93000a] text-sm">
              {result.priorityReason}
            </p>
          </div>
        )}

        {result.immediateActions && result.immediateActions.length > 0 && (
          <div>
            <h3 className="font-bold text-[#191c1b] text-sm mb-2">Recommended Next Steps</h3>
            <div className="flex flex-col gap-2">
              {result.immediateActions.map((action, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-[#3f4944]">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#00513a] text-[#ffffff] text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Formal complaint card with tabs */}
      <div className="border border-[#bec9c2] rounded-xl overflow-hidden bg-[#ffffff]">
        <div className="flex border-b border-[#bec9c2]">
          <button 
            onClick={() => setActiveTab('en')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'en' 
                ? 'text-[#00513a] border-[#00513a] bg-[#00513a]/5' 
                : 'text-[#3f4944] border-transparent hover:bg-[#edeeeb]'
            }`}
          >
            English Draft
          </button>
          <button 
            onClick={() => setActiveTab('ur')}
            className={`flex-1 py-3 text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'ur' 
                ? 'text-[#00513a] border-[#00513a] bg-[#00513a]/5' 
                : 'text-[#3f4944] border-transparent hover:bg-[#edeeeb]'
            }`}
          >
            اردو مسودہ
          </button>
        </div>
        
        <div className="p-4 relative">
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 text-[#3f4944] hover:bg-[#edeeeb] rounded-full transition-colors flex items-center gap-1"
            title="Copy to clipboard"
          >
            <span className="material-symbols-outlined text-[20px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied && <span className="text-xs font-bold text-[#00513a]">Copied!</span>}
          </button>
          
          <div className={`text-[#191c1b] text-sm md:text-base leading-relaxed whitespace-pre-line mt-8 md:mt-2 ${activeTab === 'ur' ? 'font-urdu text-right min-h-[150px]' : 'min-h-[150px]'}`} dir={activeTab === 'ur' ? 'rtl' : 'ltr'}>
            {activeTab === 'en' ? result.complaintEnglish : result.complaintUrdu}
          </div>
        </div>
      </div>

      {/* Action buttons row */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button 
          onClick={handleShare}
          className="flex-1 py-3 px-6 bg-[#dae5df] text-[#5c6762] font-bold rounded-[20px] flex items-center justify-center gap-2 hover:bg-[#bec9c2] transition-colors"
        >
          <span className="material-symbols-outlined">share</span>
          Share Report
        </button>
        <button 
          onClick={() => router.push('/dashboard')}
          className="flex-1 py-3 px-6 bg-transparent text-[#00513a] font-bold border border-[#bec9c2] rounded-[20px] flex items-center justify-center gap-2 hover:bg-[#edeeeb] transition-colors"
        >
          <span className="material-symbols-outlined">dashboard</span>
          View Dashboard
        </button>
      </div>

      {/* Disclaimer */}
      <div className="flex items-center justify-center gap-1.5 text-[#3f4944]/70 text-xs mt-4">
        <span className="material-symbols-outlined text-[16px]">info</span>
        <span>SheharSuno provides guidance, not emergency services.</span>
      </div>

      {/* Demo Fallback */}
      {result.isDemoFallback && (
        <div className="flex items-center justify-center gap-1.5 text-[#3f4944] text-xs bg-[#edeeeb] rounded-full py-1 px-3 w-max mx-auto mt-2">
          <span className="material-symbols-outlined text-[14px]">memory</span>
          <span>Demo mode — AI provider not configured</span>
        </div>
      )}
    </div>
  );
}
