import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, PhoneCall, Mail, HeartHandshake } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const css = `
  .footer { 
    background: #0A1930;
    color: #e2e8f0; 
    position: relative; 
    z-index: 10;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
    text-align: left;
  }
  
  /* Healthcare Pattern Background */
  .footer::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.5;
    pointer-events: none;
  }

  .footer__top { 
    padding: 50px 20px 30px; 
    position: relative;
    z-index: 2;
  }
  .footer__container {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
    gap: 30px;
  }
  
  /* Brand Column */
  .footer__brand {
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .footer__logo { 
    display: inline-flex; 
    margin-bottom: 8px; 
  }
  .footer__logo img {
    height: 80px;
    object-fit: contain;
  }
  .footer__brand-desc { 
    font-size: 13px; 
    line-height: 1.5; 
    color: #cbd5e1; 
    margin-bottom: 16px; 
  }
  .footer__social { 
    display: flex; 
    gap: 10px; 
    justify-content: center;
  }
  .footer__social-btn {
    width: 36px; 
    height: 36px; 
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    display: flex; 
    align-items: center; 
    justify-content: center;
    color: #fff; 
    font-size: 18px; 
    text-decoration: none;
    transition: all 0.3s ease;
  }
  .footer__social-btn:hover {
    background: #fff;
    color: #0A1930;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(255,255,255,0.2);
  }

  /* Columns Shared */
  .footer__col-title { 
    font-family: 'Poppins', sans-serif;
    font-size: 16px; 
    font-weight: 700; 
    color: #fff; 
    margin: 0 0 16px; 
    position: relative;
    padding-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: left;
  }
  .footer__col-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #1BA94C; /* original green accent */
    border-radius: 2px;
  }
  
  /* Links Columns */
  .footer__links { 
    list-style: none; 
    padding: 0; 
    margin: 0; 
    display: flex; 
    flex-direction: column; 
    gap: 10px; 
    text-align: left;
  }
  .footer__links li {
    display: flex;
    align-items: center;
  }
  .footer__links li a { 
    text-decoration: none; 
    color: #cbd5e1; 
    font-size: 13px; 
    transition: all 0.2s; 
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .footer__links li a::before {
    content: '›';
    color: #1BA94C;
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
    transition: transform 0.2s;
  }
  .footer__links li a:hover { 
    color: #fff; 
  }
  .footer__links li a:hover::before {
    transform: translateX(4px);
  }

  /* Contact Column */
  .footer__contact-list { 
    list-style: none; 
    padding: 0; 
    margin: 0; 
    display: flex; 
    flex-direction: column; 
    gap: 12px; 
    text-align: left;
  }
  .footer__contact-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  .footer__contact-icon {
    width: 32px;
    height: 32px;
    background: rgba(27, 169, 76, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #1BA94C;
    flex-shrink: 0;
  }
  .footer__contact-text {
    font-size: 13px; 
    color: #cbd5e1; 
    line-height: 1.6; 
    margin-top: 2px;
    text-align: left;
  }
  .footer__contact-text strong {
    color: #fff;
    display: block;
    margin-bottom: 2px;
    font-weight: 600;
  }
  .footer__contact-text a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer__contact-text a:hover {
    color: #1BA94C;
  }

  /* NGO Specific Action Column */
  .footer__action-box {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }
  .footer__action-icon {
    font-size: 28px;
    margin-bottom: 8px;
  }
  .footer__action-text {
    font-size: 13px;
    color: #cbd5e1;
    line-height: 1.5;
    margin-bottom: 16px;
  }
  .footer__btn {
    display: inline-block;
    background: #1BA94C;
    color: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.3s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .footer__btn:hover {
    background: #fff;
    color: #1BA94C;
    box-shadow: 0 4px 15px rgba(27, 169, 76, 0.4);
    transform: translateY(-2px);
  }

  /* Bottom bar */
  .footer__bottom {
    background: #06101E; 
    padding: 8px 20px;
    position: relative;
    z-index: 2;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .footer__bottom-content {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }
  .footer__bottom p { 
    font-size: 13px; 
    color: #94a3b8; 
    margin: 0; 
    letter-spacing: 0.3px;
  }
  .footer__bottom-links { 
    display: flex; 
    gap: 20px; 
    align-items: center;
  }
  .footer__bottom-links a { 
    font-size: 13px; 
    color: #94a3b8; 
    text-decoration: none; 
    transition: color 0.2s;
    letter-spacing: 0.3px;
  }
  .footer__bottom-links a:hover {
    color: #1BA94C;
  }

  /* SVGs */
  .social-svg { width: 18px; height: 18px; fill: currentColor; }

  @media (max-width: 1100px) {
    .footer__container { grid-template-columns: repeat(2, 1fr); gap: 40px; }
  }
  @media (max-width: 768px) {
    .footer__container { grid-template-columns: 1fr; gap: 40px; }
    .footer__bottom-content { flex-direction: column; text-align: center; justify-content: center; }
    .footer__brand { padding-right: 0; text-align: center; }
    .footer__col-title::after { left: 50%; transform: translateX(-50%); }
    .footer__col-title { text-align: center; }
    .footer__social { justify-content: center; }
    .footer__contact-item { flex-direction: column; align-items: center; text-align: center; }
  }
`;

// Simple Social Icons
const FbIcon = () => <svg viewBox="0 0 24 24" className="social-svg"><path d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z"/></svg>;
const IgIcon = () => <svg viewBox="0 0 24 24" className="social-svg"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.85 3.93 2.3 7.15 2.15c1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.27.2-6.78 2.71-6.98 6.98C0 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.27 2.71 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.27-.2 6.78-2.71 6.98-6.98C23.99 15.67 24 15.26 24 12s-.01-3.67-.07-4.95c-.2-4.27-2.71-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.44a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>;
const YtIcon = () => <svg viewBox="0 0 24 24" className="social-svg"><path d="M21.58 7.19a2.71 2.71 0 0 0-1.9-1.92C17.99 4.8 12 4.8 12 4.8s-5.99 0-7.68.47a2.71 2.71 0 0 0-1.9 1.92C1.95 8.89 1.95 12 1.95 12s0 3.11.47 4.81a2.71 2.71 0 0 0 1.9 1.92C5.99 19.2 12 19.2 12 19.2s5.99 0 7.68-.47a2.71 2.71 0 0 0 1.9-1.92c.47-1.7.47-4.81.47-4.81s0-3.11-.47-4.81zM9.98 15.2v-6.4l6.15 3.2-6.15 3.2z"/></svg>;


export default function FooterSection() {
  return (
    <>
      <style>{css}</style>
      <footer className="footer">
        
        <div className="footer__top">
          <div className="footer__container">
            
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__logo">
                <img src={logoImg} alt="Novamax Logo" />
              </div>
              <p className="footer__brand-desc">
                Dedicated to providing accessible healthcare, free medicines, and emergency medical support to underserved communities across India.
              </p>
              <div className="footer__social">
                <a href="#" className="footer__social-btn"><FbIcon /></a>
                <a href="#" className="footer__social-btn"><IgIcon /></a>
                <a href="#" className="footer__social-btn"><YtIcon /></a>
              </div>
            </div>

            {/* Important Links */}
            <div>
              <h4 className="footer__col-title">Our Initiatives</h4>
              <ul className="footer__links">
                <li><Link to="/health-card">Novamax Health Card</Link></li>
                <li><Link to="/medicine">10/- Rupees Medicine</Link></li>
                <li><Link to="/camps">Free Medical Camps</Link></li>
                <li><Link to="/telemedicine">24x7 Telemedicine</Link></li>
                <li><Link to="/hospitals">Partner Hospitals</Link></li>
                <li><Link to="/about">About Foundation</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="footer__col-title">Contact Us</h4>
              <ul className="footer__contact-list">
                <li className="footer__contact-item">
                  <div className="footer__contact-icon"><MapPin size={18} /></div>
                  <div className="footer__contact-text">
                    <strong>Head Office</strong>
                    Bhaneda, Bijnor Road,<br/>
                    Najibabad, Bijnor, UP - 246763
                  </div>
                </li>
                <li className="footer__contact-item">
                  <div className="footer__contact-icon"><PhoneCall size={18} /></div>
                  <div className="footer__contact-text">
                    <strong>Helpline Numbers</strong>
                    <a href="tel:917456022040">+91 74560 22040</a><br/>
                    <a href="tel:918630089570">+91 86300 89570</a>
                  </div>
                </li>
                <li className="footer__contact-item">
                  <div className="footer__contact-icon"><Mail size={18} /></div>
                  <div className="footer__contact-text">
                    <strong>Email Address</strong>
                    <a href="mailto:info@novamaxfoundation.org">info@novamaxfoundation.org</a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Action / Join Us */}
            <div>
              <h4 className="footer__col-title">Get Involved</h4>
              <div className="footer__action-box">
                <div className="footer__action-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', color: '#1BA94C' }}><HeartHandshake size={36} /></div>
                <p className="footer__action-text">
                  Your support helps us reach more families in need of urgent medical care. Join our mission to build a healthier society.
                </p>
                <Link to="/join" className="footer__btn">Become a Volunteer</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p>© {new Date().getFullYear()} NOVAMAX DIGITAL HELP FOR HUMANS FOUNDATION. All Rights Reserved.</p>
            <div className="footer__bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>
        
      </footer>
    </>
  );
}
