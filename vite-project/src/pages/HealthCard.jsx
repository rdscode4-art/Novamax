import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import HealthcareBenefitsSplit from '../components/Home/HealthcareBenefitsSplit';
import HowItWorks from '../components/Home/HowItWorks';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';
import PageHero from '../components/common/PageHero';
import healthCardImg from '../assets/Health Card.png';

const css = `
  .hc-page {
    background: #f4f7fb;
    overflow-x: hidden;
  }
  
  .hc-presentation {
    padding: 100px 24px;
    background: #fff;
  }
  
  .hc-container {
    max-width: 1250px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 80px;
  }
  
  .hc-visual {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
  }
  
  .hc-visual-bg-circle {
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(46,161,255,0.1) 0%, transparent 70%);
    z-index: 0;
  }

  .hc-visual-dots {
    position: absolute;
    top: 50px; left: 20px;
    width: 180px; height: 180px;
    border: 14px dotted #2ea1ff;
    border-radius: 50%;
    z-index: 0;
    opacity: 0.3;
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .hc-card-img {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 420px;
    border-radius: 20px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    transform: perspective(1000px) rotateY(15deg) rotateX(5deg);
    transition: all 0.5s ease;
  }
  
  .hc-card-img:hover {
    transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05);
    box-shadow: 0 40px 80px rgba(0,0,0,0.2);
  }
  
  .hc-floating-badge {
    position: absolute;
    bottom: 40px;
    right: -20px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.6);
    padding: 16px 24px;
    border-radius: 16px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 16px;
    animation: floatBadge 6s ease-in-out infinite;
  }
  
  @keyframes floatBadge {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  .hc-badge-icon {
    width: 48px;
    height: 48px;
    background: #eef5ff;
    color: #2ea1ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hc-badge-text h4 {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 800;
    color: #0b224e;
  }
  
  .hc-badge-text p {
    margin: 0;
    font-size: 13px;
    color: #666;
    font-weight: 500;
  }

  .hc-content {
    flex: 1;
  }
  
  .hc-subtitle {
    color: #2ea1ff;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hc-subtitle::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 2px;
    background: #2ea1ff;
  }
  
  .hc-title {
    font-size: 42px;
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    color: #0b224e;
    line-height: 1.2;
    margin-bottom: 24px;
  }
  
  .hc-desc {
    font-size: 16px;
    color: #555;
    line-height: 1.8;
    margin-bottom: 32px;
  }
  
  .hc-features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }
  
  .hc-feature {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .hc-feature-icon-wrapper {
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: #f4f8fb;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2ea1ff;
    transition: all 0.3s ease;
  }
  
  .hc-feature:hover .hc-feature-icon-wrapper {
    background: #2ea1ff;
    color: #fff;
    transform: translateY(-5px);
  }
  
  .hc-feature-title {
    font-size: 18px;
    font-weight: 700;
    color: #0b224e;
    margin: 0;
  }
  
  .hc-feature-text {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin: 0;
  }
  
  .hc-divider {
    height: 1px;
    background: #eef0f5;
    margin: 32px 0;
  }
  
  .hc-check-list {
    margin-bottom: 40px;
  }
  
  .hc-check-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 15px;
    color: #444;
    font-weight: 500;
  }
  
  .hc-check-icon {
    color: #1BA94C;
    flex-shrink: 0;
    margin-top: 2px;
  }
  
  .hc-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 36px;
    background: #1BA94C;
    color: #fff;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    text-decoration: none;
    border-radius: 50px;
    transition: all 0.3s ease;
    box-shadow: 0 10px 20px rgba(27, 169, 76, 0.2);
  }
  
  .hc-cta-btn:hover {
    background: #148b3c;
    transform: translateY(-2px);
    box-shadow: 0 15px 25px rgba(27, 169, 76, 0.3);
  }

  @media (max-width: 992px) {
    .hc-presentation { padding: 60px 20px; }
    .hc-container { flex-direction: column; text-align: center; gap: 40px; }
    .hc-subtitle { justify-content: center; }
    .hc-subtitle::before, .hc-subtitle::after { content: ''; width: 24px; height: 2px; background: #2ea1ff; }
    .hc-visual { width: 100%; min-height: auto; }
    .hc-floating-badge { right: 50%; transform: translateX(50%); bottom: -20px; }
    .hc-check-item { justify-content: center; text-align: left; }
    @keyframes floatBadge {
      0%, 100% { transform: translate(50%, 0); }
      50% { transform: translate(50%, -15px); }
    }
  }
  @media (max-width: 768px) {
    .hc-presentation { padding: 48px 16px; }
    .hc-container { gap: 28px; }
    .hc-visual-dots { display: none; }
    .hc-card-img { max-width: 280px; transform: none; }
    .hc-card-img:hover { transform: scale(1.02); }
  }
  @media (max-width: 576px) {
    .hc-features-grid { grid-template-columns: 1fr; }
    .hc-presentation { padding: 36px 16px; }
    .hc-card-img { max-width: 240px; }
  }
`;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HealthCard() {
  return (
    <>
      <style>{css}</style>
      <div className="hc-page">
        <PageHero 
          title="Health Card" 
        />

        <section className="hc-presentation">
          <div className="hc-container">
            
            {/* Visual Side */}
            <motion.div 
              className="hc-visual"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="hc-visual-dots"></div>
              <div className="hc-visual-bg-circle"></div>
              
              <img src={healthCardImg} alt="Novamax Premium Health Card" className="hc-card-img" />
              
              <div className="hc-floating-badge">
                <div className="hc-badge-icon">
                  <Star size={24} fill="currentColor" />
                </div>
                <div className="hc-badge-text">
                  <h4>Exclusive Access</h4>
                  <p>To Premium Partner Hospitals</p>
                </div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
              className="hc-content"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUpVariant} className="hc-subtitle">PREMIUM BENEFITS</motion.div>
              <motion.h2 variants={fadeUpVariant} className="hc-title">
                Your Golden Ticket to Premium Healthcare.
              </motion.h2>
              <motion.p variants={fadeUpVariant} className="hc-desc">
                Step into a world of priority medical care. The NOVAMAX Health Card is more than just a piece of plastic; it is your passport to immediate financial relief during medical emergencies. Flash your card at any of our partner hospitals to instantly slash your medical bills, from basic diagnostics to complex surgeries.
              </motion.p>
              
              <motion.div variants={fadeUpVariant} className="hc-features-grid">
                <div className="hc-feature">
                  <div className="hc-feature-icon-wrapper"><Zap size={24} /></div>
                  <h3 className="hc-feature-title">Instant Approvals</h3>
                  <p className="hc-feature-text">Skip the painful paperwork. Get instant discounts directly at the billing counter.</p>
                </div>
                <div className="hc-feature">
                  <div className="hc-feature-icon-wrapper"><Users size={24} /></div>
                  <h3 className="hc-feature-title">Family Coverage</h3>
                  <p className="hc-feature-text">Extend your premium benefits to secure the health of your entire family.</p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUpVariant} className="hc-divider"></motion.div>
              
              <motion.div variants={fadeUpVariant} className="hc-check-list">
                <div className="hc-check-item">
                  <CheckCircle2 size={20} className="hc-check-icon" />
                  <span>Up to 50% discount on OPD and diagnostic tests across India.</span>
                </div>
                <div className="hc-check-item">
                  <CheckCircle2 size={20} className="hc-check-icon" />
                  <span>Priority admission and dedicated support desks at partner hospitals.</span>
                </div>
                <div className="hc-check-item">
                  <CheckCircle2 size={20} className="hc-check-icon" />
                  <span>Zero hidden charges, transparent pricing, and absolute peace of mind.</span>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUpVariant}>
                <a href="/contact" className="hc-cta-btn">
                  Apply For Health Card <ChevronRight size={20} />
                </a>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* Reuse the components from Home Page */}
        <HealthcareBenefitsSplit />
        <HowItWorks />

        <FooterBanner />
        <FooterSection />
      </div>
    </>
  );
}
