import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Hospital, Send, CheckCircle } from 'lucide-react';

const css = `
  .contact {
    padding: 80px 24px;
    background: #f8fafc;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
  }
  .contact__container {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: start;
  }

  /* ── Left side ── */
  .contact__left-label {
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
    margin-bottom: 20px;
  }
  .contact__left-label::before {
    content: '';
    width: 8px; height: 8px;
    background: #1BA94C;
    border-radius: 50%;
    display: inline-block;
  }
  .contact__title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 900;
    color: #1a3a6b;
    margin: 0 0 16px;
    line-height: 1.15;
  }
  .contact__title span { color: #1BA94C; }
  .contact__text {
    font-size: 15px;
    color: #666;
    line-height: 1.8;
    margin-bottom: 40px;
    max-width: 460px;
  }

  /* Info cards */
  .contact__info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .contact__info-card {
    background: #fff;
    padding: 24px;
    border-radius: 20px;
    border: 1px solid #e8eef5;
    box-shadow: 0 4px 16px rgba(26,58,107,0.05);
    display: flex;
    gap: 16px;
    align-items: flex-start;
    transition: all 0.3s ease;
  }
  .contact__info-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(26,58,107,0.12);
    border-color: #1BA94C;
  }
  .contact__info-icon-box {
    width: 46px;
    height: 46px;
    background: linear-gradient(135deg, #1a3a6b, #1e4d8c);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
  }
  .contact__info-text {}
  .contact__info-title {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #1a3a6b;
    margin: 0 0 4px;
  }
  .contact__info-desc {
    font-size: 12.5px;
    color: #777;
    line-height: 1.6;
    margin: 0;
  }

  /* ── Form (right) ── */
  .contact__form-wrap {
    background: #fff;
    border-radius: 28px;
    padding: 48px;
    box-shadow: 0 24px 64px rgba(26,58,107,0.10);
    border: 1px solid #e8eef5;
    position: relative;
    overflow: hidden;
  }
  .contact__form-wrap::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, #1a3a6b, #1BA94C);
  }
  .contact__form-header {
    margin-bottom: 32px;
  }
  .contact__form-title {
    font-family: 'Poppins', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #1a3a6b;
    margin: 0 0 6px;
  }
  .contact__form-sub {
    font-size: 13px;
    color: #999;
    margin: 0;
  }
  .contact__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  .contact__input-group {
    margin-bottom: 16px;
  }
  .contact__label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: #555;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .contact__input, .contact__textarea, .contact__select {
    width: 100%;
    box-sizing: border-box;
    padding: 14px 16px;
    border: 1.5px solid #e8eef5;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #333;
    background: #f8fafc;
    transition: all 0.3s;
  }
  .contact__input:focus, .contact__textarea:focus, .contact__select:focus {
    outline: none;
    border-color: #1a3a6b;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(26,58,107,0.08);
  }
  .contact__textarea {
    resize: vertical;
    min-height: 130px;
  }
  .contact__btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #1a3a6b, #1e4d8c);
    color: #fff;
    border: none;
    border-radius: 14px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s;
    box-shadow: 0 8px 24px rgba(26,58,107,0.25);
    margin-top: 8px;
  }
  .contact__btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 32px rgba(26,58,107,0.35);
  }
  .contact__btn:active { transform: translateY(0); }

  .contact__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 48px 24px;
    text-align: center;
  }
  .contact__success-title {
    font-family: 'Poppins', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: #1BA94C;
  }
  .contact__success-text {
    font-size: 14px;
    color: #666;
  }

  @media (max-width: 1024px) {
    .contact__container { grid-template-columns: 1fr; gap: 40px; }
  }
  @media (max-width: 640px) {
    .contact__info-grid { grid-template-columns: 1fr; }
    .contact__form-wrap { padding: 28px 20px; }
    .contact__row { grid-template-columns: 1fr; }
    .contact { padding: 48px 16px; }
    .contact__title { font-size: 1.6rem; }
  }
  @media (max-width: 480px) {
    .contact { padding: 36px 14px; }
    .contact__form-wrap { padding: 22px 16px; }
    .contact__form-title { font-size: 18px; }
    .contact__info-card { padding: 18px 14px; gap: 12px; }
  }
`;

const infoCards = [
  { icon: <Phone size={20} />, title: 'Phone Support', desc: <>Toll Free: 1800 309 2626<br />Mon–Sat, 9am–6pm</> },
  { icon: <Mail size={20} />, title: 'Email Us', desc: <>info@novamaxfoundation.org<br />support@novamax.com</> },
  { icon: <MapPin size={20} />, title: 'Head Office', desc: <>Bhaneda, Bijnor Road,<br />Najibabad, Uttar Pradesh</> },
  { icon: <Hospital size={20} />, title: 'Hospital Partners', desc: <>Want to join our network?<br />partners@novamax.com</> },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const slideLeft = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } };
const slideRight = { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } };

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { contactService } = await import('../../services/contactService');
      await contactService.submit(form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <section className="contact">
        <div className="contact__container">

          {/* ── Left ── */}
          <motion.div
            className="contact__left"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="contact__left-label">Get In Touch</div>
            <h2 className="contact__title">We're Here to <span>Help You</span></h2>
            <p className="contact__text">
              Whether you need help with your membership, want to partner as a hospital, or have general inquiries, our dedicated team is available 24/7 to assist you.
            </p>

            <div className="contact__info-grid">
              {infoCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="contact__info-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="contact__info-icon-box">{card.icon}</div>
                  <div className="contact__info-text">
                    <p className="contact__info-title">{card.title}</p>
                    <p className="contact__info-desc">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="contact__form-wrap">
              {submitted ? (
                <div className="contact__success">
                  <CheckCircle size={64} color="#1BA94C" />
                  <p className="contact__success-title">Message Sent!</p>
                  <p className="contact__success-text">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="contact__form-header">
                    <h3 className="contact__form-title">Send Us a Message</h3>
                    <p className="contact__form-sub">We usually respond within a few hours</p>
                  </div>

                  <div className="contact__row">
                    <div className="contact__input-group">
                      <label className="contact__label">Full Name</label>
                      <input type="text" className="contact__input" placeholder="Ramesh Kumar" required />
                    </div>
                    <div className="contact__input-group">
                      <label className="contact__label">Phone Number</label>
                      <input type="tel" className="contact__input" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="contact__input-group">
                    <label className="contact__label">Email Address</label>
                    <input type="email" className="contact__input" placeholder="you@example.com" required />
                  </div>

                  <div className="contact__input-group">
                    <label className="contact__label">Subject</label>
                    <select className="contact__select">
                      <option value="">Select a topic...</option>
                      <option>Membership Enquiry</option>
                      <option>Hospital Partnership</option>
                      <option>Health Card Support</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>

                  <div className="contact__input-group">
                    <label className="contact__label">Message</label>
                    <textarea className="contact__textarea" placeholder="How can we help you?" required />
                  </div>

                  <button type="submit" className="contact__btn">
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
