import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const css = `
  .plans {
    padding: 100px 24px;
    background: var(--bg);
    font-family: var(--sans);
  }
  .plans__container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .plans__header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 64px;
  }
  .plans__title {
    font-family: var(--heading);
    font-size: 40px;
    font-weight: 700;
    color: var(--text-h);
    margin-bottom: 16px;
  }
  .plans__subtitle {
    font-size: 16px;
    color: var(--text);
    line-height: 1.6;
  }
  
  .plans__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    align-items: center;
  }
  .plans__card {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border-radius: var(--radius-xl);
    padding: 48px 32px;
    border: 1px solid var(--glass-border);
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: var(--shadow-md);
  }
  .plans__card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-premium);
    border-color: rgba(26, 58, 107, 0.1);
  }
  .plans__card--popular {
    border: 2px solid var(--secondary);
    transform: scale(1.05);
    box-shadow: 0 32px 64px var(--secondary-glow);
    background: #fff;
  }
  .plans__card--popular:hover {
    transform: scale(1.05) translateY(-8px);
  }
  .plans__badge {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--secondary);
    color: #fff;
    padding: 6px 16px;
    border-radius: 100px;
    font-family: var(--heading);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 12px var(--secondary-glow);
  }
  .plans__name {
    font-family: var(--heading);
    font-size: 24px;
    font-weight: 700;
    color: var(--text-h);
    margin-bottom: 16px;
    text-align: center;
  }
  .plans__price {
    text-align: center;
    margin-bottom: 32px;
  }
  .plans__currency {
    font-size: 24px;
    font-weight: 600;
    color: var(--primary);
    vertical-align: top;
  }
  .plans__amount {
    font-family: var(--heading);
    font-size: 56px;
    font-weight: 700;
    color: var(--primary);
    line-height: 1;
  }
  .plans__period {
    font-size: 16px;
    color: var(--text);
  }
  .plans__features {
    list-style: none;
    padding: 0;
    margin: 0 0 40px;
  }
  .plans__feature {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    color: var(--text);
    font-size: 15px;
  }
  .plans__feature-icon {
    color: var(--secondary);
    display: flex;
    align-items: center;
  }
  .plans__feature--disabled {
    color: #a0aec0;
  }
  .plans__feature--disabled .plans__feature-icon {
    color: #cbd5e0;
  }
  
  @media (max-width: 1024px) {
    .plans__grid { grid-template-columns: 1fr; gap: 48px; }
    .plans__card--popular { transform: none; }
    .plans__card--popular:hover { transform: translateY(-8px); }
  }
`;

export default function MembershipPlans() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <style>{css}</style>
      <section className="plans">
        <div className="plans__container">
          <motion.div 
            className="plans__header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="plans__title">Choose Your Health Plan</h2>
            <p className="plans__subtitle">
              Select the membership plan that best suits your family's needs. All plans include the digital NOVAMAX Health Card.
            </p>
          </motion.div>
          
          <motion.div 
            className="plans__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            {/* Silver Plan */}
            <motion.div variants={itemVariants} className="plans__card">
              <h3 className="plans__name">Silver Plan</h3>
              <div className="plans__price">
                <span className="plans__currency">₹</span>
                <span className="plans__amount">499</span>
                <span className="plans__period">/year</span>
              </div>
              <ul className="plans__features">
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  1 Member Coverage
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Digital Health Card
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Up to 30% OPD Discount
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  15% Pharmacy Discount
                </li>
                <li className="plans__feature plans__feature--disabled">
                  <span className="plans__feature-icon"><XCircle size={18}/></span>
                  Physical Health Card
                </li>
                <li className="plans__feature plans__feature--disabled">
                  <span className="plans__feature-icon"><XCircle size={18}/></span>
                  IPD/Surgery Discounts
                </li>
              </ul>
              <a href="/contact" className="premium-btn" style={{ width: '100%', border: '2px solid var(--border)', color: 'var(--text-h)' }}>Get Silver</a>
            </motion.div>

            {/* Gold Plan */}
            <motion.div variants={itemVariants} className="plans__card plans__card--popular">
              <div className="plans__badge">Most Popular</div>
              <h3 className="plans__name">Gold Plan</h3>
              <div className="plans__price">
                <span className="plans__currency">₹</span>
                <span className="plans__amount">999</span>
                <span className="plans__period">/year</span>
              </div>
              <ul className="plans__features">
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Up to 4 Family Members
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Digital & Physical Card
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Up to 50% OPD Discount
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  20% Pharmacy Discount
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  10% IPD/Surgery Discount
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  24/7 Priority Support
                </li>
              </ul>
              <a href="/contact" className="premium-btn premium-btn-primary" style={{ width: '100%' }}>Get Gold</a>
            </motion.div>

            {/* Premium Plan */}
            <motion.div variants={itemVariants} className="plans__card">
              <h3 className="plans__name">Premium Plan</h3>
              <div className="plans__price">
                <span className="plans__currency">₹</span>
                <span className="plans__amount">1499</span>
                <span className="plans__period">/year</span>
              </div>
              <ul className="plans__features">
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Up to 6 Family Members
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Premium Metal Health Card
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Up to 50% OPD Discount
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  25% Pharmacy Discount
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  20% IPD/Surgery Discount
                </li>
                <li className="plans__feature">
                  <span className="plans__feature-icon"><CheckCircle2 size={18}/></span>
                  Free Annual Health Checkup
                </li>
              </ul>
              <a href="/contact" className="premium-btn" style={{ width: '100%', border: '2px solid var(--border)', color: 'var(--text-h)' }}>Get Premium</a>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
}
