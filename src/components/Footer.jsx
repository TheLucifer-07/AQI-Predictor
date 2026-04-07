/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp, viewport } from "../animations/variants";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {/* About */}
        <motion.div variants={staggerItem}>
          <h3 className="text-xl font-bold text-white mb-3">Air Quality Forecasting</h3>
          <p className="text-sm leading-relaxed">
            An AI-powered platform to predict air quality, analyze pollution
            trends, and provide health insights for safer living.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={staggerItem}>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[{ to: "/", label: "Home" }, { to: "/predict", label: "Predict AQI" }, { to: "/about", label: "About" }].map(({ to, label }) => (
              <li key={to}>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
                  <Link to={to} className="hover:text-white transition-colors duration-200">{label}</Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div variants={staggerItem}>
          <h4 className="text-lg font-semibold text-white mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: "https://cpcb.nic.in/",                                    label: "CPCB (Central Pollution Control Board)" },
              { href: "https://earthdata.nasa.gov/",                             label: "NASA Earth Data" },
              { href: "https://www.who.int/health-topics/air-pollution",         label: "WHO Air Quality" },
              { href: "https://www.airnow.gov/aqi/aqi-basics/",                  label: "AQI Standards" },
            ].map(({ href, label }) => (
              <li key={href}>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                    {label}
                  </a>
                </motion.div>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        © {new Date().getFullYear()} Air Quality Forecasting Dashboard • Built by Chandu & Santosh
      </motion.div>
    </footer>
  );
}

export default Footer;
