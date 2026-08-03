import React from 'react';
import OurPartnersSection from '../components/Home/OurPartnersSection';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';
import PageHero from '../components/common/PageHero';

export default function PartnerHospitalsPage() {
  return (
    <>
      <div>
        <PageHero 
          title="Our Hospital Network" 
          subtitle="We have partnered with top-tier NABH accredited hospitals to bring you the best medical care at affordable prices." 
          icon="🏥" 
          bgGradient="linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)" 
        />
        
        <OurPartnersSection />
        <FooterBanner />
        <FooterSection />
      </div>
    </>
  );
}
