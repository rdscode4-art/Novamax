import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const css = `
  .work {
    padding: 42px 24px;
    background: #fff;
  }
  .work__container {
    max-width: 1400px;
    margin: 0 auto;
  }
  .work__header {
    text-align: center;
    margin-bottom: 40px;
  }
  .work__title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-bottom: 8px;
  }
  .work__title-wrapper::before,
  .work__title-wrapper::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
  .work__title {
    font-size: 24px;
    font-weight: 900;
    color: #1a3a6b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
    white-space: nowrap;
  }
  .work__subtitle {
    font-size: 14px;
    color: #555;
    margin: 0;
    font-weight: 500;
  }
  .work__grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
  }
  .work__card {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    border: 1px solid #eaeaea;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    cursor: pointer;
  }
  .work__card:hover {
    border-color: #2e7d32;
    box-shadow: 0 6px 16px rgba(46,125,50,0.12);
    transform: translateY(-4px);
  }
  .work__card-top {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
    min-height: 50px;
  }
  .work__card-icon {
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .work__card-name {
    font-size: 13px;
    font-weight: 700;
    color: #1a3a6b;
    margin: 0;
    line-height: 1.25;
    text-align: left;
    white-space: pre-line;
  }
  .work__card-btn {
    background: #2e7d32;
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    width: 100%;
    transition: background 0.2s;
    text-align: center;
    text-decoration: none;
    display: block;
  }
  .work__card-btn:hover { background: #1b5e20; }
  @media (max-width: 1024px) {
    .work__grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 560px) {
    .work__grid { grid-template-columns: repeat(2, 1fr); }
    .work__title { font-size: 18px; }
  }
`;

const roles = [
  { icon: '👨‍⚕️', name: 'Doctor\nPartner',        link: '/vendor-partnership' },
  { icon: '🏥',    name: 'Hospital\nPartner',      link: '/vendor-partnership' },
  { icon: '🙋',    name: 'Volunteer\nWith Us',     link: '/contact' },
  { icon: '🏪',    name: 'Medical Store\nPartner', link: '/vendor-partnership' },
  { icon: '👩‍⚕️', name: 'Health\nCoordinator',   link: '/contact' },
  { icon: '👩‍💼', name: 'NGO\nRepresentative',    link: '/contact' },
];

// Alternate cards: even from left, odd from right
const getDirection = (index) => (index % 2 === 0 ? -80 : 80);

export default function WorkWithUs() {
  return (
    <>
      <style>{css}</style>
      <section className="work">
        <div className="work__container">
          <div className="section-heading">
            <div className="section-heading__label">Join Our Mission</div>
            <h2 className="section-heading__title">Work With Us</h2>
            <div className="section-heading__underline"></div>
            <p className="section-heading__subtitle">Join hands with us to serve humanity and make healthcare accessible for all.</p>
          </div>
          <div className="work__grid">
            {roles.map((role, index) => (
              <motion.div
                key={role.name.replace('\n', '')}
                className="work__card"
                initial={{ opacity: 0, x: getDirection(index) }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <div className="work__card-top">
                  <div className="work__card-icon">{role.icon}</div>
                  <p className="work__card-name">{role.name}</p>
                </div>
                <Link to={role.link} className="work__card-btn">Apply Now</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
