import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, CreditCard, Hospital } from 'lucide-react';

const css = `
  .how-it-works {
    padding: 80px 24px 100px;
    background: #F8FAFD;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
  }
  .hiw__container {
    max-width: 1400px;
    margin: 0 auto;
  }
  .hiw__header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 80px;
  }
  .hiw__title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    font-weight: 700;
    color: #1a3a6b;
    margin-bottom: 16px;
  }
  .hiw__subtitle {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
  }
  
  .hiw__steps {
    display: flex;
    justify-content: space-between;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }
  .hiw__steps::before {
    content: '';
    position: absolute;
    top: 60px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: #E6EAF0;
    z-index: 1;
  }
  .hiw__step {
    flex: 1;
    text-align: center;
    position: relative;
    z-index: 2;
    padding: 0 24px;
  }
  .hiw__icon-wrapper {
    width: 120px;
    height: 120px;
    background: #fff;
    border-radius: 50%;
    margin: 0 auto 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    box-shadow: 0 16px 32px rgba(10,46,115,0.06);
    border: 4px solid #fff;
    position: relative;
    transition: transform 0.3s;
  }
  .hiw__step:hover .hiw__icon-wrapper {
    transform: translateY(-8px);
    border-color: #1BA94C;
  }
  .hiw__step-num {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 32px;
    height: 32px;
    background: #1BA94C;
    color: #fff;
    border-radius: 50%;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border: 2px solid #fff;
  }
  .hiw__step-title {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #1A1A1A;
    margin-bottom: 12px;
  }
  .hiw__step-desc {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .hiw__steps { flex-direction: column; gap: 48px; }
    .hiw__steps::before { display: none; }
  }
`;

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <style>{css}</style>
      <section className="how-it-works">
        <div className="hiw__container">
          <motion.div 
            className="hiw__header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="hiw__title">How It Works</h2>
            <p className="hiw__subtitle">
              Getting started with NOVAMAX is incredibly simple. Follow these three steps to unlock affordable healthcare for your entire family.
            </p>
          </motion.div>
          
          <motion.div 
            className="hiw__steps"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="hiw__step" variants={itemVariants}>
              <div className="hiw__icon-wrapper" style={{ color: '#1a3a6b' }}>
                <Smartphone size={48} />
                <span className="hiw__step-num">1</span>
              </div>
              <h3 className="hiw__step-title">Register & Choose Plan</h3>
              <p className="hiw__step-desc">
                Download the app or visit our website. Fill in your details and select a membership plan (Silver, Gold, or Premium) that fits your family's needs.
              </p>
            </motion.div>
            
            <motion.div className="hiw__step" variants={itemVariants}>
              <div className="hiw__icon-wrapper" style={{ color: '#1a3a6b' }}>
                <CreditCard size={48} />
                <span className="hiw__step-num">2</span>
              </div>
              <h3 className="hiw__step-title">Get Your Health Card</h3>
              <p className="hiw__step-desc">
                Your digital Health Card is instantly activated in the app. A premium physical card will also be dispatched to your registered address.
              </p>
            </motion.div>

            <motion.div className="hiw__step" variants={itemVariants}>
              <div className="hiw__icon-wrapper" style={{ color: '#1a3a6b' }}>
                <Hospital size={48} />
                <span className="hiw__step-num">3</span>
              </div>
              <h3 className="hiw__step-title">Avail Massive Discounts</h3>
              <p className="hiw__step-desc">
                Present your card at any of our 100+ partner hospitals, clinics, and pharmacies to instantly receive up to 50% off on your medical bills.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
