import React from 'react';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';

import PageHero from '../components/common/PageHero';

const css = `
  .cert-page {
    font-family: 'Inter', sans-serif;
  }
  .cert__content {
    padding: 100px 24px;
    background: #F8FAFD;
  }
  .cert__grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
  .cert__card {
    background: #fff;
    border-radius: 20px;
    padding: 40px 32px;
    border: 1px solid #E6EAF0;
    text-align: center;
    transition: all 0.3s;
  }
  .cert__card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 48px rgba(10,46,115,0.08);
    border-color: #1BA94C;
  }
  .cert__icon {
    width: 80px;
    height: 80px;
    background: rgba(31,94,255,0.08);
    color: #1F5EFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    margin: 0 auto 24px;
  }
  .cert__title {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #1A1A1A;
    margin-bottom: 12px;
  }
  .cert__desc {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 24px;
  }
  .cert__btn {
    padding: 10px 24px;
    border-radius: 8px;
    background: transparent;
    border: 2px solid #1BA94C;
    color: #1BA94C;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }
  .cert__btn:hover {
    background: #1BA94C;
    color: #fff;
  }

  @media (max-width: 1024px) {
    .cert__grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .cert__grid { grid-template-columns: 1fr; }
  }
`;

export default function Certifications() {
  return (
    <>
      <style>{css}</style>
      <div className="cert-page">
        <PageHero 
          title="Our Trust & Certifications" 
          subtitle="NOVAMAX is officially registered and recognized by Government bodies. We maintain 100% transparency." 
          icon="🏆" 
          bgGradient="linear-gradient(135deg, #FDC830 0%, #F37335 100%)" 
        />

        <section className="cert__content">
          <div className="cert__grid">
            {[
              { title: 'MCA Registered', icon: '🏛️', desc: 'Officially registered under the Ministry of Corporate Affairs, Government of India.' },
              { title: 'NITI Aayog', icon: '🇮🇳', desc: 'Recognized and registered with the NITI Aayog NGO Darpan.' },
              { title: '12A Certified', icon: '📜', desc: 'Registered under section 12A of the Income Tax Act for tax exemptions.' },
              { title: '80G Certified', icon: '🤝', desc: 'Donations to the foundation are eligible for 80G tax deductions.' },
              { title: 'ISO 9001:2015', icon: '🏆', desc: 'Certified for maintaining international quality management standards.' },
              { title: 'NABH Partnered', icon: '🏥', desc: 'Partnered with NABH accredited hospitals to ensure top medical care.' }
            ].map((c, i) => (
              <div key={i} className="cert__card">
                <div className="cert__icon">{c.icon}</div>
                <h3 className="cert__title">{c.title}</h3>
                <p className="cert__desc">{c.desc}</p>
                <a href="#" className="cert__btn">View Certificate</a>
              </div>
            ))}
          </div>
        </section>

        <FooterBanner />
        <FooterSection />
      </div>
    </>
  );
}
