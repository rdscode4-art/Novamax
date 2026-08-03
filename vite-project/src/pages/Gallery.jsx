import React from 'react';
import GallerySection from '../components/Home/GallerySection';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';
import PageHero from '../components/common/PageHero';

export default function GalleryPage() {
  return (
    <>
      <div>
        <PageHero 
          title="Our Gallery" 
          subtitle="Moments from our healthcare initiatives, medical camps, and community awareness programs." 
          icon="📸" 
          bgGradient="linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)" 
        />

        <GallerySection />
        <FooterBanner />
        <FooterSection />
      </div>
    </>
  );
}
