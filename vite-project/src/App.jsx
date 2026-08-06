import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header   from './components/Header';
import FloatingWidgets from './components/common/FloatingWidgets';

// HomePage is eagerly loaded for fastest initial render
import HomePage from './pages/Home';

// Lazy loaded pages
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const HealthCard = lazy(() => import('./pages/HealthCard'));
const PartnerHospitalsPage = lazy(() => import('./pages/PartnerHospitals'));
const GalleryPage = lazy(() => import('./pages/Gallery'));
const Certifications = lazy(() => import('./pages/Certifications'));
const VendorPartnership = lazy(() => import('./pages/VendorPartnership'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));

const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: '#1a3a6b', fontSize: '18px', fontWeight: 'bold' }}>
    Loading...
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/health-card" element={<HealthCard />} />
            <Route path="/hospitals" element={<PartnerHospitalsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/vendor-partnership" element={<VendorPartnership />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
