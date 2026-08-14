'use client';

import React, { useState } from 'react';
import { AnalyzeResponse } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Bot, 
  Share2, 
  LayoutDashboard, 
  Copy, 
  Check, 
  Info, 
  Cpu, 
  ShieldAlert 
} from 'lucide-react';

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
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1b] tracking-tight">
          {result.title}
        </h1>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              result.priority === 'High'
                ? 'bg-[#ba1a1a] text-white'
                : result.priority === 'Medium'
                ? 'bg-[#e8a000] text-white'
                : 'bg-[#00513a] text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{result.priority} PRIORITY</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-[#56615c]">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-[#00513a]" />
            <span className="font-semibold text-[#191c1b]">{result.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#56615c]" />
            <span>Reported just now</span>
          </div>
          <div className="font-mono bg-[#edeeeb] px-2.5 py-0.5 rounded text-xs font-semibold text-[#191c1b]">
            ID: {result.caseId}
          </div>
        </div>
      </div>

      {/* AI Summary card */}
      <div className="bg-[#dae5df]/70 rounded-2xl p-5 border border-[#bec9c2] shadow-2xs">
        <div className="flex items-center gap-2 mb-3 text-[#00513a] font-bold">
          <Bot className="w-5 h-5 text-[#00513a]" />
          <h2 className="text-base font-bold">AI Summary</h2>
        </div>
        
        <p className="text-[#191c1b] text-sm md:text-base leading-relaxed mb-4">
          {result.summaryEnglish}
        </p>

        {result.priorityReason && (
          <div className="bg-[#ffdad6] rounded-xl p-3.5 mb-4 border border-[#ffdad6]">
            <div className="flex items-center gap-1.5 text-[#93000a] font-bold text-xs md:text-sm mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>AI DETECTED RISK</span>
            </div>
            <p className="text-[#93000a] text-xs md:text-sm leading-relaxed">
              {result.priorityReason}
            </p>
          </div>
        )}

        {result.immediateActions && result.immediateActions.length > 0 && (
          <div>
            <h3 className="font-bold text-[#00513a] text-xs uppercase tracking-wider mb-2.5">
              Recommended Next Steps
            </h3>
            <div className="flex flex-col gap-2">
              {result.immediateActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 text-xs md:text-sm text-[#191c1b] bg-white/70 p-2 rounded-lg border border-[#bec9c2]/40"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#00513a] text-white text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="leading-snug">{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Formal complaint card with tabs */}
      <div className="border border-[#bec9c2] rounded-2xl overflow-hidden bg-white shadow-sm">
        <div className="flex border-b border-[#bec9c2]">
          <button
            onClick={() => setActiveTab('en')}
            className={`flex-1 py-3 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'en'
                ? 'text-[#00513a] border-[#00513a] bg-[#00513a]/5'
                : 'text-[#56615c] border-transparent hover:bg-[#edeeeb]'
            }`}
          >
            English Draft
          </button>
          <button
            onClick={() => setActiveTab('ur')}
            className={`flex-1 py-3 text-xs md:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'ur'
                ? 'text-[#00513a] border-[#00513a] bg-[#00513a]/5'
                : 'text-[#56615c] border-transparent hover:bg-[#edeeeb]'
            }`}
          >
            اردو مسودہ
          </button>
        </div>

        <div className="p-5 relative">
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 text-[#56615c] hover:text-[#00513a] hover:bg-[#edeeeb] rounded-full transition-colors flex items-center gap-1 cursor-pointer"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#00513a]" />
                <span className="text-xs font-bold text-[#00513a]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-xs font-medium hidden sm:inline">Copy draft</span>
              </>
            )}
          </button>

          <div
            className={`text-[#191c1b] text-sm md:text-base leading-relaxed whitespace-pre-line mt-6 md:mt-2 ${
              activeTab === 'ur'
                ? 'font-urdu text-right min-h-[160px]'
                : 'min-h-[160px]'
            }`}
            dir={activeTab === 'ur' ? 'rtl' : 'ltr'}
          >
            {activeTab === 'en' ? result.complaintEnglish : result.complaintUrdu}
          </div>
        </div>
      </div>

      {/* Action buttons row */}
      <div className="flex flex-col sm:flex-row gap-3 mt-1">
        <button
          onClick={handleShare}
          className="flex-1 py-3.5 px-6 bg-[#dae5df] text-[#00513a] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#bec9c2] transition-all cursor-pointer shadow-2xs"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Report</span>
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="flex-1 py-3.5 px-6 bg-transparent text-[#00513a] font-bold border border-[#00513a] rounded-xl flex items-center justify-center gap-2 hover:bg-[#00513a]/10 transition-all cursor-pointer"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>View Dashboard</span>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="flex items-center justify-center gap-1.5 text-[#56615c] text-xs text-center mt-2">
        <Info className="w-4 h-4 shrink-0 text-[#56615c]" />
        <span>SheharSuno provides guidance, not emergency services.</span>
      </div>

      {/* Demo Fallback */}
      {result.isDemoFallback && (
        <div className="flex items-center justify-center gap-1.5 text-[#56615c] text-xs bg-[#edeeeb] rounded-full py-1 px-3.5 w-max mx-auto border border-[#bec9c2]/50">
          <Cpu className="w-3.5 h-3.5" />
          <span>Demo mode — AI provider not configured</span>
        </div>
      )}
    </div>
  );
}
