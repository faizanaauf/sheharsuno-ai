'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NationalIssueReport, RegionView } from '@/lib/pakistan-map-data';
import { useRouter } from 'next/navigation';
import { MapPin, Tag, ArrowRight, ShieldCheck } from 'lucide-react';

interface PakistanMapProps {
  reports: NationalIssueReport[];
  currentView: RegionView;
  onSelectReport?: (report: NationalIssueReport) => void;
}

// Controller component to smoothly fly/pan to selected region or city
function MapViewController({ view }: { view: RegionView }) {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.flyTo(view.center, view.zoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [view, map]);

  return null;
}

// Helper to generate custom colored SVG marker icons without external asset dependencies
function createIssueIcon(priority: string) {
  let color = '#0060a7'; // Blue default
  let ringColor = 'rgba(0, 96, 167, 0.4)';
  
  if (priority === 'High') {
    color = '#ba1a1a';
    ringColor = 'rgba(186, 26, 26, 0.4)';
  } else if (priority === 'Medium') {
    color = '#e8a000';
    ringColor = 'rgba(232, 160, 0, 0.4)';
  } else if (priority === 'Low' || priority === 'Resolved') {
    color = '#00513a';
    ringColor = 'rgba(0, 81, 58, 0.4)';
  }

  const svgHtml = `
    <div style="
      position: relative;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    ">
      <div style="
        position: absolute;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: ${ringColor};
        animation: pulse 2s infinite;
      "></div>
      <div style="
        position: relative;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${color};
        border: 2.5px solid #ffffff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    </div>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-leaflet-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

export default function PakistanMap({ reports, currentView, onSelectReport }: PakistanMapProps) {
  const router = useRouter();

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-inner">
      <MapContainer
        center={currentView.center}
        zoom={currentView.zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <MapViewController view={currentView} />

        {/* Clean, low-noise OpenStreetMap Carto Light tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
          minZoom={4}
        />

        {/* Render all filtered reports as markers */}
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={createIssueIcon(report.priority)}
          >
            <Popup className="custom-sheharsuno-popup">
              <div className="p-1 max-w-[260px] flex flex-col gap-2">
                {/* Header */}
                <div className="flex items-start justify-between gap-1.5 border-b border-[#e2e3e0] pb-2">
                  <div>
                    <span className="font-mono text-[10px] text-[#56615c] font-bold">{report.id}</span>
                    <h4 className="font-bold text-xs text-[#191c1b] leading-snug mt-0.5">{report.title}</h4>
                  </div>
                  <span
                    className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                      report.priority === 'High'
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : report.priority === 'Medium'
                        ? 'bg-[#fff3e0] text-[#e65100]'
                        : 'bg-[#e8f5e9] text-[#00513a]'
                    }`}
                  >
                    {report.priority}
                  </span>
                </div>

                {/* Meta details */}
                <div className="flex flex-col gap-1 text-[11px] text-[#56615c]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00513a] shrink-0" />
                    <span>{report.neighborhood ? `${report.neighborhood}, ` : ''}{report.city} · {report.provinceOrTerritory}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#0060a7] shrink-0" />
                    <span>Category: <strong>{report.category}</strong></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#56615c] shrink-0" />
                    <span>Status: <strong className="text-[#191c1b]">{report.status}</strong> ({report.time})</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-[11px] text-[#191c1b] leading-relaxed bg-[#f9faf7] p-2 rounded-lg border border-[#e2e3e0]">
                  {report.summary}
                </p>

                {/* Action button */}
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectReport) {
                      onSelectReport(report);
                    } else {
                      router.push(`/result?message=${encodeURIComponent(report.summary)}&location=${encodeURIComponent(`${report.city}, ${report.provinceOrTerritory}`)}`);
                    }
                  }}
                  className="w-full mt-1 bg-[#00513a] hover:bg-[#0d6b4f] text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <span>View report</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Embedded CSS for clean popup styling and pulse animation */}
      <style jsx global>{`
        .custom-sheharsuno-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border: 1px solid #bec9c2;
          padding: 6px;
        }
        .custom-sheharsuno-popup .leaflet-popup-tip {
          background: #ffffff;
        }
        .custom-sheharsuno-popup .leaflet-popup-content {
          margin: 6px;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.4);
            opacity: 0;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
