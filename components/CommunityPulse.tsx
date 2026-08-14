'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  PlusCircle, 
  ArrowRight,
  Info
} from 'lucide-react';
import { PAKISTAN_PROVINCES, getCityPulseData } from '@/lib/cities-data';
import PakistanMap from '@/components/PakistanMap';

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

  const pulseData = getCityPulseData(selectedCity, selectedProvince);

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
              <span className="text-[11px] font-medium hidden sm:inline">Change city</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Searchable Province-Grouped Dropdown Modal */}
          {isDropdownOpen && (
            <div
              className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#bec9c2] rounded-xl shadow-xl z-50 overflow-hidden max-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-150"
              role="listbox"
            >
              {/* Search input header */}
              <div className="p-2.5 border-b border-[#e2e3e0] bg-[#f9faf7]">
                <div className="flex items-center gap-2 bg-white border border-[#bec9c2] rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-[#00513a]">
                  <Search className="w-3.5 h-3.5 text-[#56615c] shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city or province..."
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
              {pulseData.reportsCount}
            </p>
            <p className="text-[10px] text-[#56615c] font-semibold mt-0.5">
              Reports structured
            </p>
          </div>
          
          <div className="bg-[#ffdad6]/60 p-3 rounded-xl border border-[#ffdad6] text-center">
            <p className="text-xl md:text-2xl font-extrabold text-[#ba1a1a]">
              {pulseData.highPriorityCount}
            </p>
            <p className="text-[10px] text-[#93000a] font-semibold mt-0.5">
              High-priority issues
            </p>
          </div>

          <div className="bg-[#e8f5e9] p-3 rounded-xl border border-[#c8e6c9] text-center">
            <p className="text-xl md:text-2xl font-extrabold text-[#00513a]">
              {pulseData.resolvedPercent}%
            </p>
            <p className="text-[10px] text-[#00513a] font-semibold mt-0.5">
              Resolved
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#56615c]/80 italic text-center">
          Demo data for prototype — not live government data.
        </p>
      </div>

      {/* Enhanced Stylized Issue Map */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-[#00513a] px-1">
          <span>Community issue map (National View)</span>
          <span className="text-[11px] text-[#56615c] font-semibold">
            Click any city on map to switch
          </span>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#bec9c2]/70 h-64 bg-[#e8ede9] shadow-inner">
          <PakistanMap
            selectedCity={selectedCity}
            onSelectCity={(city, prov) => handleCitySelect(city, prov)}
          />
        </div>

        <p className="text-[10px] text-[#56615c]/80 text-center">
          Community reports grouped by area and priority.
        </p>
      </div>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        <Link
          href="/dashboard"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#00513a] hover:bg-[#0d6b4f] text-white text-xs md:text-sm font-bold py-2.5 px-4 rounded-xl shadow-2xs hover:shadow transition-all text-center cursor-pointer active:scale-98"
        >
          <span>View Community Dashboard</span>
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
