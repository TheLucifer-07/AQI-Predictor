import React from 'react';

const getCatColor = aqi => aqi <= 50 ? '#10b981' : aqi <= 100 ? '#f59e0b' : aqi <= 200 ? '#f97316' : '#ef4444';

const EXPLAIN = {
  '🏭 RINL steel flaring':          'RINL steel plant released excess gases into the air (a process called "flaring"), which creates thick smoke and particles.',
  '🌡️ Temperature inversion':       'Warm air trapped cold polluted air close to the ground — like a lid on a pot — preventing it from dispersing.',
  '🔥 Paddy stubble burning':        'Farmers in the region burned leftover crop stalks after harvest, releasing large amounts of smoke and ash.',
  '📉 Post-COVID rebound':           'After COVID lockdowns ended, factories restarted all at once, releasing pollution that had been pent up for months.',
  '🏭 HPCL refinery':               'Hindustan Petroleum refinery operations released hydrocarbon vapours and sulfur compounds into the atmosphere.',
  '🌡️ Winter Temperature Inversion': 'Warm air trapped cold polluted air close to the ground — like a lid on a pot — preventing it from dispersing.',
  '🏭 Sustained Industrial Plumes':  'Continuous heavy industrial output from RINL and HPCL created sustained pollution plumes over the city.',
  '🔥 Post-Monsoon Biomass Burning': 'Farmers burned leftover crop stalks after the monsoon harvest, releasing large amounts of smoke and ash.',
  '💨 Stagnant Wind Speeds':         'Very low wind speeds meant pollutants could not disperse and accumulated near the ground.',
};

export default function SpikeEvents({ events, annualStats }) {
  if (!events) return null;

  return (
    <div className="card overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        <span className="card-title">📅 Historical High-AQI Days (≥200) — Why They Happened</span>
        <span className="text-xs text-slate-400 font-medium">Top 10 worst days · ranked by AQI</span>
      </div>
      <div className="p-5">
        <div className="spike-list">
          {events.map((s, i) => {
            const year       = s.date.split('-')[0];
            const annualData = annualStats?.find(a => a.year == year);
            const yearNote   = annualData ? `That year's average AQI was ${annualData.mean} — this spike pushed it far higher.` : '';

            return (
              <div key={i} className="spike-item">
                <div className="spike-head">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span className="text-slate-400 font-mono text-xs">{i + 1}.</span>
                    📅 {s.date}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                        style={{ background: `${getCatColor(s.aqi)}18`, color: getCatColor(s.aqi), border: `1px solid ${getCatColor(s.aqi)}40` }}>
                    AQI {s.aqi}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1.5 mb-3 leading-relaxed">
                  PM2.5 reached{' '}
                  <strong className="text-slate-800">{s.pm25} µg/m³</strong>
                  {' '}— <strong>{Math.round(s.pm25 / 25)}× the WHO safe daily limit</strong>.{' '}
                  {yearNote}
                </p>
                <div className="flex flex-col gap-2">
                  {s.causes.map((c, j) => (
                    <div key={j} className="rounded-lg p-3 border-l-2"
                         style={{ background: '#fafafa', borderLeftColor: '#f97316', border: '1px solid #f1f5f9', borderLeft: '2px solid #f97316' }}>
                      <p className="text-xs font-semibold text-slate-700 mb-0.5">{c}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{EXPLAIN[c] || 'A local pollution event contributed to this spike.'}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
