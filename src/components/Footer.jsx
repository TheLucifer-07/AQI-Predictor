import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Air Quality Forecasting
          </h3>
          <p className="text-sm leading-relaxed">
            An AI-powered platform to predict air quality, analyze pollution
            trends, and provide health insights for safer living.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/predict" className="hover:text-white">
                Predict AQI
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Resources
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://cpcb.nic.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                CPCB (Central Pollution Control Board)
              </a>
            </li>

            <li>
              <a
                href="https://earthdata.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                NASA Earth Data
              </a>
            </li>

            <li>
              <a
                href="https://www.who.int/health-topics/air-pollution"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WHO Air Quality
              </a>
            </li>

            <li>
              <a
                href="https://www.airnow.gov/aqi/aqi-basics/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                AQI Standards
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Air Quality Forecasting Dashboard • Built by chandu & santosh
      </div>
    </footer>
  );
}

export default Footer;