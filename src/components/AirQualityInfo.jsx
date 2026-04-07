import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem, viewport } from "../animations/variants";

const factors = {
  PM25: "PM2.5 refers to fine particulate matter air pollution, consisting of tiny particles or droplets with a diameter of 2.5 micrometers or less—about 30 times smaller than a human hair. Primarily produced through combustion (vehicles, power plants, wildfires), these particles are dangerous because they can travel deep into the lungs and enter the bloodstream",
  PM10: "PM10 refers to inhalable coarse particulate matter (solid or liquid) with a diameter of 10 micrometers or less—about 1/5 to 1/7 the width of a human hair. These particles, including dust, smoke, soot, and chemicals, are small enough to penetrate deep into the lungs. ",
  AOD:  "AOD stands for Aerosol Optical Depth, a measure of how sunlight is blocked by particles (dust, smoke, pollution) in the atmosphere, indicating total column aerosol loading. It is used to estimate surface-level PM2.5 (particle pollution) for AQI monitoring. AOD values less than 0.1 indicate clean air, while values over 1.0 signify significant haze.",
  NO2:  "Nitrogen dioxide (NO₂) in the Air Quality Index (AQI) is a highly reactive, reddish-brown toxic gas primarily produced from burning fossil fuels (cars, power plants). It acts as a key indicator for nitrogen oxide NOx pollution, causing respiratory issues like coughing and asthma, and contributes to photochemical smog, particulate matter, and ozone formation.",
  SO2:  "Sulfur Dioxide (SO₂) in the Air Quality Index (AQI) is a colorless, pungent gas—primarily produced by burning fossil fuels like coal in power plants and industries—used as a key indicator of air pollution. It causes respiratory issues, forms acid rain, and is highly damaging to the respiratory system. ",
  O3:   "Ozone (O₃) in the Air Quality Index (AQI) refers to ground-level or bad ozone, a primary component of smog created by chemical reactions between pollutants from vehicles and industry in sunlight. It is a major respiratory irritant monitored to assess health risks, with levels tracked over 8-hour periods to determine air safety. ",
  CO:   "Carbon Monoxide (CO) in the Air Quality Index (AQI) is a colorless, odorless, and tasteless toxic gas produced by the incomplete combustion of carbon-based fuels. As a key pollutant monitored for air quality, high concentrations of CO are dangerous, reducing oxygen delivery to body organs. Major sources include motor vehicles, industrial processes, and wildfires. ",
  RH:   "Relative humidity (RH) in Air Quality Index (AQI) reports measures the amount of water vapor present in the air compared to the maximum it can hold at that temperature, expressed as a percentage. It is a critical meteorological factor because high humidity (typically >70%) can cause particles like PM2.5 to absorb moisture, swell, and increase in weight, which can falsely elevate sensor-based, low-cost AQI readings. ",
};

function AirQualityInfo() {
  const [active, setActive] = useState("PM25");

  return (
    <section id="what-is-aqi" className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          className="mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <motion.h2 className="text-3xl font-bold text-gray-800 mb-4" variants={fadeUp}>
            What is AQI and Why Does It Matter?
          </motion.h2>
          <motion.p className="text-gray-600 leading-relaxed mb-4" variants={fadeUp}>
            The Air Quality Index (AQI) is a standardized metric used to communicate how polluted the air currently is or how polluted it is expected to become. It converts complex air pollution data from multiple pollutants into a single number and category (such as Good, Moderate, Poor, or Severe) that is easy for the public to understand.
          </motion.p>
          <motion.p className="text-gray-600 leading-relaxed mb-4" variants={fadeUp}>
            Monitoring AQI is essential because poor air quality directly impacts human health, ecosystems, and climate. Pollutants such as particulate matter (PM2.5, PM10), ozone, nitrogen dioxide, and carbon monoxide are linked to respiratory diseases, cardiovascular issues, and reduced life expectancy.
          </motion.p>
          <motion.p className="text-gray-600 leading-relaxed" variants={fadeUp}>
            Predicting AQI in advance is especially important as it enables early warnings, informed policy decisions, and preventive actions. Accurate AQI forecasts help governments, industries, and individuals minimize exposure, protect vulnerable groups, and plan sustainable urban and environmental strategies.
          </motion.p>
        </motion.div>

        <motion.h3
          className="text-3xl font-bold text-gray-800 mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          Understanding Air Quality Factors
        </motion.h3>

        <motion.p
          className="text-gray-600 mb-10 max-w-3xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          Click on a factor below to learn what it represents and how it contributes to air quality and health impacts.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mb-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {Object.keys(factors).map((key) => (
            <motion.button
              key={key}
              onClick={() => setActive(key)}
              className={`px-5 py-2 rounded-full border font-medium transition ${
                active === key ? "bg-[#33006F] text-white" : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              variants={staggerItem}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {key}
            </motion.button>
          ))}
        </motion.div>

        <div className="bg-white rounded-xl shadow p-8 text-gray-700 leading-relaxed overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {factors[active]}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export default AirQualityInfo;
