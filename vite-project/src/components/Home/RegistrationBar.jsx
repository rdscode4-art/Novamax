import React from 'react';
import { BadgeCheck, ShieldCheck } from 'lucide-react';
import logoImg from '../../assets/image.png';
import mcaImage from '../../assets/01.jpeg';
import nitiImage from '../../assets/02.jpeg';
import section12AImage from '../../assets/03.jpeg';

const css = `
  .trust-section {
    width: 100%;
    background: #f4f7fb;
    margin-bottom: 0px;
  }

  /* --- DESKTOP LAYOUT (Grid) --- */
  .trust-desktop {
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
    display: block;
  }
  
  .trust-header {
    text-align: center;
    margin-bottom: 40px;
  }
  .trust-title {
    font-family: 'Poppins', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #1a3a6b;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .trust-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #555;
    font-weight: 500;
  }
  
  .trust-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
  }
  
  .trust-card {
    background: #fff;
    border-radius: 16px;
    padding: 30px 20px;
    width: calc(20% - 20px);
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #fff;
    position: relative;
    overflow: hidden;
  }
  
  .trust-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(26,59,112,0.1);
    border-color: #e3ebf4;
  }
  
  .trust-icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  .trust-icon-wrapper svg {
    width: 28px;
    height: 28px;
    fill: #fff;
  }
  
  .icon-blue { background: linear-gradient(135deg, #1a3a6b, #1e4d8c); }
  .icon-green { background: linear-gradient(135deg, #2f7a35, #43a047); }
  .icon-orange { background: linear-gradient(135deg, #d3601a, #f47a20); }
  .icon-yellow { background: linear-gradient(135deg, #a67c00, #c89600); }
  
  .trust-card-title {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #1a3a6b;
    margin-bottom: 8px;
    line-height: 1.3;
  }
  .trust-card-sub {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #666;
    line-height: 1.4;
  }
  
  .trust-shield-img {
    width: 64px;
    height: auto;
    margin-bottom: 20px;
  }
  
  .trust-shield-brand {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #1a3a6b;
    margin-bottom: 4px;
    line-height: 1;
  }
  
  .trust-shield-sub {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    color: #555;
    font-weight: 600;
    line-height: 1.3;
  }

  .trust-footer {
    margin-top: 40px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: #e9f2eb;
    padding: 16px 28px;
    border-radius: 50px;
    max-width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
  .trust-footer svg {
    width: 24px;
    height: 24px;
    fill: #2f7a35;
  }
  .trust-footer-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #2f7a35;
  }


  /* --- EXACT CARD LAYOUT (First Image) --- */
  .legal-mobile-wrap {
    padding: 40px 10px;
    display: none;
  }
  .legal-mobile {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    border: 2px solid #1a3a6b;
    border-radius: 16px;
    position: relative;
    padding: 30px 12px 16px 12px;
    background: #fff;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }

  .mobile-badge {
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a3a6b;
    color: #fff;
    padding: 6px 20px;
    border-radius: 30px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .mobile-badge svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }

  .mobile-body {
    display: flex;
    align-items: stretch;
    margin-bottom: 16px;
  }

  .mobile-left {
    flex: 0 0 32%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-right: 1px solid #e5e5e5;
    padding-right: 12px;
  }
  .mobile-shield-img {
    width: 100%;
    max-width: 80px;
    height: auto;
    margin-bottom: 12px;
  }
  .mobile-brand {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #1a3a6b;
    margin-bottom: 2px;
    line-height: 1.1;
  }
  .mobile-sub-brand {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    color: #555;
    font-weight: 500;
    line-height: 1.2;
  }

  .mobile-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 12px;
  }

  .mobile-row {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
    gap: 10px;
  }
  .mobile-row:last-child {
    border-bottom: none;
  }
  
  .mobile-icon-circle {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .mobile-icon-circle svg {
    width: 18px;
    height: 18px;
    fill: #fff;
  }
  
  .mobile-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: left;
  }
  .mobile-text-small {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    color: #666;
    line-height: 1.2;
  }
  .mobile-text-main {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.2;
  }
  .text-blue { color: #1a3a6b; }
  .text-green { color: #2f7a35; }
  .text-orange { color: #d3601a; }
  .text-yellow { color: #a67c00; }

  .mobile-check {
    width: 16px;
    height: 16px;
    background: #2f7a35;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .mobile-check svg {
    width: 10px;
    height: 10px;
    fill: #fff;
  }

  .mobile-footer {
    background: #f4f9f4;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .mobile-footer-icon {
    width: 36px;
    height: 36px;
    fill: #2f7a35;
    flex-shrink: 0;
  }
  .mobile-footer-text-wrap {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .mobile-footer-title {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #2f7a35;
    line-height: 1.2;
  }
  .mobile-footer-sub {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    color: #555;
    line-height: 1.2;
  }

  /* Responsive Switching */
  @media (max-width: 1024px) {
    .trust-desktop { display: none; }
    .legal-mobile-wrap { display: block; }
  }
`;

// Common SVG components
const NitiIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
  </svg>
);

const Section12AIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-2 8H7v-2h4v2zm4-4H7v-2h8v2zm0-4H7V7h8v2z"/>
  </svg>
);

const Section80GIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
);

export default function RegistrationBar() {
  return (
    <section className="trust-section">
      <style>{css}</style>
      
      {/* --- DESKTOP LAYOUT --- */}
      <div className="trust-desktop">
        <div className="trust-header">
          <h2 className="trust-title">Recognized & Registered By</h2>
          <p className="trust-subtitle">Proudly operating with full transparency and legal compliance.</p>
        </div>

        <div className="trust-grid">
          {/* Shield & Brand */}
          <div className="trust-card" style={{ justifyContent: 'center' }}>
            <img src={logoImg} alt="Novamax Logo" style={{ width: '100%', maxWidth: '140px', height: 'auto' }} />
          </div>

          {/* MCA */}
          <div className="trust-card">
            <div style={{ width: '100%', height: '120px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <img src={mcaImage} alt="MCA Certificate" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }} />
            </div>
            <div className="trust-card-title">Ministry of Corporate Affairs</div>
            <div className="trust-card-sub">Registered under Government of India</div>
          </div>

          {/* NITI Aayog */}
          <div className="trust-card">
            <div style={{ width: '100%', height: '120px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <img src={nitiImage} alt="NITI Aayog Certificate" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }} />
            </div>
            <div className="trust-card-title">NGO DARPAN / e-Anudan</div>
            <div className="trust-card-sub">Registered on NITI Aayog, Govt. of India</div>
          </div>

          {/* 12A */}
          <div className="trust-card">
            <div style={{ width: '100%', height: '120px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <img src={section12AImage} alt="Section 12A Certificate" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }} />
            </div>
            <div className="trust-card-title">Section 12A</div>
            <div className="trust-card-sub">Approved under Income Tax Act, 1961</div>
          </div>

          {/* 80G */}
          <div className="trust-card">
            <div className="trust-icon-wrapper icon-yellow"><Section80GIcon /></div>
            <div className="trust-card-title">Section 80G</div>
            <div className="trust-card-sub">Approved under Income Tax Act, 1961</div>
          </div>
        </div>

        <div className="trust-footer">
          <BadgeCheck style={{ width: '24px', height: '24px', color: '#2f7a35' }} />
          <span className="trust-footer-text">We are a Registered & Recognized Non-Profit Organization. Your trust empowers our mission to serve humanity.</span>
        </div>
      </div>


      {/* --- EXACT MOBILE LAYOUT --- */}
      <div className="legal-mobile-wrap">
        <div className="legal-mobile">
          
          <div className="mobile-badge">
            <ShieldCheck style={{ width: '16px', height: '16px', color: '#fff' }} />
            LEGAL REGISTRATIONS
          </div>

          <div className="mobile-body">
            {/* Left Side: Shield */}
            <div className="mobile-left">
              <img src={logoImg} alt="Novamax Logo" style={{ width: '100%', maxWidth: '90px', height: 'auto' }} />
            </div>

            <div className="mobile-right">
              <div className="mobile-row">
                <div style={{ width: '48px', height: '48px', flexShrink: 0, marginRight: '12px', background: '#fff', padding: '4px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <img src={mcaImage} alt="MCA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="mobile-text">
                  <span className="mobile-text-small">Registered under</span>
                  <span className="mobile-text-main text-blue">Ministry of Corporate Affairs (MCA)</span>
                  <span className="mobile-text-small">Government of India</span>
                </div>
              </div>
              <div className="mobile-row">
                <div style={{ width: '48px', height: '48px', flexShrink: 0, marginRight: '12px', background: '#fff', padding: '4px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <img src={nitiImage} alt="NITI Aayog Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="mobile-text">
                  <span className="mobile-text-small">Registered on</span>
                  <span className="mobile-text-main text-green">NGO DARPAN / e-Anudan</span>
                  <span className="mobile-text-small">(NITI Aayog, Government of India)</span>
                </div>
                <div className="mobile-check"><CheckIcon /></div>
              </div>

              <div className="mobile-row">
                <div style={{ width: '48px', height: '48px', flexShrink: 0, marginRight: '12px', background: '#fff', padding: '4px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <img src={section12AImage} alt="Section 12A Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="mobile-text">
                  <span className="mobile-text-small">Approved under</span>
                  <span className="mobile-text-main text-orange">Section 12A</span>
                  <span className="mobile-text-small">of the Income Tax Act, 1961</span>
                </div>
                <div className="mobile-check"><CheckIcon /></div>
              </div>

              <div className="mobile-row">
                <div className="mobile-icon-circle icon-yellow"><Section80GIcon /></div>
                <div className="mobile-text">
                  <span className="mobile-text-small">Approved under</span>
                  <span className="mobile-text-main text-yellow">Section 80G</span>
                  <span className="mobile-text-small">of the Income Tax Act, 1961</span>
                </div>
                <div className="mobile-check"><CheckIcon /></div>
              </div>

            </div>
          </div>

          <div className="mobile-footer">
            <BadgeCheck style={{ width: '36px', height: '36px', color: '#2f7a35', flexShrink: 0 }} />
            <div className="mobile-footer-text-wrap">
              <div className="mobile-footer-title">We are a Registered & Recognized Non-Profit Organization</div>
              <div className="mobile-footer-sub">Your trust empowers our mission to serve humanity.</div>
            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
