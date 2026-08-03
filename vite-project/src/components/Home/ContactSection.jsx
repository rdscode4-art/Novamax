import React from 'react';

const css = `
  .contact {
    padding: 100px 24px;
    background: #F8FAFD;
    font-family: 'Inter', sans-serif;
  }
  .contact__container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    gap: 64px;
  }
  .contact__left {
    flex: 1;
  }
  .contact__right {
    flex: 1;
  }
  .contact__title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    font-weight: 700;
    color: #0A2E73;
    margin-bottom: 24px;
  }
  .contact__text {
    font-size: 16px;
    color: #555;
    line-height: 1.8;
    margin-bottom: 48px;
  }
  .contact__info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .contact__info-card {
    background: #fff;
    padding: 32px;
    border-radius: 16px;
    border: 1px solid #E6EAF0;
  }
  .contact__info-icon {
    font-size: 32px;
    color: #1BA94C;
    margin-bottom: 16px;
  }
  .contact__info-title {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #1A1A1A;
    margin-bottom: 8px;
  }
  .contact__info-desc {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }
  .contact__form {
    background: #fff;
    padding: 48px;
    border-radius: 24px;
    box-shadow: 0 24px 48px rgba(10,46,115,0.08);
  }
  .contact__form-title {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 32px;
    color: #1A1A1A;
  }
  .contact__input-group {
    margin-bottom: 24px;
  }
  .contact__input, .contact__textarea {
    width: 100%;
    padding: 16px 20px;
    border: 1px solid #E6EAF0;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #333;
    transition: all 0.3s;
    background: #F8FAFD;
  }
  .contact__input:focus, .contact__textarea:focus {
    outline: none;
    border-color: #1F5EFF;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(31,94,255,0.1);
  }
  .contact__textarea {
    resize: vertical;
    min-height: 150px;
  }
  .contact__btn {
    width: 100%;
    padding: 18px;
    background: #1BA94C;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .contact__btn:hover {
    background: #148b3c;
  }

  @media (max-width: 1024px) {
    .contact__container { flex-direction: column; }
  }
  @media (max-width: 640px) {
    .contact__info-grid { grid-template-columns: 1fr; }
    .contact__form { padding: 32px 24px; }
  }
`;

export default function ContactSection() {
  return (
    <>
      <style>{css}</style>
      <section className="contact">
        <div className="contact__container">
          <div className="contact__left">
            <h2 className="contact__title">Get in Touch with Us</h2>
            <p className="contact__text">
              Whether you need help with your membership, want to partner as a hospital, or have general inquiries, our team is here to assist you 24/7.
            </p>
            <div className="contact__info-grid">
              <div className="contact__info-card">
                <div className="contact__info-icon">📞</div>
                <h3 className="contact__info-title">Phone Support</h3>
                <p className="contact__info-desc">
                  Toll Free: 1800 309 2626<br/>
                  Mon - Sat, 9am - 6pm
                </p>
              </div>
              <div className="contact__info-card">
                <div className="contact__info-icon">✉️</div>
                <h3 className="contact__info-title">Email Us</h3>
                <p className="contact__info-desc">
                  info@novamaxfoundation.org<br/>
                  support@novamax.com
                </p>
              </div>
              <div className="contact__info-card">
                <div className="contact__info-icon">📍</div>
                <h3 className="contact__info-title">Head Office</h3>
                <p className="contact__info-desc">
                  Bhaneda, Bijnor Road,<br/>
                  Najibabad, Uttar Pradesh
                </p>
              </div>
              <div className="contact__info-card">
                <div className="contact__info-icon">🏥</div>
                <h3 className="contact__info-title">Hospital Partners</h3>
                <p className="contact__info-desc">
                  Want to join our network?<br/>
                  partners@novamax.com
                </p>
              </div>
            </div>
          </div>

          <div className="contact__right">
            <form className="contact__form">
              <h3 className="contact__form-title">Send us a Message</h3>
              <div className="contact__input-group">
                <input type="text" className="contact__input" placeholder="Your Full Name" required />
              </div>
              <div className="contact__input-group">
                <input type="email" className="contact__input" placeholder="Your Email Address" required />
              </div>
              <div className="contact__input-group">
                <input type="tel" className="contact__input" placeholder="Your Phone Number" />
              </div>
              <div className="contact__input-group">
                <textarea className="contact__textarea" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="contact__btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
