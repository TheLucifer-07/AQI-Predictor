/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { staggerContainer, staggerFlip, hoverLift, tapPress, fadeUp, viewport } from '../../animations/variants';

export default function KPICards({ data, liveAqi, liveLocText, liveLocDesc, onViewCode, accuracy }) {
  if (!data) return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="card p-5 animate-pulse">
          <div className="h-3 bg-slate-100 rounded w-2/3 mb-3" />
          <div className="h-8 bg-slate-100 rounded w-1/2 mb-2" />
          <div className="h-3 bg-slate-100 rounded w-full" />
        </div>
      ))}
    </div>
  );

  const { worst_year, best_year, mean_overall, sd_overall, total_spikes, annual_stats } = data;
  const wy = annual_stats.find(d => d.year === worst_year);
  const by = annual_stats.find(d => d.year === best_year);
  const catStr  = mean_overall <= 100 ? 'Satisfactory (51–100)' : 'Moderate (101–200)';
  const catStr2 = mean_overall <= 100 ? '"Satisfactory"' : '"Moderate"';

  return (
    <div className="flex flex-col gap-4">

      {/* Sub-header */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-3 px-1"
        variants={fadeUp} initial="hidden" animate="visible"
      >
        <div>
          <h2 className="text-lg font-bold text-slate-800">🏭 Visakhapatnam AQI Intelligence Dashboard</h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time air quality monitoring · 2019–2025</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button onClick={onViewCode} className="badge badge-btn"
            whileHover={{ y: -1, transition: { duration: 0.15 } }} whileTap={tapPress}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="hidden sm:inline">View ML Source</span>
            <span className="sm:hidden">Code</span>
          </motion.button>
          {accuracy && <span className="badge badge-acc hidden md:inline-flex">🚀 XGBoost Acc: {accuracy}%</span>}
          <span className="badge badge-live">
            <span className="blink" style={{ width: 7, height: 7, background: '#fca5a5', boxShadow: '0 0 6px #fca5a5' }} />
            Live
          </span>
        </div>
      </motion.div>

      {/* KPI grid — stagger flip entry */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        variants={staggerContainer} initial="hidden" animate="visible"
        style={{ perspective: 1000 }}
      >
        {/* Live AQI Hero */}
        <motion.div
          className="card kpi-hero p-5 flex flex-col justify-between gap-3 sm:col-span-2 lg:col-span-1"
          style={{ minHeight: 180 }}
          variants={staggerFlip}
          whileHover={hoverLift}
        >
          <div className="kpi-label" style={{ color: '#64748b' }}>📡 Live AQI</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'white', display: 'flex', alignItems: 'center', gap: 10 }}>
            <AnimatePresence mode="wait">
              {liveAqi ? (
                <motion.span key={liveAqi}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}>
                  {liveAqi}
                </motion.span>
              ) : (
                <motion.svg key="spin" className="spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 10 10" />
                </motion.svg>
              )}
            </AnimatePresence>
            {liveAqi && (
              <span style={{
                width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginBottom: 2,
                background: liveAqi <= 50 ? '#10b981' : liveAqi <= 100 ? '#f59e0b' : liveAqi <= 200 ? '#f97316' : '#ef4444',
                boxShadow: `0 0 8px ${liveAqi <= 50 ? '#10b981' : liveAqi <= 100 ? '#f59e0b' : liveAqi <= 200 ? '#f97316' : '#ef4444'}`,
              }} />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5" style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ color: '#cbd5e1' }} className="truncate">{liveLocText || 'Loading…'}</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#93c5fd', background: 'rgba(59,130,246,0.1)', padding: '4px 8px', borderRadius: 5, borderLeft: '2px solid #3b82f6', lineHeight: 1.45 }}
              dangerouslySetInnerHTML={{ __html: liveLocDesc || 'Fetching…' }} />
          </div>
        </motion.div>

        <KpiCard label="Worst Year" value={worst_year}
          sub={<span style={{ color: 'var(--poor)' }}>↑ Highest annual mean</span>}
          tooltip={<>
            <div className="kpi-tip-title">🏭 Why was {worst_year} the worst?</div>
            {wy && <><div className="kpi-tip-row"><span>Mean AQI</span><span>{wy.mean} (highest)</span></div>
              <div className="kpi-tip-row"><span>Max AQI</span><span>{wy.max}</span></div>
              <div className="kpi-tip-row"><span>Spikes ≥200</span><span>{wy.spikes} days</span></div></>}
            <div className="kpi-tip-reason">Severe industrial emissions and winter inversions trapped heavy particulate matter, driving the annual mean to its peak.</div>
          </>}
        />
        <KpiCard label="Best Year" value={best_year}
          sub={<span style={{ color: 'var(--good)' }}>↓ Cleanest period on record</span>}
          tooltip={<>
            <div className="kpi-tip-title">🌧️ Why was {best_year} the best?</div>
            {by && <><div className="kpi-tip-row"><span>Mean AQI</span><span>{by.mean} (lowest)</span></div>
              <div className="kpi-tip-row"><span>Min Monthly</span><span>{by.min}</span></div>
              <div className="kpi-tip-row"><span>Spikes ≥200</span><span>{by.spikes} days (fewest)</span></div></>}
            <div className="kpi-tip-reason">Strong monsoon rain-wash, favorable dispersion winds, and fewer extreme industrial inversion events.</div>
          </>}
        />
        <KpiCard label="6-Year Avg AQI" value={mean_overall}
          sub={<span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>SD ±{sd_overall} · 2019–2024</span>}
          tooltip={<>
            <div className="kpi-tip-title">📊 What does this average mean?</div>
            <div className="kpi-tip-row"><span>Period</span><span>2019–2024</span></div>
            <div className="kpi-tip-row"><span>Scale</span><span>India CPCB AQI</span></div>
            <div className="kpi-tip-row"><span>Category</span><span>{catStr}</span></div>
            <div className="kpi-tip-reason">On a typical day the AQI is around <strong>{mean_overall}</strong>, falling in the {catStr2} category — sensitive groups may feel discomfort.</div>
          </>}
        />
        <KpiCard label="Unhealthy Days" value={total_spikes}
          sub={<span style={{ color: 'var(--poor)' }}>~{Math.round(total_spikes / 6)}/yr · AQI &gt;200</span>}
          tooltip={<>
            <div className="kpi-tip-title">🤔 What are these {total_spikes} days?</div>
            <div className="kpi-tip-row"><span>Period</span><span>2019–2024</span></div>
            <div className="kpi-tip-row"><span>Threshold</span><span>AQI above 200</span></div>
            <div className="kpi-tip-row"><span>Total</span><span>{total_spikes} of ~2,190 days</span></div>
            <div className="kpi-tip-reason">Days where air quality became "Poor" — harmful to everyone, not just sensitive groups.</div>
          </>}
        />
      </motion.div>
    </div>
  );
}

function KpiCard({ label, value, sub, tooltip }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords]   = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);

  const handleMouseEnter = () => {
    const rect = btnRef.current.getBoundingClientRect();
    setCoords({ top: rect.bottom + window.scrollY + 10, left: rect.left + window.scrollX + rect.width / 2 });
    setVisible(true);
  };

  return (
    <motion.div
      className="card p-5 flex flex-col justify-between gap-2"
      style={{ minHeight: 140 }}
      variants={staggerFlip}
      whileHover={hoverLift}
    >
      <div className="kpi-label">{label}</div>
      <div className="kpi-val flex items-center gap-2">
        <span>{value}</span>
        <span ref={btnRef} className="kpi-info-btn"
          onMouseEnter={handleMouseEnter} onMouseLeave={() => setVisible(false)}>?</span>
      </div>
      <div style={{ fontSize: '0.78rem', fontWeight: 500, marginTop: 2 }}>{sub}</div>

      {visible && createPortal(
        <motion.div
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15, ease: [0.0, 0.0, 0.2, 1.0] }}
          style={{
            position: 'absolute', top: coords.top, left: coords.left,
            transform: 'translateX(-50%)', background: '#0f172a', color: 'white',
            padding: '14px 16px', borderRadius: 12, width: 280, zIndex: 99999,
            boxShadow: '0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
            border: '1px solid #334155', fontSize: '0.8125rem', lineHeight: 1.6, pointerEvents: 'auto',
          }}
        >
          <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)',
            borderWidth: 6, borderStyle: 'solid', borderColor: 'transparent transparent #0f172a transparent' }} />
          {tooltip}
        </motion.div>,
        document.body
      )}
    </motion.div>
  );
}
