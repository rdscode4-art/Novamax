import React from 'react';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';

import PageHero from '../components/common/PageHero';

const css = `
  .about-page {
    font-family: 'Inter', sans-serif;
    color: #333;
  }
  /* Our Story Section */
  .about__story {
    padding: 100px 24px;
    background: #fff;
  }
  .about__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 64px;
    align-items: center;
  }
  .about__story-left {
    flex: 1;
  }
  .about__story-title {
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
    font-weight: 700;
    color: #0A2E73;
    margin-bottom: 24px;
  }
  .about__story-text {
    font-size: 16px;
    color: #555;
    line-height: 1.8;
    margin-bottom: 16px;
  }
  .about__story-right {
    flex: 1;
    position: relative;
  }
  .about__story-img {
    width: 100%;
    border-radius: 24px;
    box-shadow: 0 24px 48px rgba(10,46,115,0.1);
  }
  
  /* Mission & Vision */
  .about__mv {
    padding: 100px 24px;
    background: #F8FAFD;
  }
  .about__mv-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .about__mv-card {
    background: #fff;
    padding: 48px;
    border-radius: 24px;
    border: 1px solid #E6EAF0;
    transition: transform 0.3s;
  }
  .about__mv-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(10,46,115,0.05);
    border-color: #1BA94C;
  }
  .about__mv-icon {
    width: 64px;
    height: 64px;
    background: rgba(31,94,255,0.1);
    color: #1F5EFF;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin-bottom: 24px;
  }
  .about__mv-title {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #1A1A1A;
    margin-bottom: 16px;
  }

  /* Values Section */
  .about__values {
    padding: 100px 24px;
    background: #fff;
    text-align: center;
  }
  .about__values-header {
    max-width: 800px;
    margin: 0 auto 64px;
  }
  .about__values-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
  .about__value-card {
    padding: 32px;
    background: #F8FAFD;
    border-radius: 16px;
    transition: all 0.3s;
  }
  .about__value-card:hover {
    background: #1BA94C;
    color: #fff;
    transform: scale(1.05);
  }
  .about__value-card:hover .about__value-title {
    color: #fff;
  }
  .about__value-icon {
    font-size: 40px;
    margin-bottom: 16px;
  }
  .about__value-title {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #0A2E73;
  }

  @media (max-width: 1024px) {
    .about__container { flex-direction: column; }
    .about__mv-grid { grid-template-columns: 1fr; }
    .about__values-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .about__values-grid { grid-template-columns: 1fr; }
    .about__hero-title { font-size: 36px; }
  }
`;

export default function AboutUs() {
  return (
    <>
      <style>{css}</style>
      <div className="about-page">
        <PageHero 
          title="About Us" 
          subtitle="Making Quality Healthcare Affordable through NOVAMAX Digital Help For Humans Foundation." 
          icon="🤝" 
          bgGradient="linear-gradient(135deg, #0A2E73 0%, #1F5EFF 100%)" 
        />

        {/* Our Story */}
        <section className="about__story">
          <div className="about__container">
            <div className="about__story-left">
              <h2 className="about__story-title">Our Story</h2>
              <p className="about__story-text">
                Founded with a vision to revolutionize the Indian healthcare system, NOVAMAX observed that rising medical expenses were pushing families into financial hardship. We realized that while India has world-class doctors and hospitals, access to them is often restricted by high costs.
              </p>
              <p className="about__story-text">
                That's why we created the NOVAMAX Health Card. A smart, digital membership that empowers families with instant access to highly subsidized medical rates across a verified network of top-tier hospitals and clinics. 
              </p>
            </div>
            <div className="about__story-right">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" 
                alt="Medical Team" 
                className="about__story-img"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="about__mv">
          <div className="about__mv-grid">
            <div className="about__mv-card">
              <div className="about__mv-icon">🎯</div>
              <h3 className="about__mv-title">Our Mission</h3>
              <p className="about__story-text">
                To provide every individual with a comprehensive digital health identity that guarantees access to quality healthcare at standardized, affordable, and transparent prices, reducing out-of-pocket medical expenses.
              </p>
            </div>
            <div className="about__mv-card">
              <div className="about__mv-icon">👁️</div>
              <h3 className="about__mv-title">Our Vision</h3>
              <p className="about__story-text">
                To build India's largest and most trusted healthcare community network where no one has to compromise on their health or their family's well-being due to financial constraints.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="about__values">
          <div className="about__values-header">
            <h2 className="about__story-title" style={{ marginBottom: '16px' }}>Our Core Values</h2>
            <p className="about__story-text">The principles that guide everything we do at NOVAMAX.</p>
          </div>
          <div className="about__values-grid">
            {[
              { icon: '🤝', title: 'Trust & Transparency' },
              { icon: '❤️', title: 'Compassionate Care' },
              { icon: '🚀', title: 'Innovation' },
              { icon: '🛡️', title: 'Reliability' }
            ].map((v, i) => (
              <div key={i} className="about__value-card">
                <div className="about__value-icon">{v.icon}</div>
                <div className="about__value-title">{v.title}</div>
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
