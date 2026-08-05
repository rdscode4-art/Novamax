import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';
import PageHero from '../components/common/PageHero';
import api from '../services/api';

const css = `
  .cert-page { font-family: 'Inter', sans-serif; }

  /* ── Section heading ── */
  .cert__section-head {
    text-align: center;
    padding: 70px 24px 0;
    background: #f8fafc;
  }
  .cert__section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(27,169,76,0.1);
    color: #1BA94C;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 30px;
    margin-bottom: 16px;
  }
  .cert__section-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 900;
    color: #1a3a6b;
    margin: 0 0 12px;
  }
  .cert__section-title span { color: #1BA94C; }
  .cert__section-bar {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #1a3a6b, #1BA94C);
    border-radius: 4px;
    margin: 0 auto 16px;
  }
  .cert__section-sub {
    font-size: 15px;
    color: #666;
    max-width: 560px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* ── Main grid ── */
  .cert__content {
    padding: 48px 24px 80px;
    background: #f8fafc;
  }
  .cert__grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 28px;
  }

  /* ── Card ── */
  .cert__card {
    background: #fff;
    border-radius: 24px;
    padding: 40px 28px 32px;
    border: 1.5px solid #e8eef5;
    text-align: center;
    position: relative;
    overflow: hidden;
    transition: all 0.35s ease;
    cursor: default;
  }
  .cert__card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--card-color, #1a3a6b), #1BA94C);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  .cert__card:hover {
    transform: translateY(-10px);
    box-shadow: 0 28px 56px rgba(26,58,107,0.12);
    border-color: transparent;
  }
  .cert__card:hover::after { transform: scaleX(1); }

  /* Number badge */
  .cert__num {
    position: absolute;
    top: 16px;
    right: 20px;
    font-family: 'Poppins', sans-serif;
    font-size: 48px;
    font-weight: 900;
    color: rgba(26,58,107,0.06);
    line-height: 1;
    pointer-events: none;
  }

  /* Icon */
  .cert__icon-wrap {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    margin: 0 auto 24px;
    position: relative;
  }
  .cert__icon-wrap::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px dashed rgba(26,58,107,0.15);
    animation: spinSlow 12s linear infinite;
  }
  @keyframes spinSlow { to { transform: rotate(360deg); } }

  .cert__badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(27,169,76,0.1);
    color: #1BA94C;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 4px 12px;
    border-radius: 30px;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
  .cert__title {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #1a3a6b;
    margin: 0 0 12px;
  }
  .cert__desc {
    font-size: 13.5px;
    color: #666;
    line-height: 1.65;
    margin: 0 0 24px;
  }
  .cert__btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    border-radius: 30px;
    background: transparent;
    border: 2px solid #1a3a6b;
    color: #1a3a6b;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.25s ease;
  }
  .cert__btn:hover {
    background: #1a3a6b;
    color: #fff;
    box-shadow: 0 8px 20px rgba(26,58,107,0.3);
  }

  /* ── Trust Banner ── */
  .cert__trust {
    background: linear-gradient(135deg, #1a3a6b 0%, #0d2247 100%);
    padding: 60px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cert__trust::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 240px; height: 240px;
    background: rgba(255,255,255,0.04);
    border-radius: 50%;
  }
  .cert__trust::after {
    content: '';
    position: absolute;
    bottom: -80px; left: -40px;
    width: 300px; height: 300px;
    background: rgba(27,169,76,0.06);
    border-radius: 50%;
  }
  .cert__trust-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 800;
    color: #fff;
    margin: 0 0 12px;
  }
  .cert__trust-sub {
    font-size: 15px;
    color: rgba(255,255,255,0.7);
    margin: 0 0 32px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  .cert__trust-stats {
    display: flex;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
  }
  .cert__trust-stat {}
  .cert__trust-stat-num {
    font-family: 'Poppins', sans-serif;
    font-size: 32px;
    font-weight: 900;
    color: #1BA94C;
    line-height: 1;
    display: block;
  }
  .cert__trust-stat-label {
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 1024px) { .cert__grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) {
    .cert__content { padding: 36px 16px 56px; }
    .cert__section-head { padding: 48px 16px 0; }
    .cert__section-title { font-size: 1.5rem; }
    .cert__trust { padding: 40px 16px; }
    .cert__trust-title { font-size: 1.3rem; }
    .cert__trust-sub { font-size: 13px; margin-bottom: 24px; }
    .cert__trust-stat-num { font-size: 26px; }
  }
  @media (max-width: 640px) {
    .cert__grid { grid-template-columns: 1fr; }
    .cert__trust-stats { gap: 20px; }
    .cert__card { padding: 28px 20px 24px; }
  }
  @media (max-width: 480px) {
    .cert__section-head { padding: 36px 14px 0; }
    .cert__trust { padding: 32px 14px; }
    .cert__trust-stats { gap: 16px; }
    .cert__trust-stat-num { font-size: 22px; }
  }
`;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } },
});

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await api.get('/certificates');
        if (res.data?.success) {
          setCerts(res.data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="cert-page">
        <PageHero
          title="Our Trust & Certifications"
          subtitle="Officially registered and recognized by Government of India. 100% transparent operations with full legal compliance."
          icon="🏆"
          bgGradient="linear-gradient(135deg, #1a3a6b 0%, #0d2247 100%)"
        />

        {/* Section header */}
        <motion.div
          className="cert__section-head"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="cert__section-label">Verified & Trusted</div>
          <h2 className="cert__section-title">Legal <span>Registrations</span> & Certifications</h2>
          <div className="cert__section-bar"></div>
          <p className="cert__section-sub">
            Every certification below is a testament to our commitment to transparency, accountability, and excellence in healthcare.
          </p>
        </motion.div>

        {/* Cards grid */}
        <section className="cert__content">
          <div className="cert__grid">
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>Loading certificates...</div>
            ) : certs.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>No certificates found.</div>
            ) : certs.map((c, i) => (
              <motion.div
                key={c._id || i}
                className="cert__card"
                style={{ '--card-color': c.color }}
                variants={fadeUp(i * 0.08)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
              >
                <span className="cert__num">0{i + 1}</span>
                <div className="cert__icon-wrap" style={{ background: c.bg }}>
                  {c.icon}
                </div>
                <div className="cert__badge">✔ {c.badge}</div>
                <h3 className="cert__title">{c.title}</h3>
                <p className="cert__desc">{c.desc}</p>
                {c.fileUrl ? (
                  <a href={c.fileUrl.startsWith('http') ? c.fileUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${c.fileUrl}`} target="_blank" rel="noreferrer" className="cert__btn">
                    View Certificate →
                  </a>
                ) : (
                  <span className="cert__btn" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    View Certificate →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust stats banner */}
        <motion.section
          className="cert__trust"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="cert__trust-title">Built on Trust, Backed by Government</h2>
          <p className="cert__trust-sub">Our certifications ensure you're always protected under the highest legal and medical standards.</p>
          <div className="cert__trust-stats">
            {[
              { num: '6+', label: 'Certifications' },
              { num: '50K+', label: 'Happy Members' },
              { num: '500+', label: 'Partner Hospitals' },
              { num: '100%', label: 'Transparent' },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="cert__trust-stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="cert__trust-stat-num">{s.num}</span>
                <span className="cert__trust-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <FooterBanner />
        <FooterSection />
      </div>
    </>
  );
}
