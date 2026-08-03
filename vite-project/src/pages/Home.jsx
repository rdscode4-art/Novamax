import HeroSection from '../components/Home/HeroSection';
import RegistrationBar from '../components/Home/RegistrationBar';
import HealthBenefits from '../components/Home/HealthBenefits';
import StatsSection from '../components/Home/StatsSection';
import PartnerHospitals from '../components/Home/PartnerHospitals';
import UpcomingProjects from '../components/Home/UpcomingProjects';
import GallerySection from '../components/Home/GallerySection';
import WorkWithUs from '../components/Home/WorkWithUs';
import MemberDashboard from '../components/Home/MemberDashboard';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <RegistrationBar />
      <WorkWithUs />
      <HealthBenefits />
      <PartnerHospitals />
      <UpcomingProjects />
      <GallerySection />

      {/* <MemberDashboard /> */}
      <FooterBanner />
      <FooterSection />
    </>
  );
}
