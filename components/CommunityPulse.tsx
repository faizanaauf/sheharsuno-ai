'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  PlusCircle, 
  ArrowRight,
  Info
} from 'lucide-react';
import { PAKISTAN_PROVINCES } from '@/lib/cities-data';
import { 
  NATIONAL_DEMO_REPORTS, 
  PAKISTAN_CITIES, 
  RegionView 
} from '@/lib/pakistan-map-data';

// Dynamically import Leaflet map with SSR disabled
const DynamicPakistanMap = dynamic(() => import('@/components/PakistanMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-56 bg-[#e8ede9] rounded-xl flex flex-col items-center justify-center text-center p-4 border border-[#bec9c2]">
      <div className="w-8 h-8 rounded-full border-3 border-[#00513a]/20 border-t-[#00513a] animate-spin mb-2" />
      <p className="font-bold text-xs text-[#00513a]">Loading City Map...</p>
    </div>
  ),
});

export default function CommunityPulse() {
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [selectedProvince, setSelectedProvince] = useState('Punjab');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  // Find city location data to automatically zone into that city
  const cityLocation = useMemo(() => {
    const found = PAKISTAN_CITIES.find((c) => c.name.toLowerCase() === selectedCity.toLowerCase());
    if (found) {
      return {
        name: found.name,
        center: found.center,
        zoom: 12,
      } as RegionView;
    }
    return {
      name: selectedCity,
      center: [31.5204, 74.3587] as [number, number],
      zoom: 12,
    } as RegionView;
  }, [selectedCity]);

  // Reports for the selected city (or national if city has none)
  const cityReports = useMemo(() => {
    const filtered = NATIONAL_DEMO_REPORTS.filter(
      (r) => r.city.toLowerCase() === selectedCity.toLowerCase()
    );
    if (filtered.length > 0) return filtered;
    
    // If specific city has few seeded records, generate local offset pins around city center
    return [
      {
        id: `PK-${selectedCity.substring(0, 3).toUpperCase()}-001`,
        title: `Blocked drainage near ${selectedCity} main road`,
        category: "Drainage" as const,
        priority: "High" as const,
        city: selectedCity,
        provinceOrTerritory: selectedProvince,
        neighborhood: `${selectedCity} Central`,
        latitude: cityLocation.center[0] + 0.012,
        longitude: cityLocation.center[1] + 0.015,
        status: "Needs action" as const,
        time: "20m ago",
        summary: `Rainwater accumulation on main access road in ${selectedCity}. Stormwater drain clogged with debris.`,
        suggestedDepartment: `Water and Sanitation Authority (${selectedCity})`,
      },
      {
        id: `PK-${selectedCity.substring(0, 3).toUpperCase()}-002`,
        title: `Garbage disposal delay in ${selectedCity}`,
        category: "Garbage" as const,
        priority: "Medium" as const,
        city: selectedCity,
        provinceOrTerritory: selectedProvince,
        neighborhood: `${selectedCity} Sector B`,
        latitude: cityLocation.center[0] - 0.010,
        longitude: cityLocation.center[1] - 0.008,
        status: "Reviewing" as const,
        time: "1h ago",
        summary: `Uncollected residential solid waste container overflowing on the sidewalk.`,
        suggestedDepartment: `Municipal Corporation ${selectedCity}`,
      },
      {
        id: `PK-${selectedCity.substring(0, 3).toUpperCase()}-003`,
        title: `Streetlight maintenance in ${selectedCity}`,
        category: "Streetlight" as const,
        priority: "Low" as const,
        city: selectedCity,
        provinceOrTerritory: selectedProvince,
        neighborhood: `${selectedCity} Civic Center`,
        latitude: cityLocation.center[0] + 0.005,
        longitude: cityLocation.center[1] - 0.014,
        status: "Logged" as const,
        time: "3h ago",
        summary: `Public street lighting pole out of service on commercial avenue.`,
        suggestedDepartment: `Power & Works Division (${selectedCity})`,
      },
    ];
  }, [selectedCity, selectedProvince, cityLocation]);

  const reportsStructuredCount = cityReports.length >= 4 ? 32 : 18;
  const highPriorityCount = cityReports.filter((r) => r.priority === 'High').length >= 1 ? 8 : 4;
  const resolvedPercent = 71;

  // Filter provinces and cities by search query
  const filteredProvinces = PAKISTAN_PROVINCES.map((prov) => ({
    province: prov.province,
    cities: prov.cities.filter((c) =>
      c.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prov.province.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((prov) => prov.cities.length > 0);

  const handleCitySelect = (city: string, province: string) => {
    setSelectedCity(city);
    setSelectedProvince(province);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleReportNewIssue = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#e2e3e0] shadow-sm flex flex-col gap-5">
      
      {/* Header Row */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00513a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00513a]"></span>
            </span>
            <h3 className="font-bold text-base md:text-lg text-[#00513a] tracking-tight">
              Today’s community pulse
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#00513a] bg-[#a1f3cf]/30 border border-[#00513a]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Prototype insights
          </span>
        </div>

        {/* Interactive Searchable City Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between bg-[#f3f4f1] hover:bg-[#e8ede9] border border-[#bec9c2]/70 rounded-xl px-3.5 py-2 text-xs md:text-sm font-bold text-[#00513a] transition-all cursor-pointer shadow-2xs focus:ring-2 focus:ring-[#00513a] focus:outline-none"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Select City and Province"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-4 h-4 text-[#00513a] shrink-0" />
              <span className="truncate">
                {selectedCity} · {selectedProvince}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0 text-[#56615c]">
              <span className="text-[11px] font-medium hidden sm:inline">Select city</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Searchable Province-Grouped Dropdown */}
          {isDropdownOpen && (
            <div
              className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#bec9c2] rounded-xl shadow-xl z-50 overflow-hidden max-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-150"
              role="listbox"
            >
              {/* Search input */}
              <div className="p-2.5 border-b border-[#e2e3e0] bg-[#f9faf7]">
                <div className="flex items-center gap-2 bg-white border border-[#bec9c2] rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-[#00513a]">
                  <Search className="w-3.5 h-3.5 text-[#56615c] shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city or province in Pakistan..."
                    className="w-full text-xs text-[#191c1b] bg-transparent outline-none placeholder:text-[#56615c]/60"
                  />
                </div>
              </div>

              {/* Grouped City List */}
              <div className="overflow-y-auto p-2 divide-y divide-[#e2e3e0]/50">
                {filteredProvinces.length === 0 ? (
                  <div className="p-3 text-center text-xs text-[#56615c]">
                    No matching cities found in Pakistan.
                  </div>
                ) : (
                  filteredProvinces.map((group) => (
                    <div key={group.province} className="py-2 first:pt-0 last:pb-0">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#56615c] px-2.5 mb-1">
                        {group.province}
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {group.cities.map((city) => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => handleCitySelect(city, group.province)}
                            className={`flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              selectedCity === city
                                ? 'bg-[#00513a] text-white'
                                : 'text-[#191c1b] hover:bg-[#f3f4f1]'
                            }`}
                            role="option"
                            aria-selected={selectedCity === city}
                          >
                            <span>{city}</span>
                            {selectedCity === city && <span className="text-[10px]">✓</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#f3f4f1] p-3 rounded-xl border border-[#e2e3e0] text-center">
            <p className="text-xl md:text-2xl font-extrabold text-[#00513a]">
              {reportsStructuredCount}
            </p>
            <p className="text-[10px] text-[#56615c] font-semibold mt-0.5">
              reports structured
            </p>
          </div>
          
          <div className="bg-[#ffdad6]/60 p-3 rounded-xl border border-[#ffdad6] text-center">
            <p className="text-xl md:text-2xl font-extrabold text-[#ba1a1a]">
              {highPriorityCount}
            </p>
            <p className="text-[10px] text-[#93000a] font-semibold mt-0.5">
              high-priority issues
            </p>
          </div>

          <div className="bg-[#e8f5e9] p-3 rounded-xl border border-[#c8e6c9] text-center">
            <p className="text-xl md:text-2xl font-extrabold text-[#00513a]">
              {resolvedPercent}%
            </p>
            <p className="text-[10px] text-[#00513a] font-semibold mt-0.5">
              resolved
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#56615c]/80 italic text-center">
          Demo data for prototype — not live government data.
        </p>
      </div>

      {/* Real Interactive OpenStreetMap Leaflet Map that Auto-Zones into Selected City */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#00513a] px-1">
          <span>Community issue map</span>
          <span className="text-[11px] text-[#56615c] font-semibold">
            {selectedCity} · {selectedProvince}
          </span>
        </div>

        {/* Real OpenStreetMap Leaflet Container */}
        <div className="h-56 w-full rounded-xl overflow-hidden border border-[#bec9c2]/70 shadow-inner">
          <DynamicPakistanMap
            reports={cityReports}
            currentView={cityLocation}
          />
        </div>

        {/* Legend & Caption */}
        <div className="flex items-center justify-between text-[10px] text-[#56615c] px-1 pt-1">
          <span>Community reports in {selectedCity}</span>
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />High</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e8a000]" />Medium</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00513a]" />Other</span>
          </div>
        </div>
      </div>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        <Link
          href="/dashboard"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#00513a] hover:bg-[#0d6b4f] text-white text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl shadow-2xs hover:shadow transition-all text-center cursor-pointer active:scale-98"
        >
          <span>View full dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={handleReportNewIssue}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#f3f4f1] hover:bg-[#e2e3e0] text-[#00513a] text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl border border-[#bec9c2]/60 transition-all text-center cursor-pointer active:scale-98"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Report a new issue</span>
        </button>
      </div>

      {/* Trust and Safety Note */}
      <div className="flex items-start gap-2 bg-[#f9faf7] p-3 rounded-xl border border-[#e2e3e0]/80 text-[11px] text-[#56615c] leading-relaxed">
        <Info className="w-4 h-4 text-[#00513a] shrink-0 mt-0.5" />
        <span>
          SheharSuno helps structure community reports. It does not replace emergency services or official authorities.
        </span>
      </div>

    </div>
  );
}
