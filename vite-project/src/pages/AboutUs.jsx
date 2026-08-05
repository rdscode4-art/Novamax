import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, Lightbulb, Handshake, Users, Award, TrendingUp, Building2, Headset, UserRoundSearch, CheckCircle2, ArrowUp, ChevronRight } from 'lucide-react';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';
import PageHero from '../components/common/PageHero';
import ourStoryImg from '../assets/novamax_our_story.png';
import aboutCollage2 from '../assets/about_collage_2.png';

const css = `
  .about-page {
    font-family: 'Inter', sans-serif;
    color: #333;
    background: #f4f7fb;
    overflow-x: hidden;
  }

  /* --- NEW ABOUT HERO SECTION --- */
  .about-hero-section {
    padding: 100px 24px;
    background: #fff;
    overflow: hidden;
  }
  .about-hero-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 60px;
  }
  
  /* Left Collage */
  .about-collage {
    flex: 1;
    position: relative;
    padding-left: 40px;
    padding-bottom: 60px;
  }
  @keyframes rotateShape {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .collage-shape-blue {
    position: absolute;
    top: 0px; left: -40px;
    width: 160px; height: 160px;
    border: 14px dotted #2ea1ff;
    border-radius: 50%;
    z-index: 0;
    transform-origin: center center;
    animation: rotateShape 20s linear infinite;
  }
  .collage-shape-dots {
    position: absolute;
    bottom: -10px; left: 0px;
    width: 120px; height: 120px;
    background-image: radial-gradient(#d1d5db 20%, transparent 20%);
    background-size: 20px 20px;
    z-index: 0;
    transform: rotate(45deg);
  }
  .collage-img-main {
    position: relative;
    width: 90%;
    height: 480px;
    object-fit: cover;
    z-index: 1;
    border-radius: 10px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  .collage-img-main:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    z-index: 3;
  }
  .collage-img-sec {
    position: absolute;
    bottom: 30px;
    right: -20px;
    width: 65%;
    height: 280px;
    object-fit: cover;
    z-index: 2;
    border: 10px solid #fff;
    border-radius: 10px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  .collage-img-sec:hover {
    transform: scale(1.05);
    box-shadow: 0 30px 60px rgba(0,0,0,0.15);
    z-index: 3;
  }
  .collage-badge {
    position: absolute;
    bottom: 100px;
    left: 0;
    width: 160px; height: 160px;
    background: #0b224e;
    color: #fff;
    border: 12px solid #fff;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 3;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
  .collage-badge-num { font-size: 36px; font-weight: 800; font-family: 'Poppins'; line-height: 1.1; }
  .collage-badge-text { font-size: 13px; font-weight: 500; }
  
  .collage-vertical-btn {
    position: absolute;
    top: 50%;
    right: -40px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 4;
  }
  .vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-weight: 700;
    color: #0b224e;
    margin-bottom: 15px;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .vertical-icon {
    width: 44px; height: 44px;
    background: #2ea1ff;
    color: #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 20px rgba(46,161,255,0.4);
  }

  /* Right Content */
  .about-content {
    flex: 1;
    padding-left: 20px;
  }
  .content-subtitle {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #2ea1ff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }
  .content-subtitle::before {
    content: '';
    width: 20px; height: 3px;
    background: #2ea1ff;
    display: inline-block;
  }
  .content-title {
    font-family: 'Poppins', sans-serif;
    font-size: 44px;
    font-weight: 800;
    color: #222;
    line-height: 1.2;
    margin-bottom: 24px;
  }
  .content-desc {
    color: #666;
    line-height: 1.8;
    margin-bottom: 40px;
    font-size: 15px;
  }
  
  .content-features {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
  }
  .feature-item {
    flex: 1;
  }
  .feature-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }
  .feature-icon-box {
    width: 56px; height: 56px;
    background: #f8f9fc;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #0b224e;
  }
  .feature-title {
    font-weight: 800;
    color: #222;
    font-size: 18px;
    font-family: 'Poppins';
  }
  .feature-desc {
    color: #777;
    font-size: 14px;
    line-height: 1.7;
  }
  
  .content-divider {
    height: 1px;
    background: #e5e7eb;
    width: 100%;
    margin-bottom: 25px;
    position: relative;
  }
  .content-divider::before {
    content: '';
    position: absolute;
    left: 20%;
    top: 0;
    width: 60px;
    height: 1px;
    background: #2ea1ff;
  }
  
  .content-check-row {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 40px;
  }
  .check-icon {
    color: #0b224e;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .check-text {
    color: #555;
    font-size: 15px;
    line-height: 1.6;
  }
  .check-text a {
    color: #2ea1ff;
    font-weight: 700;
    text-decoration: none;
    margin-left: 5px;
  }
  .check-text a:hover { text-decoration: underline; }
  
  .content-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #2ea1ff;
    color: #fff;
    padding: 16px 36px;
    border-radius: 40px;
    font-weight: 700;
    font-size: 15px;
    text-decoration: none;
    transition: all 0.3s;
  }
  .content-btn:hover {
    background: #0b224e;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(11, 34, 78, 0.2);
  }

  /* Mission & Vision */
  .about__mv {
    padding: 100px 24px;
    background: #0A1930;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .about__mv::after {
    content: '';
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle at center, rgba(31,94,255,0.1) 0%, transparent 60%);
    pointer-events: none;
  }
  .about__mv-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    position: relative;
    z-index: 2;
  }
  .about__mv-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 56px;
    border-radius: 32px;
    transition: all 0.4s ease;
  }
  .about__mv-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .about__mv-icon-wrapper {
    width: 72px;
    height: 72px;
    background: linear-gradient(135deg, rgba(31,94,255,0.2), rgba(31,94,255,0));
    border: 1px solid rgba(31,94,255,0.4);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
    color: #4facfe;
  }
  .icon-green-gradient { background: linear-gradient(135deg, rgba(27,169,76,0.2), rgba(27,169,76,0)); border-color: rgba(27,169,76,0.4); color: #1BA94C; }
  .about__mv-title {
    font-family: 'Poppins', sans-serif;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .about__mv-text {
    font-size: 16px;
    color: #cbd5e1;
    line-height: 1.8;
  }

  /* Impact Section */
  .about__impact {
    padding: 120px 24px;
    background: #fff;
    text-align: center;
  }
  .about__impact-grid {
    max-width: 1280px;
    margin: 60px auto 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
  .about__impact-card {
    padding: 40px 24px;
    background: #f4f7fb;
    border-radius: 24px;
    border: 1px solid rgba(0,0,0,0.02);
    transition: all 0.3s ease;
  }
  .about__impact-card:hover {
    background: #fff;
    box-shadow: 0 20px 40px rgba(0,0,0,0.06);
    transform: translateY(-5px);
  }
  .about__impact-icon {
    width: 56px;
    height: 56px;
    margin: 0 auto 20px;
    background: #e9f2eb;
    color: #1BA94C;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
  }
  .about__impact-number {
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: #0A1930;
    margin-bottom: 8px;
  }
  .about__impact-label {
    font-size: 15px;
    color: #666;
    font-weight: 500;
  }

  /* Values Section */
  .about__values {
    padding: 120px 24px;
    background: #f4f7fb;
    text-align: center;
  }
  .about__values-header {
    max-width: 800px;
    margin: 0 auto 60px;
  }
  .about__values-grid {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
  .about__value-card {
    padding: 40px 30px;
    background: #fff;
    border-radius: 24px;
    border: 1px solid rgba(0,0,0,0.03);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .about__value-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, #2563a8, #0A1930);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.4s ease;
  }
  .about__value-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px rgba(10, 25, 48, 0.15);
    color: #fff;
  }
  .about__value-card:hover::before {
    opacity: 1;
  }
  .about__value-card:hover .about__value-icon,
  .about__value-card:hover .about__value-title,
  .about__value-card:hover .about__value-desc {
    color: #fff;
  }
  .about__value-icon {
    margin-bottom: 24px;
    color: #2563a8;
    display: flex;
    justify-content: center;
    transition: color 0.4s ease;
  }
  .about__value-title {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #0A1930;
    margin-bottom: 12px;
    transition: color 0.4s ease;
  }
  .about__value-desc {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    transition: color 0.4s ease;
  }

  @media (max-width: 1024px) {
    .about-hero-container { flex-direction: column; gap: 48px; }
    .about-collage { width: 100%; padding-left: 20px; padding-bottom: 40px; margin-bottom: 20px; }
    .about-content { padding-left: 0; }
    .content-features { flex-direction: column; gap: 20px; }
    .about__mv-grid { grid-template-columns: 1fr; }
    .about__impact-grid, .about__values-grid { grid-template-columns: repeat(2, 1fr); }
    .about__values { padding: 72px 24px; }
  }
  @media (max-width: 640px) {
    .about__impact-grid, .about__values-grid { grid-template-columns: 1fr; }
    .content-title { font-size: 28px; }
    .collage-badge { width: 110px; height: 110px; left: 0; bottom: 60px; }
    .collage-badge-num { font-size: 22px; }
    .collage-vertical-btn { right: -10px; }
    .collage-img-main { height: 280px; }
    .collage-img-sec { height: 160px; }
    .about__values { padding: 56px 16px; }
    .about-hero-container { gap: 32px; }
  }
  @media (max-width: 480px) {
    .about__values { padding: 40px 14px; }
    .about__values-grid { gap: 16px; }
    .about__value-card { padding: 28px 18px; }
    .collage-img-main { height: 220px; }
    .collage-img-sec { height: 130px; }
    .content-title { font-size: 24px; }
  }
`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AboutUs() {
  return (
    <>
      <style>{css}</style>
      <div className="about-page">
        <PageHero 
          title="About Us" 
          subtitle="Making Quality Healthcare Affordable through NOVAMAX Digital Help For Humans Foundation." 
        />

        {/* --- NEW ABOUT HERO SECTION --- */}
        <section className="about-hero-section">
          <div className="about-hero-container">
            
            <div className="about-collage">
              <div className="collage-shape-blue"></div>
              <div className="collage-shape-dots"></div>
              
              <img src={ourStoryImg} alt="Healthcare professionals" className="collage-img-main" />
              <img src={aboutCollage2} alt="Doctor and patient" className="collage-img-sec" />
              
              <div className="collage-badge">
                <span className="collage-badge-num">10+</span>
                <span className="collage-badge-text">Experience</span>
              </div>
              
              <div className="collage-vertical-btn">
                <span className="vertical-text">How We Work</span>
                <div className="vertical-icon"><ArrowUp size={20} /></div>
              </div>
              </div>

            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="content-subtitle">OUR ABOUT US</div>
              <h2 className="content-title">
                More Than 10+ Years Providing Healthcare Access.
              </h2>
              <p className="content-desc">
                We are privileged to work with hundreds of future-thinking hospitals and clinics across the country. Our foundation provides a robust support system, ensuring that families feel safe, comfortable, and financially secure in medical emergencies.
              </p>
              
              <div className="content-features">
                <div className="feature-item">
                  <div className="feature-header">
                    <div className="feature-icon-box"><Headset size={24} /></div>
                    <div className="feature-title">Patient Support</div>
                  </div>
                  <p className="feature-desc">We must explain to you how our medical network reduces pain and financial stress.</p>
                </div>
                <div className="feature-item">
                  <div className="feature-header">
                    <div className="feature-icon-box"><UserRoundSearch size={24} /></div>
                    <div className="feature-title">Doctor Support</div>
                  </div>
                  <p className="feature-desc">We collaborate with dedicated specialists ensuring optimal care for every patient.</p>
                </div>
              </div>
              
              <div className="content-divider"></div>
              
              <div className="content-check-row">
                <CheckCircle2 size={24} className="check-icon" />
                <div className="check-text">
                  There are many variations of highly accessible medical services our team provides.
                  <a href="/contact">READ MORE +</a>
                </div>
              </div>
              
              <div>
                <a href="/contact" className="content-btn">
                  About More <ChevronRight size={18} />
                </a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Mission & Vision */}
        <section className="about__mv">
          <div className="about__mv-grid">
            <motion.div 
              className="about__mv-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="about__mv-icon-wrapper"><Target size={36} /></div>
              <h3 className="about__mv-title">Our Mission</h3>
              <p className="about__mv-text">
                To provide every individual with a comprehensive digital health identity that guarantees access to quality healthcare at standardized, affordable, and transparent prices, reducing out-of-pocket medical expenses for families across the nation.
              </p>
            </motion.div>

            <motion.div 
              className="about__mv-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="about__mv-icon-wrapper icon-green-gradient"><Eye size={36} /></div>
              <h3 className="about__mv-title">Our Vision</h3>
              <p className="about__mv-text">
                To build India's largest and most trusted healthcare community network where no one has to compromise on their health or their family's well-being due to financial constraints. A future where healthcare is a right, not a privilege.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="about__impact">
          <motion.div 
            className="about__values-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="content-subtitle" style={{ justifyContent: 'center' }}>OUR IMPACT</motion.span>
            <motion.h2 variants={fadeInUp} className="content-title" style={{ marginBottom: '16px', fontSize: '36px' }}>Making a Real Difference</motion.h2>
            <motion.p variants={fadeInUp} className="content-desc">Numbers that reflect our ongoing commitment to a healthier society.</motion.p>
          </motion.div>
          
          <motion.div 
            className="about__impact-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: <Users size={28} />, number: '50,000+', label: 'Happy Members' },
              { icon: <Building2 size={28} />, number: '500+', label: 'Partner Hospitals' },
              { icon: <TrendingUp size={28} />, number: '₹10 Cr+', label: 'Healthcare Savings' },
              { icon: <Award size={28} />, number: '2 Lakh+', label: 'Treatments Provided' }
            ].map((stat, i) => (
              <motion.div key={i} className="about__impact-card" variants={fadeInUp}>
                <div className="about__impact-icon">{stat.icon}</div>
                <div className="about__impact-number">{stat.number}</div>
                <div className="about__impact-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Core Values */}
        <section className="about__values">
          <motion.div 
            className="about__values-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="content-subtitle" style={{ justifyContent: 'center' }}>OUR PRINCIPLES</motion.span>
            <motion.h2 variants={fadeInUp} className="content-title" style={{ marginBottom: '16px', fontSize: '36px' }}>Core Values</motion.h2>
            <motion.p variants={fadeInUp} className="content-desc">The foundational pillars that guide everything we do at NOVAMAX.</motion.p>
          </motion.div>
          
          <motion.div 
            className="about__values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: <ShieldCheck size={40} />, title: 'Trust & Transparency', desc: 'Operating with absolute integrity and clear communication.' },
              { icon: <Heart size={40} />, title: 'Compassionate Care', desc: 'Putting empathy at the heart of our healthcare network.' },
              { icon: <Lightbulb size={40} />, title: 'Innovation', desc: 'Using technology to make healthcare smarter and accessible.' },
              { icon: <Handshake size={40} />, title: 'Reliability', desc: 'Being a dependable partner in times of medical need.' }
            ].map((v, i) => (
              <motion.div key={i} className="about__value-card" variants={fadeInUp}>
                <div className="about__value-icon">{v.icon}</div>
                <div className="about__value-title">{v.title}</div>
                <div className="about__value-desc">{v.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <FooterBanner />
        <FooterSection />
      </div>
    </>
  );
}
