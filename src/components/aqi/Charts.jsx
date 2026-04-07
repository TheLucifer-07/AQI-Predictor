import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

const getCatColor = aqi => aqi <= 50 ? '#10b981' : aqi <= 100 ? '#f59e0b' : aqi <= 200 ? '#f97316' : '#ef4444';
const catColors   = ['#10b981', '#f59e0b', '#f97316', '#ef4444'];
const catLabels   = ['Good (0–50)', 'Satisf (51–100)', 'Mod (101–200)', 'Poor+ (>200)'];

const baseOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
};

export function TrendChart({ data }) {
  const canvasRef  = useRef(null);
  const chartRef   = useRef(null);
  const [activeYear, setActiveYear] = useState('All');

  const render = slice => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: slice.map(d => d.label),
        datasets: [{ label: 'Avg AQI', data: slice.map(d => d.avg_aqi), backgroundColor: slice.map(d => getCatColor(d.avg_aqi)), borderRadius: 5, borderSkipped: false }],
      },
      options: { ...baseOpts, scales: { x: { grid: { display: false } }, y: { grid: { color: '#f1f5f9' } } } },
    });
  };

  useEffect(() => {
    if (!data) return;
    const slice = activeYear === 'All' ? data : data.filter(d => d.year === parseInt(activeYear));
    render(slice);
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [data, activeYear]);

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        <span className="card-title">Monthly AQI Trend (2019–2024)</span>
        <div className="tabs">
          {['All', '2021', '2022', '2023', '2024'].map(y => (
            <span key={y} className={`tab${activeYear === y ? ' active' : ''}`} onClick={() => setActiveYear(y)}>
              {y === 'All' ? 'All' : `'${y.slice(2)}`}
            </span>
          ))}
        </div>
      </div>
      <div className="p-5" style={{ height: 288 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export function PredictionChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    if (!data) return;
    const pData = data.filter(d => d.year === year);
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: pData.map(d => d.month_name),
        datasets: [{
          label: `Predicted AQI ${year}`,
          data: pData.map(d => d.aqi),
          borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)',
          fill: true, tension: 0.4, borderWidth: 2.5,
          pointRadius: 4, pointBackgroundColor: '#fff', pointBorderColor: '#10b981', pointBorderWidth: 2,
        }],
      },
      options: { ...baseOpts, scales: { y: { beginAtZero: true, grid: { color: '#f1f5f9' } }, x: { grid: { display: false } } } },
    });
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [data, year]);

  const pData = data ? data.filter(d => d.year === year) : [];

  return (
    <div className="card flex flex-col overflow-hidden" style={{ background: 'linear-gradient(to bottom,#fff,#f0fdf4)', border: '1px solid #bbf7d0' }}>
      <div className="px-5 pt-5 pb-3 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100">
        <span className="card-title" style={{ color: '#15803d' }}>🔮 Future Prediction Ensemble</span>
        <div className="tabs">
          {[2026, 2027, 2028].map(y => (
            <span key={y} className={`tab${year === y ? ' active' : ''}`} onClick={() => setYear(y)}>{y}</span>
          ))}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <div className="pred-grid">
          {pData.map((d, i) => (
            <div key={i} className="pred-card">
              <div className="pred-month">{d.month_name}</div>
              <div className="pred-aqi" style={{ color: getCatColor(d.aqi) }}>{d.aqi}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <span className="cat-dot" style={{ background: getCatColor(d.aqi) }} />{d.category}
              </div>
              <div style={{ fontSize: '0.65rem', marginTop: 4, background: '#f1f5f9', borderRadius: 4, padding: '2px 4px' }}>
                🎯 {d.confidence}%
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 148 }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}

export function AnnualChart({ data }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!data) return;
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map(d => d.year),
        datasets: [{ label: 'Mean AQI', data: data.map(d => d.avg), backgroundColor: data.map(d => getCatColor(d.avg)), borderRadius: 6, borderSkipped: false }],
      },
      options: { ...baseOpts, scales: { x: { grid: { display: false } }, y: { grid: { color: '#f1f5f9' } } } },
    });
    return () => chart.destroy();
  }, [data]);

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-slate-100">
        <span className="card-title">Annual Averaged AQI</span>
      </div>
      <div className="p-5" style={{ height: 264 }}>
        <canvas ref={canvasRef} />
      </div>
      <div className="px-5 pb-4 text-xs text-slate-400 text-center font-medium">
        * 2020 dip reflects COVID-19 lockdown period
      </div>
    </div>
  );
}

export function StackedChart({ data }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!data) return;
    const years = Object.keys(data);
    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: years,
        datasets: catLabels.map((label, i) => ({
          label, data: years.map(y => data[y][i]),
          backgroundColor: catColors[i], borderRadius: 3, borderSkipped: false,
        })),
      },
      options: {
        ...baseOpts,
        plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 10, padding: 12, font: { size: 11 } } } },
        scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, grid: { color: '#f1f5f9' } } },
      },
    });
    return () => chart.destroy();
  }, [data]);

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-slate-100">
        <span className="card-title">Category Distribution / Year</span>
      </div>
      <div className="p-5" style={{ height: 264 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}

export function PollutantChart({ data }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!data) return;
    const chart = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: ['PM2.5', 'PM10', 'NO2', 'SO2'],
        datasets: [{
          label: 'Recent Avg µg/m³',
          data: [data['PM2.5'], data['PM10'], data['NO2'], data['SO2']],
          backgroundColor: 'rgba(59,130,246,0.12)', borderColor: '#3b82f6',
          pointBackgroundColor: '#3b82f6', pointBorderColor: '#fff', pointBorderWidth: 2, borderWidth: 2,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 10, padding: 12, font: { size: 11 } } } },
        scales: { r: { grid: { color: '#f1f5f9' }, ticks: { display: false } } },
      },
    });
    return () => chart.destroy();
  }, [data]);

  return (
    <div className="card flex flex-col overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-slate-100">
        <span className="card-title">Pollutants — Recent Avg µg/m³</span>
      </div>
      <div className="p-5" style={{ height: 264 }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
