import React, { useEffect, useRef, useState } from 'react';
import { fetchAIInsight } from '../../hooks/useApi';

export function SourceAttribution() {
  const ref      = useRef(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setAnim(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const bars = [
    { label: '🏭 Heavy Industry (RINL / Petroleum)', pct: '38%', color: 'linear-gradient(90deg,#ef4444,#f87171)' },
    { label: '🚗 Traffic & Port Export Operations',  pct: '28%', color: 'linear-gradient(90deg,#f97316,#fb923c)' },
    { label: '🌡️ Coastal Thermal Inversion',         pct: '18%', color: 'linear-gradient(90deg,#eab308,#facc15)' },
    { label: '🔥 Post-Harvest Biomass Burning',      pct: '11%', color: 'linear-gradient(90deg,#8b5cf6,#a78bfa)' },
    { label: '🏗️ Urban Construction Dust',           pct: '5%',  color: 'linear-gradient(90deg,#94a3b8,#cbd5e1)' },
  ];

  return (
    <div className="card p-5" ref={ref}>
      <div className="card-header">
        <span className="card-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v20m-7-7h14m-7-7h14" />
          </svg>
          Pollution Source Attribution
        </span>
        <span className="text-xs text-slate-400 font-medium">Extrapolated</span>
      </div>
      <div className="flex flex-col gap-3.5">
        {bars.map((b, i) => (
          <div key={i}>
            <div className="source-bar-header">
              <span className="text-slate-600">{b.label}</span>
              <span className="font-700 text-slate-800" style={{ fontWeight: 700 }}>{b.pct}</span>
            </div>
            <div className="source-bar-bg">
              <div className="source-bar-fill" style={{ background: b.color, width: anim ? b.pct : '0%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const AI_BUTTONS = [
  { type: 'root_cause', label: '🔍 Root Cause' },
  { type: 'forecast',   label: '📈 Forecast 26–27' },
  { type: 'health',     label: '🫁 Health Impact' },
  { type: 'spikes',     label: '⚡ Spike Events' },
];

export function AIPanel() {
  const [html,    setHtml]    = useState('👇 Click a button above to get a plain-English explanation about Visakhapatnam\'s air quality.');
  const [loading, setLoading] = useState(false);
  const [active,  setActive]  = useState(null);

  const fetchAI = async type => {
    setLoading(true);
    setActive(type);
    setHtml('');
    try {
      const result = await fetchAIInsight(type);
      setHtml(result.html);
    } catch {
      setHtml('Unable to load insight. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="card p-5 flex flex-col gap-4" style={{ border: '1px solid rgba(59,130,246,0.18)', flexGrow: 1 }}>
      <div className="card-header" style={{ marginBottom: 0 }}>
        <span className="card-title">✨ AI Generative Insights</span>
        <span className="text-xs text-slate-400">Powered by contextual analysis</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {AI_BUTTONS.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => fetchAI(type)}
            className="btn transition-all duration-200"
            style={active === type && !loading
              ? { background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)', boxShadow: '0 2px 8px rgba(59,130,246,0.28)' }
              : undefined
            }
          >
            {label}
          </button>
        ))}
      </div>
      <div className="ai-response flex-1">
        {loading ? (
          <span className="loading">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin">
              <circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Thinking…
          </span>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </div>
    </div>
  );
}
