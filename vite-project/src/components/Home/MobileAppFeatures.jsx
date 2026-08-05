import React from 'react';

const css = `
  .app-features {
    padding: 100px 24px;
    background: #fff;
    font-family: 'Inter', sans-serif;
  }
  .app-features__container {
    max-width: 1400px;
    margin: 0 auto;
  }
  .app-features__header {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 64px;
  }
  .app-features__title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    font-weight: 700;
    color: #1a3a6b;
    margin-bottom: 16px;
  }
  .app-features__subtitle {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
  }
  
  .app-features__content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 64px;
  }
  .app-features__column {
    display: flex;
    flex-direction: column;
    gap: 48px;
    flex: 1;
  }
  .app-features__column--left {
    text-align: right;
  }
  .app-features__column--left .app-features__item {
    flex-direction: row-reverse;
  }
  .app-features__item {
    display: flex;
    align-items: flex-start;
    gap: 24px;
  }
  .app-features__icon {
    width: 64px;
    height: 64px;
    background: #F8FAFD;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    color: #1BA94C;
    flex-shrink: 0;
    box-shadow: 0 8px 16px rgba(0,0,0,0.05);
  }
  .app-features__text h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: #1A1A1A;
    margin-bottom: 8px;
  }
  .app-features__text p {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
  }

  .app-features__phone {
    flex: 0 0 320px;
    position: relative;
  }
  .app-features__phone-mockup {
    width: 100%;
    border-radius: 40px;
    box-shadow: 0 24px 64px rgba(10,46,115,0.15);
    border: 8px solid #1A1A1A;
    background: #000;
  }

  @media (max-width: 1024px) {
    .app-features__content { flex-direction: column; }
    .app-features__column { text-align: left; }
    .app-features__column--left .app-features__item { flex-direction: row; }
  }
`;

export default function MobileAppFeatures() {
  return (
    <>
      <style>{css}</style>
      <section className="app-features">
        <div className="app-features__container">
          <div className="app-features__header">
            <h2 className="app-features__title">Everything in Your Pocket</h2>
            <p className="app-features__subtitle">
              The NOVAMAX Mobile App brings the entire hospital network to your fingertips. Manage your health card, find hospitals, and book appointments seamlessly.
            </p>
          </div>
          
          <div className="app-features__content">
            
            <div className="app-features__column app-features__column--left">
              <div className="app-features__item">
                <div className="app-features__icon">💳</div>
                <div className="app-features__text">
                  <h3>Digital Health Card</h3>
                  <p>Access your health card instantly. No need to carry a physical card everywhere.</p>
                </div>
              </div>
              <div className="app-features__item">
                <div className="app-features__icon">🏥</div>
                <div className="app-features__text">
                  <h3>Hospital Locator</h3>
                  <p>Find the nearest NABH accredited partner hospital with GPS routing.</p>
                </div>
              </div>
              <div className="app-features__item">
                <div className="app-features__icon">👨‍👩‍👧‍👦</div>
                <div className="app-features__text">
                  <h3>Family Wallet</h3>
                  <p>Manage health records and cards for up to 6 family members in one place.</p>
                </div>
              </div>
            </div>

            <div className="app-features__phone">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" 
                alt="Mobile App Mockup" 
                className="app-features__phone-mockup"
              />
            </div>

            <div className="app-features__column">
              <div className="app-features__item">
                <div className="app-features__icon">📅</div>
                <div className="app-features__text">
                  <h3>Easy Appointments</h3>
                  <p>Book priority appointments at partner clinics without waiting in line.</p>
                </div>
              </div>
              <div className="app-features__item">
                <div className="app-features__icon">🚨</div>
                <div className="app-features__text">
                  <h3>SOS Emergency</h3>
                  <p>One-tap emergency button to request an ambulance instantly.</p>
                </div>
              </div>
              <div className="app-features__item">
                <div className="app-features__icon">🧾</div>
                <div className="app-features__text">
                  <h3>Discount Tracker</h3>
                  <p>Track exactly how much you've saved on medical bills this year.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
