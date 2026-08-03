import React from 'react';
import ContactSection from '../components/Home/ContactSection';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';
import PageHero from '../components/common/PageHero';

const css = `
  .contact-page__map {
    width: 100%;
    height: 400px;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 18px;
    font-family: 'Inter', sans-serif;
  }
`;

export default function ContactUs() {
  return (
    <>
      <style>{css}</style>
      <div>
        <PageHero 
          title="Contact Us" 
          subtitle="We are here for you 24/7. Reach out to our support team for any queries regarding your membership or medical assistance." 
          icon="📞" 
          bgGradient="linear-gradient(135deg, #11998E 0%, #38EF7D 100%)" 
        />

        <ContactSection />
        
        {/* Google Map Integration */}
        <div className="contact-page__map">
          <iframe 
            src="https://maps.google.com/maps?q=Najibabad,%20Bijnor&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Najibabad, Bijnor Map"
          ></iframe>
        </div>

        <FooterBanner />
        <FooterSection />
      </div>
    </>
  );
}
