
<div align="center">

# 🌍 AQI PREDICTOR
## <span style="color: #10b981">Real-Time Air Quality Intelligence Platform</span>

<img src="https://img.shields.io/badge/Status-🚀%20Active%20Development-10b981?style=for-the-badge" />
<img src="https://img.shields.io/badge/AI--Powered-ML%20Forecasting-f59e0b?style=for-the-badge" />
<img src="https://img.shields.io/badge/Platform-Full%20Stack-3b82f6?style=for-the-badge" />

> 🌱 **Predict tomorrow's air quality today**  
> Using advanced ML models, satellite data, and real-time APIs to protect communities from air pollution

[🌐 Live Demo](#-quick-demo) • [📊 Dashboard](#-features) • [🚀 Get Started](#-installation) • [🤖 How It Works](#-how-it-works)

</div>

---

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 10px; color: white; margin: 30px 0;">

## 🎯 <span style="color: #ffeb3b">What is AQI Predictor?</span>

Air pollution kills **7 million people yearly** and affects billions more. AQI Predictor fights back with:

✨ **AI-Powered Forecasting** — Predict AQI days in advance  
🛰️ **Satellite Integration** — MODIS AOD + ground sensors  
📊 **Interactive Dashboards** — Beautiful real-time visualizations  
📍 **Location Analysis** — 25+ cities across Visakhapatnam region  
💬 **Smart Insights** — Context-aware health advisories  
⚡ **Performance** — Lightning-fast, responsive UI

</div>

---

## 🌟 <span style="color: #f97316">Key Features</span>

<table>
<tr>
<td align="center" width="33%">

### 🔮 <span style="color: #8b5cf6">Smart Predictions</span>

Forecast AQI using trained LSTM & ML models
- Multi-step ahead forecasting
- Confidence intervals
- Historical accuracy tracking

</td>
<td align="center" width="33%">

### 📡 <span style="color: #06b6d4">Live Monitoring</span>

Real-time air quality updates
- 25+ monitored locations
- 5-minute refresh rate
- Multi-parameter tracking

</td>
<td align="center" width="33%">

### 📊 <span style="color: #10b981">Rich Analytics</span>

Interactive data visualization
- Trend analysis
- Comparative charts
- Export capabilities

</td>
</tr>
</table>

<table>
<tr>
<td align="center" width="33%">

### 📍 <span style="color: #ef4444">Location Explorer</span>

Analyze air quality by region
- Urban vs Industrial hotspots
- Coastal vs Rural areas
- Pollution trend maps

</td>
<td align="center" width="33%">

### 🧬 <span style="color: #ec4899">Pollutant Breakdown</span>

Deep-dive into Air Pollutants
- PM2.5, PM10 levels
- NO₂, SO₂, O₃, CO analysis
- Source identification

</td>
<td align="center" width="33%">

### 💬 <span style="color: #f59e0b">AI Insights</span>

Intelligent Explanations
- Health impact advisories
- Pollution cause analysis
- Preventive measures

</td>
</tr>
</table>

---

## 📊 <span style="color: #3b82f6">Air Quality Parameters</span>

| <span style="color: #8b5cf6">**Parameter**</span> | <span style="color: #f97316">**Description**</span> | <span style="color: #10b981">**Health Impact**</span> | <span style="color: #06b6d4">**Scale**</span> |
|---|---|---|---|
| 🎯 **AQI** | Air Quality Index | Overall health guidance | 0-500+ |
| 💨 **PM2.5** | Fine particles (≤2.5μm) | 🔴 Lung penetration | 0-500 μg/m³ |
| 🌫️ **PM10** | Coarse particles (≤10μm) | 🟠 Upper airway | 0-500 μg/m³ |
| ⚪ **NO₂** | Nitrogen Dioxide | Traffic emissions | 0-200 ppb |
| 🟡 **SO₂** | Sulfur Dioxide | Industrial smoke | 0-350 ppb |
| 🔵 **O₃** | Ozone | Breathing difficulty | 0-150 ppb |
| ⬛ **CO** | Carbon Monoxide | Vehicle exhaust | 0-10 ppm |
| 📡 **AOD** | Aerosol Optical Depth | Dust/haze indicator | 0-5 |
| 💧 **RH** | Relative Humidity | Weather influence | 0-100% |

---

## 🛠️ <span style="color: #f59e0b">Tech Stack</span>

<div align="center">

### 🎨 <span style="color: #3b82f6">Frontend</span>
```
React 18 · Vite 5 · Tailwind CSS 3
Framer Motion · Chart.js · Mapbox GL
```

### ⚙️ <span style="color: #10b981">Backend</span>
```
Node.js 20 · Express.js 4
REST APIs · CORS · Error Handling
```

### 🤖 <span style="color: #8b5cf6">Machine Learning</span>
```
Python 3.10 · Scikit-learn · TensorFlow
LSTM Networks · Time-series Forecasting
```

### ☁️ <span style="color: #f97316">Deployment</span>
```
Vercel (Frontend) · Render (Backend)
GitHub Actions · CI/CD Pipeline
```

</div>

---

## 🧩 <span style="color: #ec4899">System Architecture</span>

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃           🌐 AQI PREDICTOR PLATFORM                  ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│                                                       │
│  ┌─────────────────────┐    ┌──────────────────────┐ │
│  │  React Web App      │    │  Mobile Responsive   │ │
│  │  Vite + Tailwind    │    │  Dark/Light Mode     │ │
│  └─────────┬───────────┘    └──────────────────────┘ │
│            │                                         │
│            ▼                                         │
│  ┌────────────────────────────────────────┐        │
│  │    Express.js REST API Gateway        │        │
│  │    • Authentication · Rate Limit      │        │
│  │    • CORS · Data Validation           │        │
│  └─────┬──────────────────────────────┬──┘        │
│        │                              │           │
│   ┌────▼─────┐            ┌──────────▼────┐      │
│   │  ML Core │            │ Data Pipeline  │      │
│   │ (Python) │            │ (CSV/API Feed) │      │
│   └────┬─────┘            └──────────┬─────┘      │
│        │                             │           │
│   ┌────▼─────────────────────────────▼────┐      │
│   │    External Data Sources               │      │
│   │  🛰️  MODIS · OpenWeather · WAQI      │      │
│   │  📍 Ground Sensors · APPCB Data       │      │
│   └───────────────────────────────────────┘      │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 🎯 <span style="color: #10b981">How It Works</span>

```
1️⃣ DATA COLLECTION
   ↓ Gathers real-time AQI from 25+ locations
   ↓ Satellite imagery · Ground sensors · APIs
   
2️⃣ FEATURE ENGINEERING  
   ↓ Extracts 15+ features from raw data
   ↓ Temporal patterns · Emission sources · Weather
   
3️⃣ ML PREDICTION
   ↓ LSTM networks predict 5-day AQI trend
   ↓ Confidence intervals · Model uncertainty
   
4️⃣ VISUALIZATION
   ↓ Interactive dashboards · Real-time charts
   ↓ Health advisories · Trend analysis
   
5️⃣ AI INSIGHTS
   ↓ NLP-generated explanations
   ↓ Pollution causes · Prevention measures
```

---

## 🚀 <span style="color: #f59e0b">Installation</span>

### 📋 Prerequisites
- **Node.js** v18+ ([Install](https://nodejs.org))
- **Python** 3.10+ ([Install](https://python.org))
- **Git** ([Install](https://git-scm.com))

### 💾 Clone & Setup

```bash
# 1️⃣ Clone repository
git clone https://github.com/TheLucifer-07/AQI-Predictor
cd AQI-Predictor

# 2️⃣ Frontend Setup
npm install

# 3️⃣ Backend Setup
cd backend
npm install

# 4️⃣ Environment Variables
cp .env.example .env.local
# Add your API keys:
# - OpenWeather API
# - Mapbox Token
# - Database URL
```

### 🔥 Run Development

```bash
# Terminal 1: Frontend (http://localhost:5173)
npm run dev

# Terminal 2: Backend (http://localhost:3000)
cd backend && npm run dev

# Terminal 3: ML Server (optional)
cd backend && python ml_server.py
```

---

## 🌐 <span style="color: #3b82f6">Quick Demo</span>

<table align="center">
<tr>
<td>

**🏠 Dashboard**
- View global AQI map
- Real-time metrics
- Health alerts

</td>
<td>

**📊 Analytics**
- 5-day forecast
- Trend charts
- Pollutant breakdown

</td>
<td>

**📍 Explorer**
- Browse 25+ cities
- Compare regions
- Location insights

</td>
</tr>
</table>

---

## 📚 <span style="color: #ec4899">Project Structure</span>

```
AQI-Predictor/
├── src/                          # React frontend
│   ├── components/               # Reusable UI components
│   │   ├── aqi/                  # AQI-specific components
│   │   │   ├── LocationExplorer.jsx
│   │   │   ├── Charts.jsx
│   │   │   └── SidePanel.jsx
│   │   └── ...
│   ├── pages/                    # Page components
│   │   ├── Dashboard.jsx
│   │   ├── PredictionPage.jsx
│   │   └── About.jsx
│   ├── hooks/                    # Custom React hooks
│   └── animations/               # Framer Motion variants
│
├── backend/                      # Node.js server
│   ├── src/
│   │   ├── server.js             # Express app
│   │   ├── routes/               # API endpoints
│   │   ├── middleware/           # Custom middleware
│   │   └── data/                 # Data scripts
│   └── ...
│
├── aqi prediction/               # ML & data processing
│   ├── build_real.py             # ML pipeline
│   ├── data.json                 # Processed data
│   └── CSV files                 # Historical datasets
│
└── public/                       # Static assets
```

---

## 🎨 <span style="color: #f97316">Color Palette & Design</span>

```
🟢 Success/Good AQI (0-50)      → #10b981 (Emerald)
🟡 Satisfactory (51-100)         → #f59e0b (Amber)
🟠 Moderate (101-200)            → #f97316 (Orange)
🔴 Poor (201-300)                → #ef4444 (Red)
⚫ Very Poor (300+)              → #7f1d1d (Dark Red)
```

---

## 📈 <span style="color: #06b6d4">Performance Metrics</span>

| Metric | Target | Status |
|--------|--------|--------|
| Page Load | <2s | ✅ Achieved |
| API Response | <500ms | ✅ Achieved |
| ML Prediction | <1s | ✅ Achieved |
| Mobile Score | >90 | ✅ 95/100 |
| Uptime | 99.9% | ✅ Active |

---

## 🤝 <span style="color: #10b981">Contributing</span>

We 💚 contributions! Here's how:

```bash
# 1. Fork the repo
git clone https://github.com/TheLucifer-07/AQI-Predictor

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes & commit
git add .
git commit -m "✨ Add amazing feature"

# 4. Push to branch
git push origin feature/amazing-feature

# 5. Open Pull Request
```

### 📋 Contribution Guidelines
- Follow code style (`ESLint` + `Prettier`)
- Add tests for new features
- Update documentation
- Keep commits atomic & meaningful

---

## 📄 <span style="color: #f59e0b">Credits</span>

<div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">

**🛰️ Data Sources:**
- MODIS (NASA Satellite Data)
- OpenWeather API
- WAQI (World Air Quality Index)
- APPCB (State Pollution Board)

**📚 Inspired by:**
- Global climate initiatives
- WHO Air Quality Guidelines
- UNEP Environmental Programs

**👥 Maintainers:**
- HemaChandu 
- Santosh

</div>

---

## 🚀 <span style="color: #3b82f6">What's Coming Next?</span>

- 🗺️ Extended region coverage (all India)
- 📱 Native mobile app (React Native)
- 🌍 Global air quality monitoring
- 🔔 Smart notifications & alerts
- 🤖 Advanced ML models (Deep learning)
- 🌐 Multi-language support

---

<div align="center" style="margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; color: white;">

## 🌟 Show Your Support!

If AQI Predictor helps you,  **please give it a ⭐ on GitHub!**

<img src="https://img.shields.io/github/stars/yourusername/aqi-predictor?style=social" />

**Together, we're building a healthier future** 🌍💚

[⬆ Back to Top](#-aqi-predictor)

</div>

---

## 📊 Application Modules

### 📌 Dashboard

* Overview of AQI system
* Key metrics and summaries

### 🔮 Prediction

* Upload dataset
* Generate AQI predictions

### 📉 Visualization

* Trend analysis
* Interactive charts

### 🌍 Live AQI

* Real-time AQI by location
* Environmental factors

### ℹ️ About

* Project details
* Methodology

---

## 📁 Project Structure

```bash
AQI-Predictor/
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── hooks/
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── middleware/
│   └── server.js
```
---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/TheLucifer-07/AQI-Predictor.git
cd AQI-Predictor
```

---

### 2️⃣ Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

---

### 3️⃣ Run locally

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

## 🌐 Live Demo

* 🔗 Frontend: [https://aqi-predictor-07.vercel.app](https://aqi-predictor-07.vercel.app)
* 🔗 Backend: [https://aqi-predictor-r892.onrender.com](https://aqi-predictor-r892.onrender.com)

---

## 🧠 Key Highlights

* Full-stack architecture (React + Node.js)
* Real-time + predictive AQI system
* Secure API handling using environment variables
* Production deployment using Vercel & Render
* Clean, scalable, and modular codebase

---

## 📌 Future Improvements

* 📍 GPS-based AQI detection
* 📱 Mobile app version
* 🔔 AQI alert notifications
* 🧠 Advanced deep learning models
* 🌍 Global AQI coverage

---

## 👨‍💻 Author

**Hemachandu Animireddy**



