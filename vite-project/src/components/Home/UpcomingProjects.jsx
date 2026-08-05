import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

const css = `
  .upcoming-section {
    padding: 60px 20px;
    background: #f8fafc;
    overflow: hidden;
  }
  
  .upcoming-container {
    max-width: 1300px;
    margin: 0 auto;
  }

  /* Header Styles */
  .upcoming-header {
    text-align: center;
    margin-bottom: 50px;
  }
  .upcoming-pre-title {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #1a3a6b;
    margin: 0;
    line-height: 1.2;
    text-transform: uppercase;
  }
  .upcoming-title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    font-weight: 900;
    color: #2f7a35;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .upcoming-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .upcoming-divider::before,
  .upcoming-divider::after {
    content: '';
    height: 1px;
    width: 60px;
    background: #2f7a35;
  }
  .upcoming-divider svg {
    width: 24px;
    height: 24px;
    fill: #2f7a35;
  }
  .upcoming-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #555;
    font-weight: 500;
    margin: 0;
  }
  .upcoming-subtitle strong {
    color: #2f7a35;
  }

  /* Grid Layout */
  .upcoming-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 20px 0;
  }

  /* Card Styles */
  .uc-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    position: relative;
    border: 2px solid transparent;
    overflow: hidden;
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
    cursor: pointer;
  }
  .uc-card:hover {
    transform: translateY(-6px);
    border-color: var(--card-color, #ccc);
    background: linear-gradient(160deg, #fff 60%, color-mix(in srgb, var(--card-color, #ccc) 8%, white));
    box-shadow: 0 16px 40px color-mix(in srgb, var(--card-color, #ccc) 35%, transparent);
  }
  .uc-card:hover .uc-card-icon-area {
    background: color-mix(in srgb, var(--card-color, #ccc) 15%, white);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--card-color, #ccc) 20%, transparent);
    transform: scale(1.08);
  }
  .uc-card:hover .uc-card-desc {
    color: #333;
  }
  .uc-card-icon-area {
    transition: background 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease;
  }

  .uc-card-badge {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 16px;
    padding: 8px 12px 14px;
    border-bottom-right-radius: 20px;
    clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
    min-width: 45px;
    text-align: center;
  }

  .uc-card-body {
    display: flex;
    padding: 40px 20px 30px;
    gap: 16px;
    flex: 1;
    align-items: center;
  }

  .uc-card-icon-area {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 40px;
    box-shadow: inset 0 4px 10px rgba(0,0,0,0.05);
  }

  .uc-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .uc-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.3;
    margin: 0 0 8px 0;
    text-transform: uppercase;
  }

  .uc-card-line {
    width: 30px;
    height: 3px;
    border-radius: 2px;
    margin-bottom: 12px;
  }

  .uc-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #555;
    line-height: 1.5;
    margin: 0;
  }

  .uc-card-footer {
    padding: 12px 16px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
  }
  .uc-card-footer svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }

  @media (max-width: 1024px) {
    .upcoming-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    .upcoming-grid {
      grid-template-columns: 1fr;
    }
    .upcoming-title {
      font-size: 32px;
    }
  }
`;

// Fallback data in case API is unavailable
const fallbackProjects = [
  { id: '01', title: '₹10/- MEDICINE CENTRE', desc: 'Quality medicines available at just ₹10 to make healthcare affordable for all.', icon: '💊', footerText: 'Affordable Medicines • Better Health', color: '#1a3a6b' },
  { id: '02', title: 'HEALTH & WELLNESS PROGRAM', desc: 'Promoting a healthier lifestyle through awareness, fitness, nutrition and regular checkups.', icon: '🧘‍♀️', footerText: 'Healthy Living • Happy Life', color: '#057a55' },
  { id: '03', title: 'AI X-RAY CHECKUP MACHINE', desc: 'Advanced AI-powered X-Ray technology for accurate and instant medical diagnostics.', icon: '🩺', footerText: 'Smart Diagnostics • Instant Results', color: '#ea580c' },
  { id: '04', title: 'NOVAMAX DISCOUNT MEDICAL STORE', desc: 'Providing essential healthcare products and medical supplies at heavily discounted rates.', icon: '🏪', footerText: 'Discounted Prices • Quality Care', color: '#7c3aed' },
  { id: '05', title: 'ALCOHOL-FREE LIFE PROGRAM', desc: 'Comprehensive rehabilitation and awareness program to help individuals overcome addiction.', icon: '🚫', footerText: 'Addiction Free • Better Future', color: '#0891b2' },
  { id: '06', title: 'CONTROL RATE GROCERY STORE', desc: 'Ensuring food security by providing daily essential groceries at controlled and affordable rates.', icon: '🛒', footerText: 'Affordable Groceries • Food Security', color: '#d97706' },
  { id: '07', title: 'FREE HOME TUITION CENTRE', desc: 'Quality education and free tutoring services brought directly to students at their homes.', icon: '📚', footerText: 'Free Education • Bright Future', color: '#e11d48' },
  { id: '08', title: 'ZERO INTEREST LOAN FACILITIES', desc: 'Empowering small businesses and individuals with interest-free financial support.', icon: '💰', footerText: 'Financial Support • Zero Interest', color: '#2f7a35' },
  { id: '09', title: 'FREE JAN SEVA KENDRA', desc: 'A dedicated center providing free access to essential government and digital services.', icon: '🏛️', footerText: 'Digital Services • Public Welfare', color: '#0ea5e9' },
  { id: '10', title: 'WOMEN INCOME SOURCE PROGRAM', desc: 'Empowering women with skill development and sustainable income generation opportunities.', icon: '👩‍💼', footerText: 'Women Empowerment • Independence', color: '#db2777' }
];

export default function UpcomingProjects() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        if (res.data?.success && res.data.data?.length > 0) {
          // Map backend fields to component fields
          const mapped = res.data.data.map(p => ({
            id: p.serialNumber,
            title: p.title,
            desc: p.description,
            icon: p.icon,
            footerText: p.footerText,
            color: p.color,
          }));
          setProjects(mapped);
        }
      } catch (err) {
        // Silently fall back to static data
        console.warn('Failed to fetch projects, using fallback data');
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="upcoming-section">
      <style>{css}</style>
      <div className="upcoming-container">
        
        {/* Header */}
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="section-heading__label">Our Initiatives</div>
          <h2 className="section-heading__title">Upcoming Projects</h2>
          <div className="section-heading__underline"></div>
          <p className="section-heading__subtitle">Innovative initiatives for a <strong>Better, Healthier &amp; Empowered</strong> Society.</p>
        </motion.div>

        {/* Grid Layout */}
        <div className="upcoming-grid">
          {projects.map((item, index) => (
            <motion.div
              className="uc-card"
              key={item.id}
              style={{ '--card-color': item.color }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-50px' }}
            >
              
              <div className="uc-card-badge" style={{ background: item.color }}>
                {item.id}
              </div>

              <div className="uc-card-body">
                <div className="uc-card-icon-area">
                  {item.icon}
                </div>
                <div className="uc-card-content">
                  <h3 className="uc-card-title" style={{ color: item.color }}>{item.title}</h3>
                  <div className="uc-card-line" style={{ background: item.color }}></div>
                  <p className="uc-card-desc">{item.desc}</p>
                </div>
              </div>

              <div className="uc-card-footer" style={{ background: item.color }}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {item.footerText}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

