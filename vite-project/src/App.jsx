import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header   from './components/Header';
import HomePage from './pages/Home';
// Phase 1 Pages
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
// Phase 2 Pages
import HealthCard from './pages/HealthCard';
// Phase 3 Pages
import PartnerHospitalsPage from './pages/PartnerHospitals';
import GalleryPage from './pages/Gallery';
// Phase 4 Pages
import Certifications from './pages/Certifications';
import VendorPartnership from './pages/VendorPartnership';
import FloatingWidgets from './components/common/FloatingWidgets';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <FloatingWidgets />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/health-card" element={<HealthCard />} />
          <Route path="/hospitals" element={<PartnerHospitalsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/vendor-partnership" element={<VendorPartnership />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
