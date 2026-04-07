import React, { useState, useEffect } from 'react';

export default function TopBar({ accuracy, onViewCode }) {
  const [scrolled, setScrolled] = useState(false);
  const [clock, setClock] = useState({ date: '', time: '' });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock({
        date: now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearInterval(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <header className={`top-bar${scrolled ? ' scrolled' : ''}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-4"
           style={{ paddingTop: scrolled ? 10 : 14, paddingBottom: scrolled ? 10 : 14, transition: 'padding 0.35s cubic-bezier(0.16,1,0.3,1)' }}>

        <div className="flex items-center gap-3 min-w-0">
          <h1 className="title-gradient text-sm sm:text-base font-bold truncate" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)' }}>
            🏭 Visakhapatnam AQI Intelligence Dashboard
          </h1>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 flex-shrink-0"
               style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94a3b8' }}>
            <span className="blink" style={{ width: 6, height: 6, background: '#34d399', boxShadow: '0 0 6px #34d399' }} />
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{clock.date}</span>
            <span style={{ color: '#64748b' }}>{clock.time}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="badge badge-btn" onClick={onViewCode}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="hidden sm:inline">View ML Source</span>
            <span className="sm:hidden">Code</span>
          </button>
          <span className="badge badge-acc hidden md:inline-flex">
            🚀 <span className="hidden lg:inline">XGBoost Acc: </span>{accuracy}%
          </span>
          <span className="badge badge-live">
            <span className="blink" style={{ width: 7, height: 7, background: '#fca5a5', boxShadow: '0 0 6px #fca5a5' }} />
            Live
          </span>
        </div>
      </div>
    </header>
  );
}
