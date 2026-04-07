/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, staggerFlip, hoverLift, tapPress, fadeUp, viewport } from "../animations/variants";

const cards = [
  { icon: "📡", title: "Real-Time Prediction", desc: "Get near real-time air quality predictions powered by ML models.", label: "Try Now →", path: "/predict" },
  { icon: "📈", title: "Trend Analysis",       desc: "Explore pollution trends with advanced visualizations.",          label: "View Trends →", path: "/predict" },
  { icon: "🩺", title: "Health Advisory",      desc: "Get personalized health suggestions based on AQI.",              label: "Learn More →", path: "/about" },
];

function KeyFeatures() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-4 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          Key Features
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-12 text-center max-w-3xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          Our platform provides intelligent tools to analyze air quality,
          forecast pollution trends, and support informed health decisions.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {cards.map(({ icon, title, desc, label, path }) => (
            <motion.div
              key={title}
              className="bg-gray-100 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition"
              variants={staggerFlip}
              whileHover={{ y: -3, boxShadow: '0 10px 28px rgba(0,0,0,0.09)', transition: { duration: 0.15 } }}
            >
              <motion.div className="text-4xl mb-4"
                whileHover={{ scale: 1.15, transition: { duration: 0.15 } }}>
                {icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{desc}</p>
              <motion.button
                onClick={() => navigate(path)}
                className="text-blue-500 hover:underline"
                whileHover={{ x: 2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              >
                {label}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default KeyFeatures;
