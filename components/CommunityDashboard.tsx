'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  NATIONAL_DEMO_REPORTS, 
  PAKISTAN_VIEW, 
  PROVINCE_VIEWS, 
  PAKISTAN_CITIES, 
  NationalIssueReport,
  RegionView 
} from '@/lib/pakistan-map-data';
import { 
  MapPin, 
  RotateCcw, 
  Filter, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Droplets, 
  Trash2, 
  Milestone, 
  Lightbulb, 
  Waves, 
  ShieldAlert, 
  HelpCircle,
  X,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// Dynamically import Leaflet map with SSR disabled to prevent 'window is not defined'
const DynamicPakistanMap = dynamic(() => import('@/components/PakistanMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] md:h-[520px] bg-[#e8ede9] rounded-2xl flex flex-col items-center justify-center text-center p-6 border border-[#bec9c2]">
      <div className="w-12 h-12 rounded-full border-4 border-[#00513a]/20 border-t-[#00513a] animate-spin mb-3" />
      <p className="font-bold text-sm text-[#00513a]">Loading Pakistan Community Issue Map...</p>
      <p className="text-xs text-[#56615c] mt-1">Initializing open-source provincial & city map tiles</p>
    </div>
  ),
});

export default function CommunityDashboard() {
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [currentView, setCurrentView] = useState<RegionView>(PAKISTAN_VIEW);
  const [activeReportModal, setActiveReportModal] = useState<NationalIssueReport | null>(null);

  // Available cities filtered by current province
  const availableCities = useMemo(() => {
    if (selectedProvince === 'All') return PAKISTAN_CITIES;
    return PAKISTAN_CITIES.filter((c) => c.province === selectedProvince);
  }, [selectedProvince]);

  // Filtered reports
  const filteredReports = useMemo(() => {
    return NATIONAL_DEMO_REPORTS.filter((report) => {
      const matchProvince = selectedProvince === 'All' || report.provinceOrTerritory === selectedProvince;
      const matchCity = selectedCity === 'All' || report.city === selectedCity;
      const matchCategory = selectedCategory === 'All' || report.category === selectedCategory;
      const matchPriority = selectedPriority === 'All' || report.priority === selectedPriority;
      return matchProvince && matchCity && matchCategory && matchPriority;
    });
  }, [selectedProvince, selectedCity, selectedCategory, selectedPriority]);

  // Computed summary metrics
  const totalReports = filteredReports.length;
  const highPriorityReports = filteredReports.filter((r) => r.priority === 'High').length;
  const uniqueCitiesCount = new Set(filteredReports.map((r) => r.city)).size;
  const resolvedCount = filteredReports.filter((r) => r.status === 'Resolved').length;
  const resolvedPercent = totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 71;

  // Category breakdown calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredReports.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [filteredReports]);

  // Handlers
  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity('All');

    if (province === 'All') {
      setCurrentView(PAKISTAN_VIEW);
    } else if (PROVINCE_VIEWS[province]) {
      setCurrentView(PROVINCE_VIEWS[province]);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city === 'All') {
      if (selectedProvince !== 'All' && PROVINCE_VIEWS[selectedProvince]) {
        setCurrentView(PROVINCE_VIEWS[selectedProvince]);
      } else {
        setCurrentView(PAKISTAN_VIEW);
      }
    } else {
      const foundCity = PAKISTAN_CITIES.find((c) => c.name === city);
      if (foundCity) {
        setCurrentView({
          name: foundCity.name,
          center: foundCity.center,
          zoom: foundCity.zoom,
        });
      }
    }
  };

  const handleResetToPakistan = () => {
    setSelectedProvince('All');
    setSelectedCity('All');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setCurrentView(PAKISTAN_VIEW);
  };

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
    <div className="flex flex-col gap-6 w-full max-w-screen-xl mx-auto">
      
      {/* 1. National Page Title & Scope Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#e2e3e0]">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#a1f3cf]/30 border border-[#00513a]/20 text-[#00513a] text-xs font-bold px-3 py-1 rounded-full mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00513a] animate-pulse" />
            <span>National Civic Intelligence • All Provinces & Territories</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#00513a] tracking-tight">
            Pakistan Community Issue Map
          </h1>
          <p className="text-sm md:text-base text-[#56615c] mt-1">
            See civic concerns structured across cities, provinces, and territories.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleResetToPakistan}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-[#f3f4f1] text-[#00513a] border border-[#bec9c2] px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
            title="Reset map view to whole of Pakistan"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Pakistan</span>
          </button>
        </div>
      </div>

      {/* 2. National Metric Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-[#e2e3e0] rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-2xs">
          <div className="flex flex-col">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#56615c]">Reports Structured</span>
            <span className="text-2xl md:text-3xl font-extrabold text-[#00513a] mt-0.5">{totalReports}</span>
            <span className="text-[10px] text-[#56615c]/80 mt-0.5">{selectedProvince === 'All' ? 'across Pakistan' : `in ${selectedProvince}`}</span>
          </div>
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[#00513a]/10 flex items-center justify-center text-[#00513a] shrink-0">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-[#e2e3e0] rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-2xs">
          <div className="flex flex-col">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#56615c]">High-Priority Issues</span>
            <span className="text-2xl md:text-3xl font-extrabold text-[#ba1a1a] mt-0.5">{highPriorityReports}</span>
            <span className="text-[10px] text-[#93000a] font-semibold mt-0.5">urgent hazards</span>
          </div>
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#93000a] shrink-0">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-[#e2e3e0] rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-2xs">
          <div className="flex flex-col">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#56615c]">Cities Represented</span>
            <span className="text-2xl md:text-3xl font-extrabold text-[#0060a7] mt-0.5">{uniqueCitiesCount}</span>
            <span className="text-[10px] text-[#56615c]/80 mt-0.5">municipal hubs</span>
          </div>
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[#0060a7]/10 flex items-center justify-center text-[#0060a7] shrink-0">
            <Building2 className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-[#e2e3e0] rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-2xs">
          <div className="flex flex-col">
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#56615c]">Resolved</span>
            <span className="text-2xl md:text-3xl font-extrabold text-[#00513a] mt-0.5">{resolvedPercent}%</span>
            <span className="text-[10px] text-[#00513a] font-semibold mt-0.5">mock resolution rate</span>
          </div>
          <div
            className="h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: `conic-gradient(#00513a ${resolvedPercent}%, #e2e3e0 0)`,
            }}
          >
            <div className="h-8 w-8 md:h-9 md:w-9 bg-white rounded-full flex items-center justify-center text-[#00513a]">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="bg-[#dae5df]/40 p-3 rounded-xl border border-[#bec9c2]/50 text-xs text-[#56615c] flex items-center justify-between flex-wrap gap-2">
        <p>
          <strong className="text-[#00513a]">Prototype data for demonstration.</strong> Reports are not automatically sent to government authorities.
        </p>
        <span className="text-[11px] font-semibold text-[#00513a] bg-white px-2.5 py-0.5 rounded-full border border-[#bec9c2]/60">
          Showing {totalReports} reports across {uniqueCitiesCount} cities
        </span>
      </div>

      {/* 3. National Interactive Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e2e3e0] shadow-2xs flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00513a] uppercase tracking-wider">
          <Filter className="w-4 h-4" />
          <span>Interactive National Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Province Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#56615c]">Province / Territory</label>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="bg-[#f9faf7] border border-[#bec9c2] rounded-xl px-3 py-2 text-xs md:text-sm font-semibold text-[#191c1b] outline-none focus:ring-2 focus:ring-[#00513a] cursor-pointer"
            >
              <option value="All">All Pakistan (National View)</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
              <option value="Balochistan">Balochistan</option>
              <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
              <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              <option value="Azad Jammu and Kashmir">Azad Jammu and Kashmir</option>
            </select>
          </div>

          {/* City Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#56615c]">City</label>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-[#f9faf7] border border-[#bec9c2] rounded-xl px-3 py-2 text-xs md:text-sm font-semibold text-[#191c1b] outline-none focus:ring-2 focus:ring-[#00513a] cursor-pointer"
            >
              <option value="All">All Cities in Selection ({availableCities.length})</option>
              {availableCities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name} ({city.province})
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#56615c]">Issue Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#f9faf7] border border-[#bec9c2] rounded-xl px-3 py-2 text-xs md:text-sm font-semibold text-[#191c1b] outline-none focus:ring-2 focus:ring-[#00513a] cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Drainage">Drainage</option>
              <option value="Garbage">Garbage</option>
              <option value="Road">Road Damage</option>
              <option value="Streetlight">Streetlight</option>
              <option value="Water">Water Supply</option>
              <option value="Safety">Public Safety</option>
            </select>
          </div>

          {/* Priority Selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#56615c]">Priority Level</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-[#f9faf7] border border-[#bec9c2] rounded-xl px-3 py-2 text-xs md:text-sm font-semibold text-[#191c1b] outline-none focus:ring-2 focus:ring-[#00513a] cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority (Urgent)</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low / General</option>
            </select>
          </div>

        </div>
      </div>

      {/* 4. Main Two-Column Layout: Pakistan Map & Sidebar Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: Full Interactive Leaflet Pakistan Map (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white border border-[#e2e3e0] rounded-2xl overflow-hidden shadow-2xs">
          
          {/* Map Header & Legend */}
          <div className="px-5 py-3.5 border-b border-[#e2e3e0] flex items-center justify-between flex-wrap gap-2 bg-[#f9faf7]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00513a]" />
              <h2 className="text-sm md:text-base font-bold text-[#191c1b]">
                {currentView.name === 'All Pakistan' ? 'National Map of Pakistan' : `${currentView.name} Regional View`}
              </h2>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs font-semibold text-[#56615c]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ba1a1a] border border-white shadow-2xs" />
                <span>High Priority</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#e8a000] border border-white shadow-2xs" />
                <span>Needs Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#00513a] border border-white shadow-2xs" />
                <span>Logged/Resolved</span>
              </div>
            </div>
          </div>

          {/* Real Leaflet Map */}
          <div className="h-[440px] md:h-[530px] w-full relative">
            <DynamicPakistanMap
              reports={filteredReports}
              currentView={currentView}
              onSelectReport={(report) => setActiveReportModal(report)}
            />
          </div>

          {/* Footer attribution */}
          <div className="px-4 py-2 bg-[#f9faf7] border-t border-[#e2e3e0] flex items-center justify-between text-[11px] text-[#56615c]">
            <span>Click any marker to inspect community report details</span>
            <span>&copy; OpenStreetMap contributors</span>
          </div>
        </div>

        {/* RIGHT: Category Breakdown & Filtered Reports Feed (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* A. Category Breakdown Card */}
          <div className="bg-white border border-[#e2e3e0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#00513a]">
                National Category Breakdown
              </h3>
              <span className="text-[11px] font-bold text-[#56615c] bg-[#f3f4f1] px-2 py-0.5 rounded-full">
                {totalReports} total
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { category: 'Drainage', color: '#0060a7' },
                { category: 'Garbage', color: '#00513a' },
                { category: 'Road', color: '#56615c' },
                { category: 'Streetlight', color: '#004880' },
                { category: 'Water', color: '#85d7b4' },
                { category: 'Safety', color: '#ba1a1a' },
              ].map((item) => {
                const count = categoryCounts[item.category] || 0;
                const percent = totalReports > 0 ? Math.round((count / totalReports) * 100) : 0;

                return (
                  <div key={item.category} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 text-[#56615c] font-semibold">
                        {getCategoryIcon(item.category)}
                        <span>{item.category}</span>
                      </div>
                      <span className="font-bold text-[#191c1b]">{count} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-[#e2e3e0] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B. Filtered Reports Feed Card */}
          <div className="bg-white border border-[#e2e3e0] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#00513a]">
                Structured Reports Feed
              </h3>
              <span className="text-[11px] font-semibold text-[#00513a]">
                {filteredReports.length} results
              </span>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
              {filteredReports.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#56615c]">
                  No reports match current filters. Click &quot;Reset to Pakistan&quot; above.
                </div>
              ) : (
                filteredReports.map((report) => {
                  let dotColor = 'bg-[#00513a]';
                  if (report.priority === 'High') dotColor = 'bg-[#ba1a1a]';
                  else if (report.priority === 'Medium') dotColor = 'bg-[#e8a000]';

                  return (
                    <button
                      key={report.id}
                      type="button"
                      onClick={() => setActiveReportModal(report)}
                      className="text-left p-2.5 rounded-xl border border-[#e2e3e0]/70 hover:border-[#00513a] hover:bg-[#f9faf7] transition-all flex flex-col gap-1 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`} />
                          <span className="font-bold text-xs text-[#191c1b] group-hover:text-[#00513a] transition-colors line-clamp-1">
                            {report.title}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-[#56615c] shrink-0 font-bold">
                          {report.id}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-[#56615c]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#00513a]" />
                          {report.city} · {report.provinceOrTerritory}
                        </span>
                        <span className="font-semibold text-[#191c1b]">{report.time}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 5. Interactive Report Detail Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#bec9c2] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-2 border-b border-[#e2e3e0] pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#56615c]">{activeReportModal.id}</span>
                <h3 className="text-lg font-extrabold text-[#191c1b] leading-snug mt-0.5">
                  {activeReportModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveReportModal(null)}
                className="p-1 rounded-full text-[#56615c] hover:bg-[#f3f4f1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  activeReportModal.priority === 'High'
                    ? 'bg-[#ffdad6] text-[#93000a]'
                    : activeReportModal.priority === 'Medium'
                    ? 'bg-[#fff3e0] text-[#e65100]'
                    : 'bg-[#e8f5e9] text-[#00513a]'
                }`}
              >
                {activeReportModal.priority} Priority
              </span>

              <span className="text-xs font-semibold bg-[#f3f4f1] text-[#191c1b] px-2.5 py-0.5 rounded-full border border-[#e2e3e0]">
                {activeReportModal.category}
              </span>

              <span className="text-xs font-semibold bg-[#dae5df] text-[#00513a] px-2.5 py-0.5 rounded-full">
                {activeReportModal.status}
              </span>
            </div>

            {/* Location & Summary */}
            <div className="flex flex-col gap-2 text-xs md:text-sm text-[#56615c]">
              <div className="flex items-center gap-1.5 font-semibold text-[#191c1b]">
                <MapPin className="w-4 h-4 text-[#00513a]" />
                <span>
                  {activeReportModal.neighborhood ? `${activeReportModal.neighborhood}, ` : ''}
                  {activeReportModal.city}, {activeReportModal.provinceOrTerritory}
                </span>
              </div>

              <div className="bg-[#f9faf7] p-3.5 rounded-xl border border-[#e2e3e0] text-[#191c1b] leading-relaxed">
                <p className="font-bold text-xs text-[#00513a] mb-1">Issue Description:</p>
                <p>{activeReportModal.summary}</p>
              </div>

              <div className="bg-[#f3f4f1] p-3 rounded-xl border border-[#e2e3e0] text-xs">
                <span className="font-bold text-[#00513a]">Suggested Municipal Authority: </span>
                <span className="text-[#191c1b]">{activeReportModal.suggestedDepartment}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={`/result?message=${encodeURIComponent(activeReportModal.summary)}&location=${encodeURIComponent(`${activeReportModal.city}, ${activeReportModal.provinceOrTerritory}`)}`}
                className="flex-1 bg-[#00513a] hover:bg-[#0d6b4f] text-white text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <span>View Full AI Draft</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setActiveReportModal(null)}
                className="bg-white border border-[#bec9c2] text-[#56615c] text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl hover:bg-[#f3f4f1] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
