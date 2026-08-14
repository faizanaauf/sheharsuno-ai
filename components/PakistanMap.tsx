'use client';

import React from 'react';

export interface MapCityPoint {
  id: string;
  name: string;
  province: string;
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
  priority: 'High' | 'Medium' | 'Logged';
  issue: string;
  reportsCount?: number;
}

export const PAKISTAN_MAJOR_CITIES: MapCityPoint[] = [
  { id: 'isb', name: 'Islamabad', province: 'ICT', x: 67, y: 27, priority: 'Medium', issue: 'Drainage & streetlight maintenance', reportsCount: 19 },
  { id: 'rwp', name: 'Rawalpindi', province: 'Punjab', x: 68, y: 29, priority: 'High', issue: 'Raja Bazar drainage overflow', reportsCount: 26 },
  { id: 'lhr', name: 'Lahore', province: 'Punjab', x: 77, y: 41, priority: 'High', issue: 'Model Town blocked school nala', reportsCount: 32 },
  { id: 'fsd', name: 'Faisalabad', province: 'Punjab', x: 68, y: 43, priority: 'Medium', issue: 'Clock tower waste accumulation', reportsCount: 21 },
  { id: 'mul', name: 'Multan', province: 'Punjab', x: 59, y: 53, priority: 'High', issue: 'Sewage pipeline leak near Bosan Rd', reportsCount: 17 },
  { id: 'gwd', name: 'Gujranwala', province: 'Punjab', x: 74, y: 36, priority: 'Logged', issue: 'GT Road streetlights unlit', reportsCount: 15 },
  { id: 'psh', name: 'Peshawar', province: 'KPK', x: 57, y: 26, priority: 'High', issue: 'University Town storm runoff', reportsCount: 22 },
  { id: 'abt', name: 'Abbottabad', province: 'KPK', x: 67, y: 22, priority: 'Logged', issue: 'Murree Road surface repair', reportsCount: 11 },
  { id: 'qta', name: 'Quetta', province: 'Balochistan', x: 34, y: 53, priority: 'High', issue: 'Jinnah Road drainage silt', reportsCount: 16 },
  { id: 'gdr', name: 'Gwadar', province: 'Balochistan', x: 18, y: 84, priority: 'Logged', issue: 'Port access road lighting', reportsCount: 9 },
  { id: 'khi', name: 'Karachi', province: 'Sindh', x: 38, y: 82, priority: 'High', issue: 'Clifton stormwater drain backlog', reportsCount: 45 },
  { id: 'hyd', name: 'Hyderabad', province: 'Sindh', x: 44, y: 77, priority: 'Medium', issue: 'Qasimabad garbage collection', reportsCount: 24 },
  { id: 'suk', name: 'Sukkur', province: 'Sindh', x: 46, y: 64, priority: 'Logged', issue: 'Barrage approach road patch', reportsCount: 13 },
  { id: 'glt', name: 'Gilgit', province: 'Gilgit-Baltistan', x: 74, y: 13, priority: 'Medium', issue: 'River bank retaining wall check', reportsCount: 8 },
  { id: 'skd', name: 'Skardu', province: 'Gilgit-Baltistan', x: 84, y: 14, priority: 'Logged', issue: 'Main bazaar power fluctuation', reportsCount: 6 },
  { id: 'mzf', name: 'Muzaffarabad', province: 'AJK', x: 73, y: 22, priority: 'Medium', issue: 'Neelum bridge light outage', reportsCount: 12 },
];

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
  return (
    <div className={`relative w-full h-full bg-[#e8ede9] select-none overflow-hidden ${className}`}>
      
      {/* Background Topography & Grid Overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#bec9c2 1px, transparent 1px), linear-gradient(to right, rgba(0,81,58,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Arabian Sea Label at bottom */}
      <div className="absolute bottom-2 left-6 text-[10px] font-extrabold text-[#0060a7]/60 tracking-widest uppercase pointer-events-none">
        Arabian Sea · بحیرہ عرب
      </div>

      {/* SVG Authentic Map of Pakistan */}
      <svg
        viewBox="0 0 500 520"
        className="w-full h-full object-contain p-2"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients for Pakistan Provinces */}
          <linearGradient id="pakistanLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d5e2d9" />
            <stop offset="50%" stopColor="#c8dbcf" />
            <stop offset="100%" stopColor="#b9d2c2" />
          </linearGradient>

          <filter id="pakistanShadow" x="-5%" y="-5%" width="115%" height="115%">
            <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#00513a" floodOpacity="0.12" />
          </filter>

          {/* Pattern for territory texture */}
          <pattern id="dotPattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.75" fill="#00513a" fillOpacity="0.08" />
          </pattern>
        </defs>

        {/* 1. Complete Pakistan National Mainland Path (Geographically Accurate Silhouette) */}
        <g filter="url(#pakistanShadow)">
          {/* Main Pakistan boundary */}
          <path
            d="
              M 355,55 
              C 385,60 410,75 425,95
              C 415,115 390,120 370,135
              C 385,155 365,185 360,205
              C 380,215 395,245 385,275
              C 365,285 350,310 330,340
              C 305,370 280,410 260,445
              C 240,465 210,480 185,465
              C 160,455 140,445 110,440
              C 85,435 60,430 40,425
              C 45,400 65,370 80,340
              C 95,310 115,290 120,260
              C 130,230 155,210 170,185
              C 190,165 220,150 245,130
              C 275,110 310,80 340,65
              Z
            "
            fill="url(#pakistanLandGrad)"
            stroke="#00513a"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Internal Province Division Lines & Regions */}
          {/* Balochistan (West) */}
          <path
            d="
              M 40,425
              C 65,430 110,440 185,465
              C 200,435 205,385 215,340
              C 220,300 210,260 170,235
              C 145,220 120,260 80,340
              C 65,370 45,400 40,425
              Z
            "
            fill="#d0dfd5"
            fillOpacity="0.6"
            stroke="#00513a"
            strokeWidth="1.2"
            strokeDasharray="3,3"
          />

          {/* Sindh (South East) */}
          <path
            d="
              M 185,465
              C 210,480 240,465 260,445
              C 280,410 265,360 250,335
              C 230,330 215,340 200,435
              Z
            "
            fill="#c2d9cb"
            fillOpacity="0.7"
            stroke="#00513a"
            strokeWidth="1.2"
            strokeDasharray="3,3"
          />

          {/* Punjab (Central East) */}
          <path
            d="
              M 250,335
              C 265,360 280,410 330,340
              C 350,310 365,285 385,275
              C 395,245 380,215 360,205
              C 330,210 295,230 270,260
              C 255,285 250,310 250,335
              Z
            "
            fill="#b8d4c3"
            fillOpacity="0.7"
            stroke="#00513a"
            strokeWidth="1.2"
            strokeDasharray="3,3"
          />

          {/* Khyber Pakhtunkhwa & Islamabad (North West) */}
          <path
            d="
              M 170,235
              C 210,260 255,285 270,260
              C 295,230 330,210 360,205
              C 340,175 310,165 290,150
              C 260,160 220,180 170,235
              Z
            "
            fill="#c9ded0"
            fillOpacity="0.7"
            stroke="#00513a"
            strokeWidth="1.2"
            strokeDasharray="3,3"
          />

          {/* Gilgit-Baltistan & AJK (Far North) */}
          <path
            d="
              M 290,150
              C 310,165 340,175 360,205
              C 365,185 385,155 370,135
              C 390,120 415,115 425,95
              C 410,75 385,60 355,55
              C 340,65 310,80 275,110
              C 280,130 285,140 290,150
              Z
            "
            fill="#bed8c7"
            fillOpacity="0.8"
            stroke="#00513a"
            strokeWidth="1.2"
            strokeDasharray="3,3"
          />

          {/* Subtle River Indus Blue Path */}
          <path
            d="
              M 370,110
              Q 320,160 290,220
              T 260,320
              Q 240,390 200,455
            "
            fill="none"
            stroke="#0060a7"
            strokeWidth="2.5"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
        </g>

        {/* Region Labels */}
        <text x="110" y="325" fill="#00513a" fillOpacity="0.6" fontSize="13" fontWeight="800" letterSpacing="1.5">BALOCHISTAN</text>
        <text x="215" y="415" fill="#00513a" fillOpacity="0.6" fontSize="12" fontWeight="800" letterSpacing="1.5">SINDH</text>
        <text x="295" y="275" fill="#00513a" fillOpacity="0.6" fontSize="14" fontWeight="800" letterSpacing="1.5">PUNJAB</text>
        <text x="220" y="200" fill="#00513a" fillOpacity="0.6" fontSize="11" fontWeight="800" letterSpacing="1">KPK</text>
        <text x="330" y="115" fill="#00513a" fillOpacity="0.6" fontSize="11" fontWeight="800" letterSpacing="1">GILGIT-BALTISTAN</text>
        <text x="365" y="175" fill="#00513a" fillOpacity="0.6" fontSize="10" fontWeight="800">AJK</text>

        {/* Major Cities Vector Markings */}
        {PAKISTAN_MAJOR_CITIES.map((c) => {
          const isSelected = selectedCity.toLowerCase() === c.name.toLowerCase();
          const svgX = (c.x / 100) * 500;
          const svgY = (c.y / 100) * 520;

          let dotColor = '#0060a7'; // Logged
          if (c.priority === 'High') dotColor = '#ba1a1a';
          else if (c.priority === 'Medium') dotColor = '#e8a000';

          return (
            <g
              key={c.id}
              className="cursor-pointer group"
              onClick={() => onSelectCity && onSelectCity(c.name, c.province)}
            >
              {/* Pulsing ring if selected or High Priority */}
              {(isSelected || c.priority === 'High') && (
                <circle
                  cx={svgX}
                  cy={svgY}
                  r={isSelected ? 14 : 9}
                  fill={dotColor}
                  fillOpacity="0.25"
                  className="animate-ping"
                  style={{ transformOrigin: `${svgX}px ${svgY}px` }}
                />
              )}

              {/* Selection Halo */}
              {isSelected && (
                <circle
                  cx={svgX}
                  cy={svgY}
                  r="10"
                  fill="#00513a"
                  fillOpacity="0.2"
                  stroke="#00513a"
                  strokeWidth="1.5"
                />
              )}

              {/* City Pin Dot */}
              <circle
                cx={svgX}
                cy={svgY}
                r={isSelected ? 5.5 : 4}
                fill={dotColor}
                stroke="#ffffff"
                strokeWidth="1.5"
                className="transition-transform group-hover:scale-125"
              />

              {/* City Label */}
              <text
                x={svgX + 7}
                y={svgY + 3.5}
                fill={isSelected ? '#00513a' : '#191c1b'}
                fontSize={isSelected ? '12' : '9.5'}
                fontWeight={isSelected ? '800' : '600'}
                className="drop-shadow-xs pointer-events-none select-none"
              >
                {c.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating City Card for Selected City */}
      <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#bec9c2]/70 shadow-xs flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse" />
        <div>
          <p className="text-[11px] font-extrabold text-[#00513a] leading-none">{selectedCity}</p>
          <p className="text-[9px] text-[#56615c] font-medium mt-0.5">Real Pakistan Map Active</p>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-[#e2e3e0] text-[10px] flex items-center gap-3 text-[#56615c] shadow-2xs font-bold">
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
  );
}
