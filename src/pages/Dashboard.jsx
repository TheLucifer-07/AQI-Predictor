import { useNavigate } from "react-router-dom";

import dashboardBg from "../assets/dashboard.JPG";
import KeyFeatures from "../components/KeyFeatures";
import AirQualityInfo from "../components/AirQualityInfo";
import CTA from "../components/CTA";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
          style={{ backgroundImage: `url(${dashboardBg})` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Air Quality Forecasting
          </h1>

          <p className="text-gray-300 max-w-xl mb-8">
            AI-powered air pollution prediction and environmental insights
          </p>

          <div className="flex gap-4">
            
            {/* Navigate to Predict */}
            <button
              onClick={() => navigate("/predict")}
              className="px-6 py-3 bg-white hover:bg-black hover:text-white text-black rounded-lg font-semibold transition"
            >
              Predict AQI Now →
            </button>

            {/* Scroll section */}
            <a
              href="#what-is-aqi"
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black rounded-lg font-semibold transition"
            >
              Learn More
            </a>

          </div>
        </div>
      </div>

      {/* Sections */}
      <AirQualityInfo />
      <KeyFeatures />
      <CTA />
    </>
  );
}

export default Dashboard;