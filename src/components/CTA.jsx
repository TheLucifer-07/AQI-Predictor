import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, staggerItem, viewport } from "../animations/variants";

function CTA() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/predict");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-[#003153] py-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-white mb-4"
          variants={fadeUp}
        >
          Ready to Predict Air Quality?
        </motion.h2>

        <motion.p
          className="text-gray-200 mb-8 text-lg"
          variants={fadeUp}
        >
          Start exploring real-time air quality predictions, trends, and health insights powered by AI.
        </motion.p>

        <motion.button
          onClick={handleClick}
          className="px-8 py-3 bg-white text-[#0b0c0d] font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
          variants={staggerItem}
          whileHover={{ scale: 1.06, y: -3, boxShadow: "0 16px 40px rgba(0,0,0,0.25)" }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started →
        </motion.button>
      </motion.div>
    </section>
  );
}

export default CTA;
