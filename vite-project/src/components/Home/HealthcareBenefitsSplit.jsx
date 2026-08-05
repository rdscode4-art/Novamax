import React from 'react';

const css = `
  .hc-benefits {
    padding: 100px 24px;
    background: #fff;
    font-family: 'Inter', sans-serif;
  }
  .hc-benefits__container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 80px;
  }
  .hc-benefits__left {
    flex: 1;
    position: relative;
  }
  .hc-benefits__img-wrapper {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 32px 64px rgba(10,46,115,0.12);
  }
  .hc-benefits__img {
    width: 100%;
    height: auto;
    display: block;
    transform: scale(1.02);
    transition: transform 0.5s ease;
  }
  .hc-benefits__img-wrapper:hover .hc-benefits__img {
    transform: scale(1.05);
  }
  .hc-benefits__badge {
    position: absolute;
    bottom: -32px;
    right: -32px;
    background: #1BA94C;
    color: #fff;
    padding: 32px;
    border-radius: 50%;
    width: 160px;
    height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 8px solid #fff;
    box-shadow: 0 16px 32px rgba(27,169,76,0.2);
  }
  .hc-benefits__badge-num {
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
  }
  .hc-benefits__badge-text {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
  }

  .hc-benefits__right {
    flex: 1;
  }
  .hc-benefits__tag {
    display: inline-block;
    padding: 8px 16px;
    background: rgba(27,169,76,0.1);
    color: #1BA94C;
    font-weight: 600;
    border-radius: 100px;
    font-size: 14px;
    margin-bottom: 24px;
  }
  .hc-benefits__title {
    font-family: 'Poppins', sans-serif;
    font-size: 48px;
    font-weight: 700;
    color: #1a3a6b;
    line-height: 1.2;
    margin-bottom: 24px;
  }
  .hc-benefits__desc {
    font-size: 18px;
    color: #555;
    line-height: 1.6;
    margin-bottom: 40px;
  }
  .hc-benefits__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .hc-benefits__item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  .hc-benefits__icon {
    width: 48px;
    height: 48px;
    background: #F8FAFD;
    color: #2563a8;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }
  .hc-benefits__item-content h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #1A1A1A;
    margin-bottom: 4px;
  }
  .hc-benefits__item-content p {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    .hc-benefits__container { flex-direction: column; }
    .hc-benefits__badge { right: 24px; bottom: -24px; }
  }
  @media (max-width: 640px) {
    .hc-benefits__title { font-size: 36px; }
    .hc-benefits__list { grid-template-columns: 1fr; }
  }
`;

export default function HealthcareBenefitsSplit() {
  return (
    <>
      <style>{css}</style>
      <section className="hc-benefits">
        <div className="hc-benefits__container">
          
          <div className="hc-benefits__left">
            <div className="hc-benefits__img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=800&q=80" 
                alt="Doctor with patient" 
                className="hc-benefits__img"
              />
              <div className="hc-benefits__badge">
                <span className="hc-benefits__badge-num">100+</span>
                <span className="hc-benefits__badge-text">Hospitals</span>
              </div>
            </div>
          </div>

          <div className="hc-benefits__right">
            <span className="hc-benefits__tag">Why Choose Us</span>
            <h2 className="hc-benefits__title">Premium Healthcare, Unbeatable Prices</h2>
            <p className="hc-benefits__desc">
              The NOVAMAX Health Card bridges the gap between you and world-class medical facilities. We negotiate the best rates so you never have to compromise on your family's health due to financial constraints.
            </p>
            
            <div className="hc-benefits__list">
              <div className="hc-benefits__item">
                <div className="hc-benefits__icon">💸</div>
                <div className="hc-benefits__item-content">
                  <h4>Up to 50% Off</h4>
                  <p>Massive discounts on OPD consultations and diagnostics.</p>
                </div>
              </div>
              <div className="hc-benefits__item">
                <div className="hc-benefits__icon">🏥</div>
                <div className="hc-benefits__item-content">
                  <h4>IPD Benefits</h4>
                  <p>Reduced room rents and surgery costs at partner hospitals.</p>
                </div>
              </div>
              <div className="hc-benefits__item">
                <div className="hc-benefits__icon">💊</div>
                <div className="hc-benefits__item-content">
                  <h4>Pharmacy Savings</h4>
                  <p>Get prescribed medicines at wholesale rates.</p>
                </div>
              </div>
              <div className="hc-benefits__item">
                <div className="hc-benefits__icon">👨‍👩‍👧‍👦</div>
                <div className="hc-benefits__item-content">
                  <h4>Family Coverage</h4>
                  <p>Add up to 6 family members under a single health card.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
