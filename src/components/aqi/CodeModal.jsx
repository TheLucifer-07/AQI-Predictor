import React, { useEffect } from 'react';

const PYTHON_CODE = `import json, math, random
from datetime import date, timedelta
import xgboost as xgb
from sklearn.metrics import classification_report as sk_classification_report
from sklearn.metrics import confusion_matrix, accuracy_score

start_date = date(2019, 1, 1)
end_date   = date(2026, 3, 27)
days       = (end_date - start_date).days + 1

data = []
for i in range(days):
    d = start_date + timedelta(days=i)
    year, month, day = d.year, d.month, d.day
    is_winter     = 1 if month in [11, 12, 1, 2] else 0
    season_factor = math.cos((month - 1) / 12 * 2 * math.pi - math.pi/6)
    covid_factor  = 0.5 if (year == 2020 and 3 <= month <= 10) else 1.0
    base_pm25     = (40 + season_factor * 30) * covid_factor
    pm25  = max(5, base_pm25 + random.gauss(0, 15))
    pm10  = pm25 * random.uniform(1.5, 2.5)
    no2   = (15 + season_factor * 10) * covid_factor + random.gauss(0, 5)
    so2   = 10 + random.gauss(0, 3)
    co    = 0.5 + season_factor * 0.3 + random.gauss(0, 0.2)
    ozone = 30 - season_factor * 10 + random.gauss(0, 5)
    nh3   = 5 + random.gauss(0, 2)
    at    = 28 - season_factor * 8 + random.gauss(0, 2)
    rh    = 65 + season_factor * 10 + random.gauss(0, 5)
    ws    = 5 - season_factor * 2 + random.gauss(0, 1)
    rf    = max(0, random.gauss(-5, 10)) if month in [6,7,8,9,10] else max(0, random.gauss(-10, 5))
    pm_ratio = pm25 / pm10 if pm10 > 0 else 0
    aqi   = int(pm25 * random.uniform(2.5, 3.5))
    if aqi < 0: aqi = 10
    causes = []
    if year == 2019 and month == 1 and day == 15:
        aqi = 365; pm25 = 145
        causes = ["RINL steel flaring", "Temperature inversion"]
    elif year == 2020 and month == 10 and day == 28:
        aqi = 346; pm25 = 138
        causes = ["Paddy stubble burning", "Post-COVID rebound"]
    category = 0
    if aqi > 50:  category = 1
    if aqi > 100: category = 2
    if aqi > 200: category = 3
    data.append({'ds': d.strftime("%Y-%m-%d"), 'year': year, 'month': month, 'day': day,
        'pm25': pm25, 'pm10': pm10, 'no2': no2, 'so2': so2, 'co': co,
        'ozone': ozone, 'nh3': nh3, 'at': at, 'rh': rh, 'ws': ws, 'rf': rf,
        'is_winter': is_winter, 'pm_ratio': pm_ratio,
        'month_sin': math.sin(2 * math.pi * month / 12),
        'month_cos': math.cos(2 * math.pi * month / 12),
        'aqi': aqi, 'category': category, 'causes': causes})

features = ['pm25','pm10','no2','so2','co','ozone','nh3','at','rh','ws','rf',
            'is_winter','pm_ratio','month_sin','month_cos','pm25_lag1','pm25_roll7']

split_idx = int(len(data) * 0.8)
X_train = [[d[f] for f in features] for d in data[:split_idx]]
y_train = [d['category'] for d in data[:split_idx]]
X_test  = [[d[f] for f in features] for d in data[split_idx:]]
y_test  = [d['category'] for d in data[split_idx:]]

ensemble = xgb.XGBClassifier(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
ensemble.fit(X_train, y_train)
y_pred   = ensemble.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.1f}%")

with open('data.json', 'w') as f: json.dump(output_json, f)
print("Data written to data.json")
`;

export default function CodeModal({ open, onClose }) {
  useEffect(() => {
    if (open && window.hljs) setTimeout(() => window.hljs.highlightAll(), 80);
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal open" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
            </div>
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              🐍 Python ML Source Code
              <span className="text-xs font-normal text-slate-400 bg-slate-700 px-2.5 py-0.5 rounded-full">
                XGBoost · Scikit-Learn
              </span>
            </h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="code-container">
          <pre className="p-4 text-sm leading-relaxed">
            <code className="language-python">{PYTHON_CODE}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
