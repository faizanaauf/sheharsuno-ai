'use client';

import { communityReports, dashboardMetrics, categoryBreakdown } from '@/lib/demo-data';
import { CommunityReport } from '@/lib/types';

export default function CommunityDashboard() {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Page title section */}
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#00513a]">
          Community Dashboard
        </h1>
        <p className="text-base text-[#3f4944] mt-1">
          Prototype insights for Lahore district.
        </p>
        <p className="text-xs text-[#3f4944]/60 italic mt-1">
          Demo data for prototype
        </p>
      </div>

      {/* 2. Metric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-[#f3f4f1] border border-[#e2e3e0] rounded-xl p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#3f4944]">Reports Today</span>
            <span className="text-3xl font-bold text-[#191c1b]">{dashboardMetrics.reportsToday}</span>
          </div>
          <div className="h-12 w-12 rounded-full bg-[#0d6b4f] flex items-center justify-center text-[#97e8c5]">
            <span 
              className="material-symbols-outlined text-2xl" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              assignment
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f3f4f1] border border-[#e2e3e0] rounded-xl p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#3f4944]">High Priority</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-bold text-[#ba1a1a] leading-none">
                {dashboardMetrics.highPriority}
              </span>
              <div className="flex items-center gap-1 bg-[#ffdad6] text-[#93000a] px-2 py-0.5 rounded-full text-xs font-medium">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+{dashboardMetrics.highPriorityTrend}</span>
              </div>
            </div>
          </div>
          <div className="h-12 w-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
            <span 
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              warning
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#f3f4f1] border border-[#e2e3e0] rounded-xl p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#3f4944]">Resolved</span>
            <span className="text-3xl font-bold text-[#00513a]">{dashboardMetrics.resolvedPercent}%</span>
          </div>
          <div 
            className="h-14 w-14 rounded-full flex items-center justify-center"
            style={{ 
              background: `conic-gradient(#00513a ${dashboardMetrics.resolvedPercent}%, #e2e3e0 0)` 
            }}
          >
            <div className="h-11 w-11 bg-[#f3f4f1] rounded-full flex items-center justify-center text-[#00513a]">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Two-column layout on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Community Issue Map */}
        <div className="lg:col-span-2 flex flex-col bg-[#f3f4f1] border border-[#e2e3e0] rounded-xl overflow-hidden h-[400px]">
          <div className="px-4 py-3 border-b border-[#e2e3e0] flex items-center justify-between bg-white">
            <h2 className="text-lg font-semibold text-[#191c1b]">Community Issue Map</h2>
            <span className="px-2.5 py-1 bg-[#dae5df] text-[#00513a] rounded-md text-xs font-medium">
              Lahore
            </span>
          </div>
          <div className="flex-1 relative bg-[#e8ede9] overflow-hidden">
            {/* Grid lines to suggest roads */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(190, 201, 194, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(190, 201, 194, 0.3) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}
            />
            
            {/* Pins */}
            <div className="absolute top-[30%] left-[40%] w-4 h-4 rounded-full bg-[#ba1a1a] border-2 border-white shadow-sm hover:animate-pulse" title="High priority"></div>
            <div className="absolute top-[50%] left-[60%] w-4 h-4 rounded-full bg-[#00513a] border-2 border-white shadow-sm hover:animate-pulse" title="Medium priority"></div>
            <div className="absolute top-[20%] left-[70%] w-4 h-4 rounded-full bg-[#ba1a1a] border-2 border-white shadow-sm hover:animate-pulse" title="High priority"></div>
            <div className="absolute top-[65%] left-[30%] w-4 h-4 rounded-full bg-[#0060a7] border-2 border-white shadow-sm hover:animate-pulse" title="Tertiary"></div>
            <div className="absolute top-[80%] left-[55%] w-4 h-4 rounded-full bg-[#00513a] border-2 border-white shadow-sm hover:animate-pulse" title="Medium priority"></div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 p-2.5 rounded-lg shadow-sm border border-[#e2e3e0] text-xs font-medium text-[#3f4944] backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ba1a1a]"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-3 h-3 rounded-full bg-[#00513a]"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0060a7]"></div>
                <span>Other</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="flex flex-col gap-6">
          {/* A. Category Breakdown */}
          <div className="bg-[#ffffff] border border-[#e2e3e0] rounded-xl p-4">
            <h2 className="text-lg font-semibold text-[#191c1b] mb-4">Category Breakdown</h2>
            <div className="flex flex-col gap-4">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-[#3f4944]">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span>{item.category}</span>
                    </div>
                    <span className="font-medium text-[#191c1b]">{item.count}</span>
                  </div>
                  <div className="w-full bg-[#e2e3e0] h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${item.percent}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B. Recent Reports */}
          <div className="bg-[#f3f4f1] border border-[#e2e3e0] rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#191c1b]">Recent Reports</h2>
              <button className="text-sm font-medium text-[#00513a] hover:underline">
                View All
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {communityReports.slice(0, 4).map((report: CommunityReport, index: number) => {
                let dotColor = "bg-[#00513a]"; // Low
                if (report.priority === "High") dotColor = "bg-[#ba1a1a]";
                else if (report.priority === "Medium") dotColor = "bg-orange-400";

                let statusBadge = "bg-[#e2e3e0] text-[#3f4944]"; // Logged / Default
                if (report.status === "Needs action") statusBadge = "bg-[#ffdad6] text-[#93000a]";
                else if (report.status === "Reviewing") statusBadge = "bg-[#fff3e0] text-[#e65100]";
                else if (report.status === "Resolved") statusBadge = "bg-[#e8f5e9] text-[#00513a]";

                return (
                  <div key={index} className="flex items-start gap-3 border-b border-[#e2e3e0] last:border-0 pb-3 last:pb-0">
                    <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#191c1b] truncate">{report.title}</p>
                      <p className="text-xs text-[#3f4944] mt-0.5">{report.location} • {report.time}</p>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap mt-0.5 ${statusBadge}`}>
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
