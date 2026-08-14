'use client';

import React, { useState } from 'react';
import { RotateCcw, Filter } from 'lucide-react';

export interface MapCityPoint {
  id: string;
  name: string;
  province: string;
  svgX: number; // coordinate in SVG view space (0 to 800)
  svgY: number; // coordinate in SVG view space (0 to 850)
  priority: 'High' | 'Medium' | 'Logged';
  issue: string;
  reportsCount: number;
}

export const PAKISTAN_CITIES_REGIONAL: Record<string, MapCityPoint[]> = {
  Punjab: [
    { id: 'lhr', name: 'Lahore', province: 'Punjab', svgX: 585, svgY: 420, priority: 'High', issue: 'Model Town blocked school nala', reportsCount: 32 },
    { id: 'rwp', name: 'Rawalpindi', province: 'Punjab', svgX: 520, svgY: 285, priority: 'High', issue: 'Raja Bazar drainage overflow', reportsCount: 26 },
    { id: 'fsd', name: 'Faisalabad', province: 'Punjab', svgX: 515, svgY: 435, priority: 'Medium', issue: 'Clock tower waste accumulation', reportsCount: 21 },
    { id: 'mul', name: 'Multan', province: 'Punjab', svgX: 435, svgY: 535, priority: 'High', issue: 'Sewage pipeline leak near Bosan Rd', reportsCount: 17 },
    { id: 'gwd', name: 'Gujranwala', province: 'Punjab', svgX: 565, svgY: 365, priority: 'Logged', issue: 'GT Road streetlights unlit', reportsCount: 15 },
    { id: 'slk', name: 'Sialkot', province: 'Punjab', svgX: 585, svgY: 345, priority: 'Medium', issue: 'Kashmir road drainage backlog', reportsCount: 14 },
    { id: 'bwp', name: 'Bahawalpur', province: 'Punjab', svgX: 450, svgY: 580, priority: 'Logged', issue: 'Main circular road pothole', reportsCount: 10 },
  ],
  Sindh: [
    { id: 'khi', name: 'Karachi', province: 'Sindh', svgX: 300, svgY: 760, priority: 'High', issue: 'Clifton stormwater drain backlog', reportsCount: 45 },
    { id: 'hyd', name: 'Hyderabad', province: 'Sindh', svgX: 350, svgY: 715, priority: 'Medium', issue: 'Qasimabad garbage collection', reportsCount: 24 },
    { id: 'suk', name: 'Sukkur', province: 'Sindh', svgX: 365, svgY: 590, priority: 'Logged', issue: 'Barrage approach road patch', reportsCount: 13 },
    { id: 'lrk', name: 'Larkana', province: 'Sindh', svgX: 325, svgY: 605, priority: 'High', issue: 'Civil hospital road drain blockage', reportsCount: 12 },
    { id: 'mpk', name: 'Mirpur Khas', province: 'Sindh', svgX: 385, svgY: 720, priority: 'Logged', issue: 'Main station streetlight outage', reportsCount: 8 },
  ],
  KPK: [
    { id: 'psh', name: 'Peshawar', province: 'KPK', svgX: 440, svgY: 260, priority: 'High', issue: 'University Town storm runoff', reportsCount: 22 },
    { id: 'mrd', name: 'Mardan', province: 'KPK', svgX: 465, svgY: 235, priority: 'Medium', issue: 'Bazaar road garbage removal', reportsCount: 14 },
    { id: 'abt', name: 'Abbottabad', province: 'KPK', svgX: 520, svgY: 225, priority: 'Logged', issue: 'Murree Road surface repair', reportsCount: 11 },
    { id: 'swt', name: 'Swat / Mingora', province: 'KPK', svgX: 470, svgY: 175, priority: 'Medium', issue: 'Riverbank drainage check', reportsCount: 9 },
    { id: 'dik', name: 'D.I. Khan', province: 'KPK', svgX: 395, svgY: 380, priority: 'High', issue: 'Indus highway culvert blockage', reportsCount: 10 },
  ],
  Balochistan: [
    { id: 'qta', name: 'Quetta', province: 'Balochistan', svgX: 280, svgY: 480, priority: 'High', issue: 'Jinnah Road drainage silt', reportsCount: 16 },
    { id: 'gdr', name: 'Gwadar', province: 'Balochistan', svgX: 120, svgY: 770, priority: 'Logged', issue: 'Port access road lighting', reportsCount: 9 },
    { id: 'trb', name: 'Turbat', province: 'Balochistan', svgX: 145, svgY: 720, priority: 'Medium', issue: 'Kech canal culvert maintenance', reportsCount: 7 },
    { id: 'khz', name: 'Khuzdar', province: 'Balochistan', svgX: 255, svgY: 625, priority: 'Logged', issue: 'RCD Highway broken shoulder', reportsCount: 8 },
    { id: 'sbi', name: 'Sibi', province: 'Balochistan', svgX: 335, svgY: 510, priority: 'Medium', issue: 'Railway road power line repair', reportsCount: 6 },
  ],
  ICT: [
    { id: 'isb', name: 'Islamabad', province: 'ICT', svgX: 515, svgY: 265, priority: 'Medium', issue: 'Sector F-7 greenbelt lighting & drainage', reportsCount: 19 },
    { id: 'isb2', name: 'Blue Area', province: 'ICT', svgX: 512, svgY: 268, priority: 'Logged', issue: 'Commercial pavement repair', reportsCount: 8 },
    { id: 'isb3', name: 'Sector G-9', province: 'ICT', svgX: 508, svgY: 272, priority: 'High', issue: 'Stormwater pipe maintenance', reportsCount: 11 },
  ],
  GilgitBaltistan: [
    { id: 'glt', name: 'Gilgit', province: 'Gilgit-Baltistan', svgX: 560, svgY: 120, priority: 'Medium', issue: 'River bank retaining wall check', reportsCount: 8 },
    { id: 'skd', name: 'Skardu', province: 'Gilgit-Baltistan', svgX: 635, svgY: 135, priority: 'Logged', issue: 'Main bazaar power fluctuation', reportsCount: 6 },
    { id: 'hnz', name: 'Hunza / Karimabad', province: 'Gilgit-Baltistan', svgX: 550, svgY: 85, priority: 'Medium', issue: 'KKH mountain runoff check', reportsCount: 5 },
  ],
  AJK: [
    { id: 'mzf', name: 'Muzaffarabad', province: 'AJK', svgX: 545, svgY: 220, priority: 'Medium', issue: 'Neelum bridge light outage', reportsCount: 12 },
    { id: 'mpr', name: 'Mirpur', province: 'AJK', svgX: 555, svgY: 305, priority: 'Logged', issue: 'Mangla road speed barrier fix', reportsCount: 9 },
    { id: 'rwk', name: 'Rawalakot', province: 'AJK', svgX: 550, svgY: 250, priority: 'High', issue: 'Main bazaar culvert overflow', reportsCount: 7 },
  ],
};

// Province bounding boxes for smooth viewport zoom
export const PROVINCE_VIEWBOXES: Record<string, string> = {
  All: '0 0 800 850',
  Punjab: '360 220 320 420',
  Sindh: '200 520 280 320',
  KPK: '330 110 270 330',
  Balochistan: '40 380 390 440',
  ICT: '460 210 120 120',
  GilgitBaltistan: '460 40 250 160',
  AJK: '490 170 120 180',
};

interface PakistanMapProps {
  selectedCity?: string;
  onSelectCity?: (city: string, province: string) => void;
  className?: string;
}

export default function PakistanMap({
  selectedCity = 'Lahore',
  onSelectCity,
  className = '',
}: PakistanMapProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activePin, setActivePin] = useState<string | null>(null);

  const currentViewBox = PROVINCE_VIEWBOXES[selectedFilter] || PROVINCE_VIEWBOXES.All;

  // Flatten active cities based on filter
  const displayedCities =
    selectedFilter === 'All'
      ? Object.values(PAKISTAN_CITIES_REGIONAL).flat()
      : PAKISTAN_CITIES_REGIONAL[selectedFilter] || [];

  const handleFilterChange = (filterKey: string) => {
    setSelectedFilter(filterKey);
  };

  const handleResetZoom = () => {
    setSelectedFilter('All');
  };

  return (
    <div className={`relative w-full h-full bg-[#e8ede9] select-none flex flex-col ${className}`}>
      
      {/* Top Interactive Province Zoom Filter Bar */}
      <div className="z-10 bg-white/95 backdrop-blur-md px-3 py-2 border-b border-[#bec9c2]/70 flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar shadow-2xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#00513a]" />
          <span className="text-[11px] font-extrabold text-[#00513a] uppercase tracking-wider">
            Region Zoom:
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {[
            { key: 'All', label: 'All Pakistan' },
            { key: 'Punjab', label: 'Punjab' },
            { key: 'Sindh', label: 'Sindh' },
            { key: 'KPK', label: 'KPK' },
            { key: 'Balochistan', label: 'Balochistan' },
            { key: 'ICT', label: 'Islamabad' },
            { key: 'GilgitBaltistan', label: 'Gilgit-Baltistan' },
            { key: 'AJK', label: 'AJK' },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleFilterChange(item.key)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                selectedFilter === item.key
                  ? 'bg-[#00513a] text-white shadow-2xs'
                  : 'bg-[#f3f4f1] text-[#56615c] hover:bg-[#e2e3e0] hover:text-[#00513a]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive SVG Map Viewport with Smooth ViewBox Zoom */}
      <div className="relative flex-1 w-full h-full min-h-[360px] overflow-hidden">
        
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#bec9c2 1px, transparent 1px), linear-gradient(to right, rgba(0,81,58,0.03) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Arabian Sea Label */}
        {selectedFilter === 'All' && (
          <div className="absolute bottom-3 left-6 text-[10px] font-extrabold text-[#0060a7]/60 tracking-widest uppercase pointer-events-none z-10">
            Arabian Sea · بحیرہ عرب
          </div>
        )}

        {/* SVG Pakistan Geographic Map */}
        <svg
          viewBox={currentViewBox}
          className="w-full h-full transition-all duration-700 ease-out"
          preserveAspectRatio="xMidYMid meet"
          style={{ transitionProperty: 'viewBox' }}
        >
          <defs>
            <linearGradient id="balochistanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbe8df" />
              <stop offset="100%" stopColor="#c8dbd0" />
            </linearGradient>
            <linearGradient id="punjabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c6e2d1" />
              <stop offset="100%" stopColor="#b4d7c2" />
            </linearGradient>
            <linearGradient id="sindhGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d0e5d8" />
              <stop offset="100%" stopColor="#bdd9c7" />
            </linearGradient>
            <linearGradient id="kpkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cde4d6" />
              <stop offset="100%" stopColor="#bed8c8" />
            </linearGradient>
            <linearGradient id="gbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bde0cc" />
              <stop offset="100%" stopColor="#a8d4bb" />
            </linearGradient>
            <linearGradient id="ajkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b8dec8" />
              <stop offset="100%" stopColor="#a3d2b6" />
            </linearGradient>

            <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#00513a" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Group containing all geographic provinces */}
          <g filter="url(#mapShadow)">
            
            {/* 1. BALOCHISTAN PROVINCE (South-West) */}
            <path
              id="province-balochistan"
              d="
                M 70,780 
                C 120,775 200,775 280,785 
                C 310,750 315,680 320,630 
                C 335,570 355,520 375,480 
                C 360,450 330,420 310,400 
                C 270,395 240,410 200,420 
                C 170,440 140,470 120,510 
                C 90,560 70,640 60,710 
                Z
              "
              fill="url(#balochistanGrad)"
              stroke="#00513a"
              strokeWidth={selectedFilter === 'Balochistan' ? 3 : 1.8}
              className={`transition-all cursor-pointer ${
                selectedFilter === 'Balochistan'
                  ? 'fill-[#a1f3cf]/70 stroke-[#00513a]'
                  : 'hover:fill-[#c4ded0]'
              }`}
              onClick={() => handleFilterChange('Balochistan')}
            />

            {/* 2. SINDH PROVINCE (South-East & Indus Delta) */}
            <path
              id="province-sindh"
              d="
                M 280,785 
                C 310,805 350,790 380,750 
                C 420,700 425,620 405,560 
                C 390,540 370,550 355,570 
                C 320,630 310,750 280,785 
                Z
              "
              fill="url(#sindhGrad)"
              stroke="#00513a"
              strokeWidth={selectedFilter === 'Sindh' ? 3 : 1.8}
              className={`transition-all cursor-pointer ${
                selectedFilter === 'Sindh'
                  ? 'fill-[#a1f3cf]/70 stroke-[#00513a]'
                  : 'hover:fill-[#bad9c5]'
              }`}
              onClick={() => handleFilterChange('Sindh')}
            />

            {/* 3. PUNJAB PROVINCE (East & Plains) */}
            <path
              id="province-punjab"
              d="
                M 375,480 
                C 405,560 420,620 460,570 
                C 510,500 550,470 600,440 
                C 620,400 610,340 580,310 
                C 550,300 520,320 490,350 
                C 460,370 420,410 375,480 
                Z
              "
              fill="url(#punjabGrad)"
              stroke="#00513a"
              strokeWidth={selectedFilter === 'Punjab' ? 3 : 1.8}
              className={`transition-all cursor-pointer ${
                selectedFilter === 'Punjab'
                  ? 'fill-[#a1f3cf]/70 stroke-[#00513a]'
                  : 'hover:fill-[#abd3bb]'
              }`}
              onClick={() => handleFilterChange('Punjab')}
            />

            {/* 4. KHYBER PAKHTUNKHWA (North-West) */}
            <path
              id="province-kpk"
              d="
                M 310,400 
                C 330,420 360,450 375,480 
                C 420,410 460,370 490,350 
                C 510,320 520,270 500,220 
                C 470,160 430,170 410,210 
                C 380,260 340,320 310,400 
                Z
              "
              fill="url(#kpkGrad)"
              stroke="#00513a"
              strokeWidth={selectedFilter === 'KPK' ? 3 : 1.8}
              className={`transition-all cursor-pointer ${
                selectedFilter === 'KPK'
                  ? 'fill-[#a1f3cf]/70 stroke-[#00513a]'
                  : 'hover:fill-[#b5d7c1]'
              }`}
              onClick={() => handleFilterChange('KPK')}
            />

            {/* 5. ISLAMABAD CAPITAL TERRITORY (ICT) */}
            <circle
              cx="515"
              cy="265"
              r={selectedFilter === 'ICT' ? 18 : 10}
              fill="#00513a"
              fillOpacity="0.25"
              stroke="#00513a"
              strokeWidth="2"
              className="cursor-pointer hover:fill-[#a1f3cf]"
              onClick={() => handleFilterChange('ICT')}
            />

            {/* 6. GILGIT-BALTISTAN (Northern Karakoram Crown) */}
            <path
              id="province-gb"
              d="
                M 500,220 
                C 520,170 530,120 550,70 
                C 580,50 640,65 670,100 
                C 680,140 650,170 600,190 
                C 560,200 530,210 500,220 
                Z
              "
              fill="url(#gbGrad)"
              stroke="#00513a"
              strokeWidth={selectedFilter === 'GilgitBaltistan' ? 3 : 1.8}
              className={`transition-all cursor-pointer ${
                selectedFilter === 'GilgitBaltistan'
                  ? 'fill-[#a1f3cf]/70 stroke-[#00513a]'
                  : 'hover:fill-[#9fd0b3]'
              }`}
              onClick={() => handleFilterChange('GilgitBaltistan')}
            />

            {/* 7. AZAD JAMMU AND KASHMIR (AJK) */}
            <path
              id="province-ajk"
              d="
                M 520,270 
                C 550,250 570,220 600,190 
                C 580,230 570,280 550,300 
                C 535,290 525,280 520,270 
                Z
              "
              fill="url(#ajkGrad)"
              stroke="#00513a"
              strokeWidth={selectedFilter === 'AJK' ? 3 : 1.8}
              className={`transition-all cursor-pointer ${
                selectedFilter === 'AJK'
                  ? 'fill-[#a1f3cf]/70 stroke-[#00513a]'
                  : 'hover:fill-[#9bd0b1]'
              }`}
              onClick={() => handleFilterChange('AJK')}
            />

            {/* River Indus (Darya-e-Sindh) Blue Course */}
            <path
              d="
                M 590,140 
                Q 520,220 490,290 
                T 460,420 
                Q 420,530 380,630 
                Q 350,710 300,770
              "
              fill="none"
              stroke="#0060a7"
              strokeWidth={selectedFilter === 'All' ? 3 : 4}
              strokeOpacity="0.5"
              strokeLinecap="round"
              strokeDasharray="4,2"
            />
          </g>

          {/* Dynamic Province Name Labels (visible when not heavily zoomed) */}
          {selectedFilter === 'All' && (
            <g className="pointer-events-none select-none">
              <text x="170" y="580" fill="#00513a" fillOpacity="0.75" fontSize="15" fontWeight="800" letterSpacing="2">BALOCHISTAN</text>
              <text x="310" y="700" fill="#00513a" fillOpacity="0.75" fontSize="14" fontWeight="800" letterSpacing="2">SINDH</text>
              <text x="470" y="470" fill="#00513a" fillOpacity="0.75" fontSize="16" fontWeight="800" letterSpacing="2">PUNJAB</text>
              <text x="390" y="320" fill="#00513a" fillOpacity="0.75" fontSize="13" fontWeight="800" letterSpacing="1.5">KPK</text>
              <text x="540" y="140" fill="#00513a" fillOpacity="0.75" fontSize="13" fontWeight="800" letterSpacing="1.5">GILGIT-BALTISTAN</text>
              <text x="560" y="245" fill="#00513a" fillOpacity="0.75" fontSize="11" fontWeight="800">AJK</text>
              <text x="530" y="270" fill="#00513a" fillOpacity="0.9" fontSize="10" fontWeight="900">ICT</text>
            </g>
          )}

          {/* Active Issue Hotspot Pins */}
          {displayedCities.map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
            const isActive = activePin === city.id;

            let dotColor = '#0060a7'; // Logged
            if (city.priority === 'High') dotColor = '#ba1a1a';
            else if (city.priority === 'Medium') dotColor = '#e8a000';

            const baseRadius = selectedFilter === 'All' ? 5.5 : 8;
            const textOffset = selectedFilter === 'All' ? 9 : 12;
            const textSize = selectedFilter === 'All' ? '12' : '15';

            return (
              <g
                key={city.id}
                className="cursor-pointer group"
                onClick={() => {
                  if (onSelectCity) onSelectCity(city.name, city.province);
                  setActivePin(isActive ? null : city.id);
                }}
                onMouseEnter={() => setActivePin(city.id)}
                onMouseLeave={() => setActivePin(null)}
              >
                {/* Priority Ping Animation */}
                {(isSelected || city.priority === 'High') && (
                  <circle
                    cx={city.svgX}
                    cy={city.svgY}
                    r={isSelected ? baseRadius * 2.8 : baseRadius * 2}
                    fill={dotColor}
                    fillOpacity="0.3"
                    className="animate-ping"
                    style={{ transformOrigin: `${city.svgX}px ${city.svgY}px` }}
                  />
                )}

                {/* Selection Ring */}
                {isSelected && (
                  <circle
                    cx={city.svgX}
                    cy={city.svgY}
                    r={baseRadius * 1.8}
                    fill="#00513a"
                    fillOpacity="0.25"
                    stroke="#00513a"
                    strokeWidth="2"
                  />
                )}

                {/* Pin Circle */}
                <circle
                  cx={city.svgX}
                  cy={city.svgY}
                  r={isSelected ? baseRadius * 1.3 : baseRadius}
                  fill={dotColor}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-125 shadow-md"
                />

                {/* City Name Label */}
                <text
                  x={city.svgX + textOffset}
                  y={city.svgY + 4}
                  fill={isSelected ? '#00513a' : '#191c1b'}
                  fontSize={textSize}
                  fontWeight={isSelected ? '900' : '700'}
                  className="select-none filter drop-shadow-xs"
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Zoom & Reset Controls */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
          <button
            type="button"
            onClick={handleResetZoom}
            className="bg-white/95 hover:bg-[#00513a] text-[#00513a] hover:text-white p-2 rounded-xl shadow-md border border-[#bec9c2] transition-all cursor-pointer active:scale-95"
            title="Reset to Full Pakistan Map"
            aria-label="Reset zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Active City Information Floating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#bec9c2] shadow-md z-20 flex items-center gap-2.5 max-w-[260px] sm:max-w-xs">
          <span className="w-3 h-3 rounded-full bg-[#ba1a1a] animate-pulse shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-black text-[#00513a] truncate">{selectedCity}</p>
              <span className="text-[10px] font-bold text-[#56615c] bg-[#edeeeb] px-1.5 py-0.2 rounded">
                {selectedFilter === 'All' ? 'National View' : `${selectedFilter} Zoom`}
              </span>
            </div>
            <p className="text-[10px] text-[#56615c] truncate mt-0.5">
              Showing authentic municipal boundaries
            </p>
          </div>
        </div>

        {/* Priority Legend */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#e2e3e0] text-[10px] flex items-center gap-2.5 text-[#56615c] shadow-md font-bold z-20">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e8a000]" />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0060a7]" />
            <span>Logged</span>
          </div>
        </div>

      </div>

    </div>
  );
}
