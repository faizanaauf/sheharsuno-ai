'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { NationalIssueReport } from '@/lib/pakistan-map-data';
import { 
  X, 
  MapPin, 
  Clock, 
  Tag, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  ExternalLink,
  Check
} from 'lucide-react';

interface ReportDetailModalProps {
  report: NationalIssueReport | null;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export default function ReportDetailModal({ report, onClose }: ReportDetailModalProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (report) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [report, onClose]);

  if (!isClient || !report) return null;

  const handleCopy = async () => {
    const textToCopy = `SheharSuno AI Report #${report.id}
Title: ${report.title}
Location: ${report.neighborhood ? `${report.neighborhood}, ` : ''}${report.city} · ${report.provinceOrTerritory}
Priority: ${report.priority}
Category: ${report.category}
Status: ${report.status}
Description: ${report.summary}
Suggested Department: ${report.suggestedDepartment}
Recommended Action: ${report.recommendedAction || `Inspect and resolve the ${report.category.toLowerCase()} hazard in ${report.city}.`}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleViewFullReport = () => {
    const locationParam = `${report.city}, ${report.provinceOrTerritory}`;
    router.push(`/result?message=${encodeURIComponent(report.summary)}&location=${encodeURIComponent(locationParam)}`);
  };

  const defaultAction = report.recommendedAction || 
    (report.category === 'Drainage' 
      ? 'Inspect and clear the blocked drain near the school entrance.'
      : report.category === 'Garbage'
      ? 'Dispatch waste collection team and clear accumulated debris from public roadway.'
      : report.category === 'Road'
      ? 'Fill pothole/asphalt fracture and place temporary safety barriers during repair.'
      : report.category === 'Streetlight'
      ? 'Replace non-functional lighting fixture and inspect power connection box.'
      : report.category === 'Water'
      ? 'Inspect pipeline pressure valve and repair pipeline rupture to restore clean water supply.'
      : 'Deploy district municipal team to assess and mitigate hazard.');

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-dialog-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl border border-[#bec9c2] flex flex-col overflow-hidden transition-all duration-200 w-[calc(100vw-24px)] sm:w-[min(640px,calc(100vw-32px))] max-h-[90vh] md:max-h-[85vh]"
        style={{
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e3e0] bg-[#f9faf7] shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category badge */}
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-white text-[#00513a] px-2.5 py-1 rounded-full border border-[#00513a]/20 shadow-2xs">
              <Tag className="w-3 h-3 text-[#00513a]" />
              <span>{report.category}</span>
            </span>

            {/* Priority badge */}
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                report.priority === 'High'
                  ? 'bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]'
                  : report.priority === 'Medium'
                  ? 'bg-[#fff3e0] text-[#e65100] border border-[#ffe0b2]'
                  : 'bg-[#e8f5e9] text-[#00513a] border border-[#c8e6c9]'
              }`}
            >
              {report.priority === 'High' && <AlertTriangle className="w-3 h-3 text-[#ba1a1a]" />}
              <span>{report.priority} PRIORITY</span>
            </span>

            {/* Status badge */}
            <span className="text-[11px] font-semibold text-[#56615c] bg-[#edeeeb] px-2.5 py-1 rounded-full">
              {report.status}
            </span>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close report details"
            className="p-1.5 rounded-full text-[#56615c] hover:text-[#191c1b] hover:bg-[#e2e3e0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 md:p-6 overflow-y-auto flex flex-col gap-4 text-xs md:text-sm">
          
          {/* Title & Metadata */}
          <div className="flex flex-col gap-1.5 pb-2 border-b border-[#e2e3e0]/60">
            <h2
              id="report-dialog-title"
              className="text-lg md:text-xl font-extrabold text-[#191c1b] tracking-tight leading-snug"
              style={{
                whiteSpace: 'normal',
                overflowWrap: 'break-word',
                wordBreak: 'normal',
              }}
            >
              {report.title}
            </h2>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#56615c]">
              <span className="flex items-center gap-1 font-semibold text-[#00513a]">
                <MapPin className="w-3.5 h-3.5 text-[#00513a] shrink-0" />
                <span>{report.neighborhood ? `${report.neighborhood}, ` : ''}{report.city} · {report.provinceOrTerritory}</span>
              </span>

              <span className="flex items-center gap-1 font-mono font-bold bg-[#f3f4f1] px-2 py-0.5 rounded text-[11px]">
                {report.id}
              </span>

              <span className="flex items-center gap-1 text-[#56615c]">
                <Clock className="w-3 h-3 shrink-0" />
                <span>{report.time}</span>
              </span>
            </div>
          </div>

          {/* Full-width Issue description */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00513a]">
              Issue Description
            </h3>
            <div className="bg-[#f9faf7] p-3.5 md:p-4 rounded-xl border border-[#e2e3e0] text-[#191c1b] leading-relaxed">
              <p
                style={{
                  whiteSpace: 'normal',
                  overflowWrap: 'break-word',
                  wordBreak: 'normal',
                  lineHeight: '1.5',
                }}
              >
                {report.summary}
              </p>
            </div>
          </div>

          {/* Full-width Recommended next steps */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#00513a] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00513a]" />
              <span>Recommended Next Steps</span>
            </h3>
            <div className="bg-[#e8f5e9]/70 p-3.5 rounded-xl border border-[#c8e6c9] text-[#191c1b] leading-relaxed">
              <p
                style={{
                  whiteSpace: 'normal',
                  overflowWrap: 'break-word',
                  wordBreak: 'normal',
                  lineHeight: '1.5',
                }}
              >
                {defaultAction}
              </p>
            </div>
          </div>

          {/* Full-width Suggested Department */}
          <div className="flex items-center gap-2.5 bg-[#f3f4f1] p-3 rounded-xl border border-[#e2e3e0] text-xs">
            <Building2 className="w-4 h-4 text-[#00513a] shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-extrabold text-[#56615c]">Suggested Department</span>
              <span className="font-bold text-[#191c1b]">{report.suggestedDepartment}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-5 py-4 bg-[#f9faf7] border-t border-[#e2e3e0] flex items-center justify-end gap-2.5 flex-wrap shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#f3f4f1] text-[#00513a] border border-[#bec9c2] px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00513a]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Report</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleViewFullReport}
            className="inline-flex items-center justify-center gap-1.5 bg-[#00513a] hover:bg-[#0d6b4f] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <span>View Full Report</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center bg-white hover:bg-[#f3f4f1] text-[#56615c] border border-[#bec9c2] px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
