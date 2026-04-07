import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeModal from '../components/aqi/CodeModal';
import KPICards from '../components/aqi/KPICards';
import LocationExplorer from '../components/aqi/LocationExplorer';
import MapCard from '../components/aqi/MapCard';
import { SourceAttribution, AIPanel } from '../components/aqi/SidePanel';
import { TrendChart, PredictionChart, AnnualChart, StackedChart, PollutantChart } from '../components/aqi/Charts';
import ModisAodChart from '../components/aqi/ModisAodChart';
import SpikeEvents from '../components/aqi/SpikeEvents';
import { useMLData } from '../hooks/useApi';
import { fadeUp, staggerContainer, staggerItem, scaleIn, viewport } from '../animations/variants';

function SectionHeading({ icon, title, id }) {
  return (
    <motion.div
      id={id}
      className="section-heading"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </motion.div>
  );
}

export default function PredictionPage() {
  const data = useMLData();
  const [codeOpen, setCodeOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [liveAqi, setLiveAqi] = useState(null);
  const [liveLocText, setLiveLocText] = useState('Loading…');
  const [liveLocDesc, setLiveLocDesc] = useState('Fetching from APPCB ground station…');

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
    <motion.div
      className="min-h-screen pt-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <CodeModal open={codeOpen} onClose={() => setCodeOpen(false)} />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

        {/* KPI Cards — stagger on load */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <KPICards
            data={data}
            liveAqi={liveAqi}
            liveLocText={liveLocText}
            liveLocDesc={liveLocDesc}
            onViewCode={() => setCodeOpen(true)}
            accuracy={data?.metrics?.accuracy}
          />
        </motion.div>

        {/* Location Explorer */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <LocationExplorer
            onLocationSelect={handleLocationSelect}
            onLiveAqiUpdate={handleLiveAqiUpdate}
          />
        </motion.div>

        {/* Map + Side Panel */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={staggerItem}>
            <MapCard selectedLocation={selectedLocation} />
          </motion.div>
          <motion.div className="flex flex-col gap-6" variants={staggerItem}>
            <SourceAttribution />
            <AIPanel />
          </motion.div>
        </motion.div>

        {/* Temporal Analysis */}
        <SectionHeading icon="📈" title="Temporal AQI Analysis" />
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={staggerItem}><TrendChart data={data?.monthly_trend} /></motion.div>
          <motion.div variants={staggerItem}><PredictionChart data={data?.future_preds} /></motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.div variants={staggerItem}><AnnualChart data={data?.annual_avg_chart} /></motion.div>
          <motion.div variants={staggerItem}><StackedChart data={data?.stacked_dist} /></motion.div>
          <motion.div variants={staggerItem}><PollutantChart data={data?.pollutant_recent} /></motion.div>
        </motion.div>

        {/* MODIS AOD */}
        <SectionHeading id="modis-section" icon="🛰️" title="NASA MODIS Aerosol Optical Depth (AOD) — Visakhapatnam Region (2019–2025)" />
        <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewport}>
          <ModisAodChart />
        </motion.div>

        {/* Spike Events */}
        <SectionHeading icon="⚡" title="Top AQI Spike Events — Root Cause Analysis" />
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <SpikeEvents events={data?.spike_events} annualStats={data?.annual_stats} />
        </motion.div>

      </main>
    </motion.div>
  );
}
