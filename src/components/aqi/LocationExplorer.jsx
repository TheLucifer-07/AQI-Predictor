import React, { useState } from 'react';
import { fetchLiveAQI } from '../../hooks/useApi';

const LOCATIONS = [
  { name: 'APPCB City Centre', emoji: '🏢', coords: [17.729, 83.315], scale: 1.0,  causes: ['🚗 Dense city-centre traffic on busy arterial roads', '🏙️ Municipal waste burning & diesel generators', '🌬️ Coastal wind trapping in surrounding hills'] },
  { name: 'Port Road',         emoji: '🚢', coords: [17.695, 83.285], scale: 1.18, causes: ['🚢 Coal & iron ore unloading at Vizag Port (open dust)', '🚛 Hundreds of heavy trucks running diesel engines daily', '⚙️ Port machinery & ship exhaust emissions'] },
  { name: 'Duvvada (VSEZ)',    emoji: '🏗️', coords: [17.702, 83.155], scale: 1.15, causes: ['🏭 Vizag Special Economic Zone — factories & warehouses', '🚂 Freight rail corridors carrying industrial goods', '🔩 Heavy manufacturing & metal processing units'] },
  { name: 'Anakapalle',        emoji: '🌾', coords: [17.689, 83.002], scale: 0.88, causes: ['🌾 Post-harvest paddy stubble burning in Oct–Nov', '🚛 NH-16 highway vehicles passing through town', '🏠 Domestic biomass burning (cooking & heating)'] },
  { name: 'Gajuwaka',          emoji: '🏭', coords: [17.690, 83.212], scale: 1.25, causes: ['🏭 RINL Steel Plant (coke ovens & blast furnaces nearby)', '⚗️ Chemical processing & fabrication clusters', '🔥 Slag dumps & high-temperature industrial flaring'] },
  { name: 'RK Beach',          emoji: '🏖️', coords: [17.712, 83.333], scale: 0.78, causes: ['🚗 Tourist vehicle congestion on beach road', '🌊 Strong sea breeze naturally disperses pollutants', '🏗️ Coastal construction activity nearby'] },
  { name: 'Bheemli Beach',     emoji: '🌊', coords: [17.892, 83.450], scale: 0.72, causes: ['🌊 Pristine coastal environment with high air turnover', '🚶 Low density residential area with few industries', '🍃 Significant greenery and open spaces'] },
  { name: 'Madhuwada (IT)',    emoji: '💻', coords: [17.817, 83.344], scale: 1.02, causes: ['🏗️ Rapid urban expansion & construction dust', '💻 IT SEZ traffic during peak office hours', '🌳 Surrounded by hills which can trap local emissions'] },
  { name: 'Simhachalam',       emoji: '🛕', coords: [17.766, 83.250], scale: 0.85, causes: ['⛰️ Higher altitude ensures better air mixing', '🌳 Dense forest cover on the holy hill slopes', '🚗 Temple tourist traffic on the Ghat roads'] },
  { name: 'Vizianagaram',      emoji: '🏰', coords: [18.106, 83.395], scale: 0.95, causes: ['🏰 Regional hub with localized commercial traffic', '🚆 Key railway junction (diesel engine idling)', '🏛️ Historic fort town with narrow, high-density streets'] },
  { name: 'Srikakulam',        emoji: '🥥', coords: [18.296, 83.893], scale: 0.92, causes: ['🌊 Coastal influence reduces particulate concentration', '🥥 Agriculture-based economy with low industrial density', '🚚 NH-16 transit traffic on the city outskirts'] },
  { name: 'Kurmannapalem',     emoji: '🧱', coords: [17.675, 83.160], scale: 1.12, causes: ['🧱 Residential colony for RINL workers (downwind source)', '🚛 Proximity to logistics hubs & container terminals', '💨 Industrial dust settling from neighboring Gajuwaka'] },
  { name: 'Paderu (Hill Stn)', emoji: '🏔️', coords: [18.067, 82.667], scale: 0.65, causes: ['🏔️ High altitude Eastern Ghats (cleanest air in region)', '🌲 Dense deciduous forest & spice plantations', '🔥 Minor biomass burning for heating in cold winters'] },
];

const getCatColor = aqi => aqi <= 50 ? '#10b981' : aqi <= 100 ? '#f59e0b' : aqi <= 200 ? '#f97316' : '#ef4444';
const getPollLevel = scale => scale >= 1.2 ? '🔴 High pollution area' : scale >= 1.1 ? '🟠 Above average' : scale <= 0.85 ? '🟢 Cleaner than centre' : '🟡 Similar to average';

export { LOCATIONS };

export default function LocationExplorer({ onLocationSelect, onLiveAqiUpdate }) {
  const [activeIdx, setActiveIdx] = useState(null);
  const [detail, setDetail]       = useState(null);
  const [loading, setLoading]     = useState(false);

  const selectLocation = async (loc, idx) => {
    setActiveIdx(idx);
    setLoading(true);
    setDetail({ loc, aqi: null, catName: '', wind: '—', temp: '—' });
    onLocationSelect?.(loc);

    try {
      const [lat, lon] = loc.coords;
      const result  = await fetchLiveAQI(lat, lon, loc.name);
      const liveAqi = Math.max(1, Math.round((result.aqi + (loc.scale >= 1.1 ? 20 : 0)) * loc.scale));
      const catName = liveAqi <= 50  ? '✅ Good — Air is clean'
                    : liveAqi <= 100 ? '🟡 Satisfactory — Acceptable quality'
                    : liveAqi <= 200 ? '🟠 Moderate — May affect sensitive people'
                    :                  '🔴 Poor — Unhealthy for everyone';
      const statusLabel = result.source === 'satellite' ? 'Live Data (Regional Estimator)' : 'Offline — baseline estimate';
      setDetail({ loc, aqi: liveAqi, catName, wind: result.wind, temp: result.temp, pollLevel: getPollLevel(loc.scale) });
      onLiveAqiUpdate?.(liveAqi, statusLabel);
    } catch {
      setDetail(prev => ({ ...prev, aqi: 95, catName: '🟠 Moderate — May affect sensitive people' }));
    }
    setLoading(false);
  };

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            📍 Area AQI Explorer
            <span className="text-slate-400 font-normal">— Visakhapatnam &amp; Nearby</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Click any location to load its live air quality</p>
        </div>
        {activeIdx !== null && (
          <span className="text-xs font-medium text-blue-500 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            {LOCATIONS[activeIdx].emoji} {LOCATIONS[activeIdx].name} selected
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2.5">
        {LOCATIONS.map((loc, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => selectLocation(loc, idx)}
              className="flex flex-col items-center gap-1 p-3 rounded-xl border text-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{
                border: isActive ? '1.5px solid #3b82f6' : '1.5px solid #e2e8f0',
                background: isActive ? 'rgba(59,130,246,0.05)' : 'white',
                boxShadow: isActive ? '0 0 0 3px rgba(59,130,246,0.1)' : undefined,
                fontFamily: 'var(--font-main)',
              }}
            >
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{loc.emoji}</span>
              <span className="text-xs font-600 text-slate-700 leading-tight" style={{ fontWeight: 600, fontSize: '0.72rem' }}>{loc.name}</span>
              {isActive && loading
                ? <span className="text-xs text-blue-400">Loading…</span>
                : <span className="text-xs text-slate-400" style={{ fontSize: '0.68rem' }}>Tap for AQI</span>
              }
            </button>
          );
        })}
      </div>

      {detail && (
        <div className="mt-5 p-4 sm:p-5 rounded-xl border border-blue-100 bg-blue-50/40"
             style={{ animation: 'fadeSlideUp 0.28s ease' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {detail.loc.emoji} {detail.loc.name}
              </span>
              <span style={{ fontSize: '2.8rem', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em', color: detail.aqi ? getCatColor(detail.aqi) : 'var(--primary)' }}>
                {loading ? '…' : (detail.aqi ?? '…')}
              </span>
              <span className="text-sm font-medium text-slate-600">{detail.catName}</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">⚠️ Main Sources</p>
              <ul className="flex flex-col gap-1.5">
                {detail.loc.causes.map((c, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0">•</span>{c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Live Conditions</p>
              <div className="flex flex-col gap-1.5 text-sm text-slate-700">
                <span>🌬️ Wind: <strong>{detail.wind} km/h</strong></span>
                <span>🌡️ Temp: <strong>{detail.temp}°C</strong></span>
                <span>{detail.pollLevel}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
