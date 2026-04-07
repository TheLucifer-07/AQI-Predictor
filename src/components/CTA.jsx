import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/predict");
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional
  };

  return (
    <section className="bg-[#003153] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ready to Predict Air Quality?
        </h2>

        <p className="text-gray-200 mb-8 text-lg">
          Start exploring real-time air quality predictions, trends, and health insights powered by AI.
        </p>

        <button
          onClick={handleClick}
          className="px-8 py-3 bg-white text-[#0b0c0d] font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
        >
          Get Started →
        </button>

      </div>
    </section>
  );
}

export default CTA;