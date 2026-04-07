import React, { useState, useEffect } from 'react';
import CodeModal from '../components/aqi/CodeModal';
import KPICards from '../components/aqi/KPICards';
import LocationExplorer from '../components/aqi/LocationExplorer';
import MapCard from '../components/aqi/MapCard';
import { SourceAttribution, AIPanel } from '../components/aqi/SidePanel';
import { TrendChart, PredictionChart, AnnualChart, StackedChart, PollutantChart } from '../components/aqi/Charts';
import ModisAodChart from '../components/aqi/ModisAodChart';
import SpikeEvents from '../components/aqi/SpikeEvents';
import { useMLData } from '../hooks/useApi';

function SectionHeading({ icon, title, id }) {
  return (
    <div id={id} className="section-heading">
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  );
}

export default function PredictionPage() {
  const data = useMLData();
  const [codeOpen, setCodeOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [liveAqi, setLiveAqi] = useState(null);
  const [liveLocText, setLiveLocText] = useState('Loading…');
  const [liveLocDesc, setLiveLocDesc] = useState('Fetching from APPCB ground station…');

  /* Scroll-reveal for cards */
  useEffect(() => {
    if (!data) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      }),
      { threshold: 0.08 }
    );
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.5s ease ${i * 0.04}s, transform 0.5s ease ${i * 0.04}s, box-shadow 0.2s ease`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, [data]);

  /* Ambient cursor glow */
  useEffect(() => {
    const glow = document.createElement('div');
    glow.style.cssText = 'position:fixed;pointer-events:none;width:480px;height:480px;background:radial-gradient(circle,rgba(59,130,246,0.07) 0%,transparent 68%);border-radius:50%;z-index:0;opacity:0;top:0;left:0;transition:opacity 0.4s;will-change:transform;';
    document.body.appendChild(glow);
    const onMove = e => {
      glow.style.transform = `translate(${e.clientX - 240}px,${e.clientY - 240}px)`;
      glow.style.opacity = '1';
    };
    document.addEventListener('mousemove', onMove);
    return () => { document.removeEventListener('mousemove', onMove); glow.remove(); };
  }, []);

  const handleLocationSelect = loc => {
    setSelectedLocation(loc);
    setLiveLocText(`${loc.emoji} ${loc.name}`);
    setLiveLocDesc('Loading live data…');
  };

  const handleLiveAqiUpdate = (aqi, desc) => {
    setLiveAqi(aqi);
    setLiveLocDesc(desc);
  };

  return (
    <div className="min-h-screen pt-14">
      <CodeModal open={codeOpen} onClose={() => setCodeOpen(false)} />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

        <KPICards
          data={data}
          liveAqi={liveAqi}
          liveLocText={liveLocText}
          liveLocDesc={liveLocDesc}
          onViewCode={() => setCodeOpen(true)}
          accuracy={data?.metrics?.accuracy}
        />

        <LocationExplorer
          onLocationSelect={handleLocationSelect}
          onLiveAqiUpdate={handleLiveAqiUpdate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MapCard selectedLocation={selectedLocation} />
          <div className="flex flex-col gap-6">
            <SourceAttribution />
            <AIPanel />
          </div>
        </div>

        <SectionHeading icon="📈" title="Temporal AQI Analysis" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart data={data?.monthly_trend} />
          <PredictionChart data={data?.future_preds} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnnualChart data={data?.annual_avg_chart} />
          <StackedChart data={data?.stacked_dist} />
          <PollutantChart data={data?.pollutant_recent} />
        </div>

        <SectionHeading id="modis-section" icon="🛰️" title="NASA MODIS Aerosol Optical Depth (AOD) — Visakhapatnam Region (2019–2025)" />
        <ModisAodChart />

        <SectionHeading icon="⚡" title="Top AQI Spike Events — Root Cause Analysis" />
        <SpikeEvents events={data?.spike_events} annualStats={data?.annual_stats} />

      </main>
    </div>
  );
}
