const css = `
  .hb {
    padding: 80px 20px;
    background: #f4f7f9;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
  }
  
  /* Soft background pattern */
  .hb::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.3;
    pointer-events: none;
  }

  .hb__container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  
  .hb__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-top: 50px;
  }
  
  .hb__card {
    background: #ffffff;
    border-radius: 16px;
    padding: 30px 16px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .hb__card:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 30px rgba(0,150,255,0.15);
  }
  
  /* Top Right Colorful Corner */
  .hb__card-corner {
    position: absolute;
    top: -30px;
    right: -30px;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #06b6d4 0%, #2563eb 100%);
    transform: rotate(45deg);
    transition: transform 0.3s ease;
  }
  
  .hb__card:hover .hb__card-corner {
    transform: rotate(45deg) scale(1.2);
  }
  
  .hb__card-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2563eb;
    margin-bottom: 16px;
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }
  
  .hb__card:hover .hb__card-icon {
    background: #2563eb;
    color: #ffffff;
    box-shadow: 0 8px 20px rgba(37,99,235,0.3);
  }
  
  .hb__card-name {
    font-size: 15px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .hb__card-desc {
    font-size: 12px;
    color: #64748b;
    line-height: 1.4;
    margin-bottom: 20px;
    height: 34px; /* Fixed height to keep pills aligned */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .hb__card-discount {
    width: 100%;
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(90deg, #10b981 0%, #0284c7 100%);
    padding: 8px 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    box-shadow: 0 4px 10px rgba(16,185,129,0.2);
    transition: all 0.3s ease;
  }
  
  .hb__card:hover .hb__card-discount {
    box-shadow: 0 6px 15px rgba(16,185,129,0.4);
    transform: scale(1.02);
  }

  /* Responsive styling */
  @media (max-width: 1200px) {
    .hb__grid { grid-template-columns: repeat(4, 1fr); }
  }
  @media (max-width: 992px) {
    .hb__grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 768px) {
    .hb__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    .hb { padding: 60px 16px; }
    .hb__card-desc { height: auto; min-height: 34px; }
  }
  @media (max-width: 480px) {
    .hb__grid { grid-template-columns: 1fr; }
  }
`;

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Bed, Pill, Activity, Scan, HeartPulse, Baby, Scissors, Syringe, Crosshair, Tag } from 'lucide-react';

const benefits = [
  { icon: <Stethoscope size={32} strokeWidth={2} />, name: 'OPD', desc: 'Expert consultation for your better health', discount: '30% - 100% Discount' },
  { icon: <Bed size={32} strokeWidth={2} />, name: 'IPD', desc: 'Quality care with comfortable stay', discount: '20% - 40% Discount' },
  { icon: <Pill size={32} strokeWidth={2} />, name: 'MEDICINES', desc: 'Genuine medicines at affordable price', discount: '20% - 60% Discount' },
  { icon: <Scan size={32} strokeWidth={2} />, name: 'X-RAY', desc: 'Accurate imaging for faster diagnosis', discount: '25% - 30% Discount' },
  { icon: <Activity size={32} strokeWidth={2} />, name: 'ULTRASOUND', desc: 'Advanced scanning for better care', discount: '30% - 50% Discount' },
  { icon: <HeartPulse size={32} strokeWidth={2} />, name: 'ECG', desc: 'Track your heart health with precision', discount: '20% - 40% Discount' },
  { icon: <Baby size={32} strokeWidth={2} />, name: 'DELIVERY', desc: 'Safe & caring experience for mother and baby', discount: '25% - 40% Discount' },
  { icon: <Scissors size={32} strokeWidth={2} />, name: 'SURGERY', desc: 'Advanced procedures with expert specialists', discount: '25% - 40% Discount' },
  { icon: <Syringe size={32} strokeWidth={2} />, name: 'BLOOD TESTS', desc: 'Reliable reports for better treatment', discount: '30% - 50% Discount' },
  { icon: <Crosshair size={32} strokeWidth={2} />, name: 'OTHER SOLUTIONS', desc: 'Complete healthcare support for your needs', discount: '20% - 30% Discount' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: (i) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    return { 
      opacity: 0, 
      x: isMobile ? (i % 2 === 0 ? -80 : 80) : 0,
      y: isMobile ? 0 : 30 
    };
  },
  show: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    transition: { type: 'spring', stiffness: 250, damping: 25 } 
  }
};

export default function HealthBenefits() {
  return (
    <>
      <style>{css}</style>
      <section className="hb">
        <div className="hb__container">
          <motion.div 
            className="section-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="section-heading__label" style={{ color: '#0284c7', background: '#e0f2fe', display: 'inline-block', padding: '6px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '13px', marginBottom: '16px' }}>Exclusive Privileges</div>
            <h2 className="section-heading__title" style={{ color: '#0f172a', fontSize: '36px', fontWeight: 900, marginBottom: '16px' }}>Health Benefits With Novamax</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b', fontSize: '16px', lineHeight: '1.6' }}>
              Unlock massive savings on medical treatments, diagnostics, and everyday medicines with your dedicated Novamax Health Card.
            </p>
          </motion.div>
          
          <motion.div 
            className="hb__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {benefits.map((b, index) => (
              <motion.div key={b.name} custom={index} variants={itemVariants} className="hb__card">
                <div className="hb__card-corner"></div>
                
                <div className="hb__card-icon">
                  {b.icon}
                </div>
                
                <div className="hb__card-name">{b.name}</div>
                <div className="hb__card-desc">{b.desc}</div>
                
                <div className="hb__card-discount">
                  <Tag size={14} />
                  {b.discount}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
