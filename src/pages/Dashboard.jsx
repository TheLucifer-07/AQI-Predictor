import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dashboardBg from "../assets/dashboard.JPG";
import KeyFeatures from "../components/KeyFeatures";
import AirQualityInfo from "../components/AirQualityInfo";
import CTA from "../components/CTA";
import { fadeUp, staggerContainer, staggerItem, viewport } from "../animations/variants";

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

        {/* Hero Content */}
        <motion.div
          className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            variants={fadeUp}
          >
            Air Quality Forecasting
          </motion.h1>

          <motion.p
            className="text-gray-300 max-w-xl mb-8"
            variants={fadeUp}
          >
            AI-powered air pollution prediction and environmental insights
          </motion.p>

          <motion.div className="flex gap-4" variants={staggerContainer}>
            <motion.button
              onClick={() => navigate("/predict")}
              className="px-6 py-3 bg-white hover:bg-black hover:text-white text-black rounded-lg font-semibold transition"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Predict AQI Now →
            </motion.button>

            <motion.a
              href="#what-is-aqi"
              className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black rounded-lg font-semibold transition"
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Sections */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
        <AirQualityInfo />
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
        <KeyFeatures />
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
        <CTA />
      </motion.div>
    </>
  );
}

export default Dashboard;
