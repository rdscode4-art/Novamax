const css = `
  .hb {
    padding: 60px 24px;
    background: var(--bg);
  }
  .hb__container {
    max-width: 1400px;
    margin: 0 auto;
  }
  .hb__title {
    text-align: center;
    margin: 0 0 50px;
  }
  .hb__grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 16px;
  }
  .hb__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border-radius: var(--radius-lg);
    padding: 24px 10px;
    border: 1px solid var(--border);
    text-align: center;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    cursor: default;
    box-shadow: var(--shadow-sm);
  }
  .hb__card:hover {
    border-color: var(--secondary);
    box-shadow: var(--shadow-premium);
    transform: translateY(-6px);
  }
  .hb__card-icon {
    color: var(--primary);
    margin-bottom: 8px;
    transition: transform 0.3s ease;
  }
  .hb__card:hover .hb__card-icon {
    transform: scale(1.1) rotate(5deg);
    color: var(--secondary);
  }
  .hb__card-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-h);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .hb__card-discount {
    font-size: 12px;
    color: var(--secondary);
    font-weight: 700;
    line-height: 1.4;
  }
  @media (max-width: 1200px) {
    .hb__grid { grid-template-columns: repeat(5, 1fr); gap: 16px; }
  }
  @media (max-width: 768px) {
    .hb__grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 480px) {
    .hb__grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Bed, Pill, Activity, Scan, HeartPulse, Baby, Scissors, Syringe, Crosshair } from 'lucide-react';

const benefits = [
  { icon: <Stethoscope size={32} />, name: 'OPD',        discount: '30% - 100%\nDiscount' },
  { icon: <Bed size={32} />, name: 'IPD',        discount: '20% - 40%\nDiscount' },
  { icon: <Pill size={32} />, name: 'Medicines',  discount: '20% - 60%\nDiscount' },
  { icon: <Scan size={32} />, name: 'X-Ray',      discount: '25% - 30%\nDiscount' },
  { icon: <Activity size={32} />, name: 'Ultrasound', discount: '30% - 50%\nDiscount' },
  { icon: <HeartPulse size={32} />, name: 'ECG',        discount: '30% - 40%\nDiscount' },
  { icon: <Baby size={32} />, name: 'Delivery',   discount: '25% - 40%\nDiscount' },
  { icon: <Scissors size={32} />, name: 'Surgery',    discount: '25% - 40%\nDiscount' },
  { icon: <Syringe size={32} />, name: 'Blood Tests', discount: '30% - 50%\nDiscount' },
  { icon: <Crosshair size={32} />, name: 'Other\nSolution', discount: '20% - 30%\nDiscount' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function HealthBenefits() {
  return (
    <>
      <style>{css}</style>
      <section className="hb">
        <div className="hb__container">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hb__title"
          >
            Health Benefits With Novamax Health Card
          </motion.h2>
          
          <motion.div 
            className="hb__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {benefits.map((b) => (
              <motion.div key={b.name} variants={itemVariants} className="hb__card">
                <span className="hb__card-icon">{b.icon}</span>
                <span className="hb__card-name">{b.name}</span>
                <span className="hb__card-discount" style={{ whiteSpace: 'pre-line' }}>{b.discount}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
