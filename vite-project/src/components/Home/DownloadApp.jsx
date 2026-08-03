import React from 'react';

const css = `
  .dl-app {
    padding: 120px 24px;
    background: #0A2E73;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
  }
  .dl-app::before, .dl-app::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: rgba(255,255,255,0.03);
    z-index: 1;
  }
  .dl-app::before {
    top: -200px;
    left: -200px;
  }
  .dl-app::after {
    bottom: -200px;
    right: -200px;
  }
  
  .dl-app__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 80px;
    position: relative;
    z-index: 2;
  }
  .dl-app__left {
    flex: 1;
    color: #fff;
  }
  .dl-app__title {
    font-family: 'Poppins', sans-serif;
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 24px;
    line-height: 1.2;
  }
  .dl-app__desc {
    font-size: 18px;
    opacity: 0.9;
    line-height: 1.6;
    margin-bottom: 48px;
  }
  .dl-app__buttons {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .dl-app__btn {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #111;
    color: #fff;
    padding: 12px 24px;
    border-radius: 12px;
    text-decoration: none;
    border: 1px solid #333;
    transition: all 0.3s;
  }
  .dl-app__btn:hover {
    background: #000;
    border-color: #555;
    transform: translateY(-4px);
  }
  .dl-app__btn-icon {
    font-size: 28px;
  }
  .dl-app__btn-text small {
    display: block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
  }
  .dl-app__btn-text strong {
    display: block;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  .dl-app__qr-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 48px;
    padding-top: 48px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .dl-app__qr {
    width: 100px;
    height: 100px;
    background: #fff;
    padding: 8px;
    border-radius: 12px;
  }
  .dl-app__qr-text {
    font-size: 14px;
    opacity: 0.8;
  }
  .dl-app__qr-text strong {
    display: block;
    font-size: 16px;
    color: #1BA94C;
    margin-bottom: 4px;
  }

  .dl-app__right {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .dl-app__mockup-wrapper {
    position: relative;
  }
  .dl-app__mockup {
    width: 300px;
    border-radius: 40px;
    box-shadow: 0 32px 64px rgba(0,0,0,0.4);
    border: 10px solid #111;
    background: #fff;
  }
  .dl-app__floating-card {
    position: absolute;
    bottom: 40px;
    left: -80px;
    background: #fff;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 16px 32px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 16px;
    animation: float 3s ease-in-out infinite;
  }
  .dl-app__floating-icon {
    width: 48px;
    height: 48px;
    background: rgba(27,169,76,0.1);
    color: #1BA94C;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  .dl-app__floating-text {
    color: #1A1A1A;
  }
  .dl-app__floating-text strong {
    display: block;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
  }
  .dl-app__floating-text small {
    color: #666;
    font-size: 13px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 1024px) {
    .dl-app__container { flex-direction: column; text-align: center; }
    .dl-app__buttons { justify-content: center; }
    .dl-app__qr-wrapper { justify-content: center; text-align: left; }
    .dl-app__floating-card { left: auto; right: -40px; }
  }
  @media (max-width: 640px) {
    .dl-app__buttons { flex-direction: column; }
    .dl-app__floating-card { display: none; }
  }
`;

export default function DownloadApp() {
  return (
    <>
      <style>{css}</style>
      <section className="dl-app">
        <div className="dl-app__container">
          
          <div className="dl-app__left">
            <h2 className="dl-app__title">Get the NOVAMAX App Today!</h2>
            <p className="dl-app__desc">
              Your digital health card, hospital locator, and emergency assistance are just a tap away. Download the app to access exclusive features and manage your family's healthcare effortlessly.
            </p>
            
            <div className="dl-app__buttons">
              <a href="#" className="dl-app__btn">
                <span className="dl-app__btn-icon">🍏</span>
                <span className="dl-app__btn-text">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </span>
              </a>
              <a href="#" className="dl-app__btn">
                <span className="dl-app__btn-icon">▶️</span>
                <span className="dl-app__btn-text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </span>
              </a>
            </div>

            <div className="dl-app__qr-wrapper">
              <div className="dl-app__qr">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://novamaxfoundation.org/app" alt="QR Code" style={{width: '100%'}} />
              </div>
              <div className="dl-app__qr-text">
                <strong>Scan to Download</strong>
                Open your camera and scan the QR<br/>code to instantly download the app.
              </div>
            </div>
          </div>

          <div className="dl-app__right">
            <div className="dl-app__mockup-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&q=80" 
                alt="App Interface" 
                className="dl-app__mockup"
              />
              <div className="dl-app__floating-card">
                <div className="dl-app__floating-icon">⭐</div>
                <div className="dl-app__floating-text">
                  <strong>4.9/5 Rating</strong>
                  <small>Over 10,000+ Downloads</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
