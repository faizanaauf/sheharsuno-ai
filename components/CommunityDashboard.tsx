'use client';

import { useState } from 'react';
import { communityReports, dashboardMetrics, categoryBreakdown } from '@/lib/demo-data';
import { CommunityReport } from '@/lib/types';
import PakistanMap from '@/components/PakistanMap';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Droplets, 
  Trash2, 
  Milestone, 
  Lightbulb, 
  Waves, 
  ShieldAlert, 
  MapPin,
  HelpCircle
} from 'lucide-react';

export default function CommunityDashboard() {
  const [activeCity, setActiveCity] = useState('Lahore');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Drainage':
        return <Droplets className="w-4 h-4 text-[#0060a7]" />;
      case 'Garbage':
        return <Trash2 className="w-4 h-4 text-[#00513a]" />;
      case 'Road':
        return <Milestone className="w-4 h-4 text-[#56615c]" />;
      case 'Streetlight':
        return <Lightbulb className="w-4 h-4 text-[#004880]" />;
      case 'Water':
        return <Waves className="w-4 h-4 text-[#00513a]" />;
      case 'Safety':
        return <ShieldAlert className="w-4 h-4 text-[#ba1a1a]" />;
      default:
        return <HelpCircle className="w-4 h-4 text-[#56615c]" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Page title section */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#00513a] tracking-tight">
            Community Dashboard
          </h1>
          <span className="text-xs bg-[#a1f3cf]/40 text-[#00513a] border border-[#00513a]/20 font-bold px-2.5 py-0.5 rounded-full">
            Lahore District
          </span>
        </div>
        <p className="text-sm md:text-base text-[#56615c] mt-1">
          Prototype insights for Lahore district.
        </p>
        <p className="text-xs text-[#56615c]/80 italic mt-0.5">
          Demo data for prototype
        </p>
      </div>

      {/* 2. Metric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-[#e2e3e0] rounded-2xl p-5 flex items-center justify-between shadow-2xs">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-[#56615c]">Reports Today</span>
            <span className="text-3xl font-extrabold text-[#00513a] mt-1">{dashboardMetrics.reportsToday}</span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#00513a]/10 flex items-center justify-center text-[#00513a]">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#e2e3e0] rounded-2xl p-5 flex items-center justify-between shadow-2xs">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-[#56615c]">High Priority</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#ba1a1a] leading-none">
                {dashboardMetrics.highPriority}
              </span>
              <div className="flex items-center gap-1 bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-full text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{dashboardMetrics.highPriorityTrend}</span>
              </div>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-[#e2e3e0] rounded-2xl p-5 flex items-center justify-between shadow-2xs">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-[#56615c]">Resolved</span>
            <span className="text-3xl font-extrabold text-[#00513a] mt-1">{dashboardMetrics.resolvedPercent}%</span>
          </div>
          <div
            className="h-13 w-13 rounded-full flex items-center justify-center"
            style={{
              background: `conic-gradient(#00513a ${dashboardMetrics.resolvedPercent}%, #e2e3e0 0)`,
            }}
          >
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-[#00513a]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Two-column layout on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Community Issue Map (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white border border-[#e2e3e0] rounded-2xl overflow-hidden shadow-2xs min-h-[540px] h-[540px]">
          <div className="px-5 py-3.5 border-b border-[#e2e3e0] flex items-center justify-between bg-[#f9faf7]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00513a]" />
              <h2 className="text-sm md:text-base font-bold text-[#191c1b]">
                Pakistan Geographic Issue Map · {activeCity}
              </h2>
            </div>
            <span className="px-2.5 py-0.5 bg-[#a1f3cf]/30 border border-[#00513a]/20 text-[#00513a] rounded-full text-xs font-bold">
              Interactive National Grid
            </span>
          </div>
          <div className="flex-1 relative bg-[#e8ede9] overflow-hidden">
            <PakistanMap
              selectedCity={activeCity}
              onSelectCity={(city) => setActiveCity(city)}
            />
          </div>
        </div>

        {/* RIGHT: Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* A. Category Breakdown */}
          <div className="bg-white border border-[#e2e3e0] rounded-2xl p-5 shadow-2xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#00513a] mb-4">
              Category Breakdown
            </h2>
            <div className="flex flex-col gap-3.5">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs md:text-sm">
                    <div className="flex items-center gap-2 text-[#56615c] font-medium">
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </div>
                    <span className="font-bold text-[#191c1b]">{item.count}</span>
                  </div>
                  <div className="w-full bg-[#e2e3e0] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. Recent Reports */}
          <div className="bg-white border border-[#e2e3e0] rounded-2xl p-5 shadow-2xs">
            <div className="flex justify-between items-center mb-3.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#00513a]">
                Recent Reports
              </h2>
              <span className="text-xs font-semibold text-[#00513a]">
                Live Feed
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {communityReports.slice(0, 4).map((report: CommunityReport, index: number) => {
                let dotColor = "bg-[#00513a]"; // Low
                if (report.priority === "High") dotColor = "bg-[#ba1a1a]";
                else if (report.priority === "Medium") dotColor = "bg-orange-400";

                let statusBadge = "bg-[#e2e3e0] text-[#3f4944]"; // Logged / Default
                if (report.status === "Needs action") statusBadge = "bg-[#ffdad6] text-[#93000a]";
                else if (report.status === "Reviewing") statusBadge = "bg-[#fff3e0] text-[#e65100]";
                else if (report.status === "Resolved") statusBadge = "bg-[#e8f5e9] text-[#00513a]";

                return (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 border-b border-[#e2e3e0]/60 last:border-0 pb-2.5 last:pb-0"
                  >
                    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#191c1b] truncate">{report.title}</p>
                      <p className="text-[10px] text-[#56615c] mt-0.5">
                        {report.location} • {report.time}
                      </p>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${statusBadge}`}>
                      {report.status}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
