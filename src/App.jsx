import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import PredictionPage from "./pages/PredictionPage";

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/visualize" element={<Navigate to="/predict" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;