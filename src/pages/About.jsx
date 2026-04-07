import { motion } from "framer-motion";
import aboutBg from "../assets/about1.JPG";
import { fadeUp, staggerContainer, staggerItem, viewport } from "../animations/variants";

function About() {
  return (
    <div className="pt-24 pb-32 min-h-screen relative px-6 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
        style={{ backgroundImage: `url(${aboutBg})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* PAGE HEADER */}
        <motion.div
          className="mb-16 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            variants={fadeUp}
          >
            About This Project
          </motion.h1>
          <motion.p
            className="text-gray-200 text-lg max-w-3xl mx-auto"
            variants={fadeUp}
          >
            An AI-powered system designed to forecast air quality, analyze
            pollution trends, and support health-aware decision making.
          </motion.p>
        </motion.div>

        {/* SECTIONS */}
        <motion.div
          className="space-y-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* PROJECT OVERVIEW */}
          <motion.section
            className="bg-white/10 border border-white/25 backdrop-blur-md rounded-2xl shadow-lg p-8 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
            variants={staggerItem}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">Project Overview</h2>
            <p className="text-gray-200 leading-relaxed">
              The Air Quality Forecasting Dashboard visualizes historical air
              pollution data and predicts future air quality indicators such
              as AQI, PM2.5, and PM10. By combining environmental datasets
              with machine learning models, the system provides meaningful
              insights into pollution patterns and trends.
            </p>
          </motion.section>

          {/* DATA SOURCES */}
          <motion.section
            className="bg-white/10 border border-white/25 backdrop-blur-md rounded-2xl shadow-lg p-8 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
            variants={staggerItem}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Data Sources</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-200">
              <li>🌍 Central Pollution Control Board (CPCB)</li>
              <li>🛰️ NASA Earth Observation Data</li>
              <li>🏥 World Health Organization (WHO)</li>
              <li>📊 AQI Standard Reference Data</li>
            </ul>
          </motion.section>

          {/* MACHINE LEARNING MODEL */}
          <motion.section
            className="bg-white/10 border border-white/25 backdrop-blur-md rounded-2xl shadow-lg p-8 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
            variants={staggerItem}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">Machine Learning Model</h2>
            <p className="text-gray-200 leading-relaxed">
              Supervised machine learning models are trained using historical
              air quality and meteorological data. Temporal patterns,
              pollutant concentrations, and environmental variables are
              used as features to forecast future AQI values. Performance
              is evaluated using standard regression metrics.
            </p>
          </motion.section>

          {/* TECHNOLOGIES USED */}
          <motion.section
            className="bg-white/10 border border-white/25 backdrop-blur-md rounded-2xl shadow-lg p-8 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
            variants={staggerItem}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Technologies Used</h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              {["React.js", "Tailwind CSS", "Python", "Scikit-learn", "Data Visualization Libraries", "Environmental Datasets"].map((tech) => (
                <motion.div
                  key={tech}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-100 text-sm font-medium"
                  variants={staggerItem}
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)", transition: { duration: 0.18 } }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
