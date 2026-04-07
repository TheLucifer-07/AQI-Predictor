import React, { useEffect, useRef } from 'react';

const LOCI = [
  { name: 'APPCB Station (City Centre)',    coords: [17.729, 83.315], col: '#f59e0b', info: '🏢 Base AQI measuring station | Central urban traffic & commerce' },
  { name: 'RINL Steel Plant',               coords: [17.625, 83.161], col: '#ef4444', info: '🏭 Rashtriya Ispat Nigam Ltd – Heavy flaring & coke oven emissions' },
  { name: 'HPCL Refinery',                  coords: [17.685, 83.275], col: '#ef4444', info: '🛢️ Hindustan Petroleum – Petrochemical & SO₂ emissions' },
  { name: 'Port Road / Visakhapatnam Port', coords: [17.695, 83.285], col: '#f97316', info: '🚢 Coal & bulk cargo dust | High diesel vehicle movement' },
  { name: 'NH-16 Corridor',                 coords: [17.755, 83.325], col: '#f97316', info: '🚛 Major arterial highway – heavy truck & intercity transport' },
  { name: 'RK Beach',                       coords: [17.712, 83.333], col: '#10b981', info: '🏖️ Coastal sea-breeze dispersion zone | Tourism vehicle clusters' },
  { name: 'Gajuwaka Industrial Area',       coords: [17.690, 83.212], col: '#8b5cf6', info: '🏭 Dense secondary industry – fabrication, storage & chemical units' },
  { name: 'Duvvada (VSEZ)',                 coords: [17.702, 83.155], col: '#8b5cf6', info: '🏗️ Vizag Special Economic Zone + freight rail corridors' },
  { name: 'Anakapalle',                     coords: [17.689, 83.002], col: '#10b981', info: '🌾 Peri-urban agricultural area | NH-16 highway dust exposure' },
];

export default function MapCard({ selectedLocation }) {
  const mapRef       = useRef(null);
  const mapInstance  = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return;
    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current).setView([17.6868, 83.2185], 11);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map);

    LOCI.forEach(l => {
      const circle = L.circleMarker(l.coords, {
        color: l.col, fillColor: l.col, fillOpacity: 0.3, radius: 12, weight: 2,
      }).addTo(map);
      circle.bindPopup(
        `<div style="padding:4px 0"><strong style="font-size:0.9rem;color:#0f172a;">${l.name}</strong><br>
         <span style="color:#475569;font-size:0.8rem;line-height:1.5;display:block;margin-top:4px;">${l.info}</span></div>`,
        { maxWidth: 240 }
      );
      circle.on('mouseover', function () { this.openPopup(); });
      circle.on('click',     function () { map.flyTo(this.getLatLng(), 14, { duration: 1.2 }); });
    });

    mapInstance.current = map;
  }, []);

  useEffect(() => {
    const L   = window.L;
    const map = mapInstance.current;
    if (!L || !map || !selectedLocation) return;

    if (highlightRef.current) { map.removeLayer(highlightRef.current); highlightRef.current = null; }
    const [lat, lon] = selectedLocation.coords;
    map.flyTo([lat, lon], 13, { duration: 0.8 });
    highlightRef.current = L.circleMarker([lat, lon], {
      color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1,
      radius: 26, weight: 2.5, dashArray: '6,4', className: 'map-pulse-ring',
    }).addTo(map);
  }, [selectedLocation]);

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b border-slate-100">
        <span className="card-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
          </svg>
          Geospatial Intelligence Map
        </span>
        <span className="text-xs text-slate-400 font-medium">Visakhapatnam Region</span>
      </div>
      <div className="px-4 pt-3">
        <div ref={mapRef} id="map" />
      </div>
      <div className="px-4 pb-4 pt-3">
        <div className="note-box" style={{ borderLeftColor: 'var(--moderate)', background: 'rgba(249,115,22,0.04)' }}>
          <strong>🛰️ MODIS Satellite Insight (March 2026):</strong> Winter AOD peaks persist heavily along the NH-16 corridor, driven by trapped inversion layers preventing dispersion from heavily industrialized zones (RINL/HPCL) combined with changing spring wind patterns.
        </div>
      </div>
    </div>
  );
}
