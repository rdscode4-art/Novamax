import React from 'react';
import HealthcareBenefitsSplit from '../components/Home/HealthcareBenefitsSplit';
import HowItWorks from '../components/Home/HowItWorks';
import FooterBanner from '../components/Home/FooterBanner';
import FooterSection from '../components/Home/FooterSection';

import PageHero from '../components/common/PageHero';
import healthCardImg from '../assets/Health Card.png';

const css = `
  .hc-page__preview {
    padding: 100px 24px;
    background: #F8FAFD;
  }
  .hc-page__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 64px;
  }
  .hc-page__preview-left {
    flex: 1;
  }
  .hc-page__card-img {
    width: 100%;
    max-width: 440px;
    height: auto;
    display: block;
    margin: 0 auto;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    transform: perspective(1000px) rotateY(15deg);
    transition: transform 0.5s ease;
  }
  .hc-page__card-img:hover {
    transform: perspective(1000px) rotateY(0deg) scale(1.05);
  }
  .hc-page__preview-right {
    flex: 1;
  }
  .hc-page__title {
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
    font-weight: 700;
    color: #0A2E73;
    margin-bottom: 24px;
  }
  .hc-page__text {
    font-size: 16px;
    color: #555;
    line-height: 1.8;
    margin-bottom: 32px;
  }
  .hc-page__btn {
    display: inline-block;
    padding: 16px 32px;
    background: #1BA94C;
    color: #fff;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    border-radius: 12px;
    transition: background 0.3s;
  }
  .hc-page__btn:hover {
    background: #148b3c;
  }

  @media (max-width: 1024px) {
    .hc-page__container { flex-direction: column; text-align: center; }
    .hc-page__card-img { transform: none; margin-bottom: 32px; }
    .hc-page__card-img:hover { transform: scale(1.05); }
  }
`;

export default function HealthCard() {
  return (
    <>
      <style>{css}</style>
      <div>
        <PageHero 
          title="Your Digital Health Identity" 
          subtitle="Carry your healthcare benefits wherever you go. The NOVAMAX Health Card unlocks exclusive discounts at top hospitals." 
          icon="💳" 
          bgGradient="linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)" 
        />

        <section className="hc-page__preview">
          <div className="hc-page__container">
            <div className="hc-page__preview-left">
              <img src={healthCardImg} alt="Novamax Health Card" className="hc-page__card-img" />
            </div>
            <div className="hc-page__preview-right">
              <h2 className="hc-page__title">More Than Just a Card</h2>
              <p className="hc-page__text">
                The NOVAMAX Health Benefit Card is your all-access pass to affordable healthcare. Whether it is a routine checkup, buying medicines, or emergency surgeries, flashing this card at our partner hospitals instantly reduces your bill. Available both digitally in the app and as a premium physical card.
              </p>
              <a href="#" className="hc-page__btn">Apply for Health Card</a>
            </div>
          </div>
        </section>

        {/* Reuse the components from Home Page */}
        <HealthcareBenefitsSplit />
        <HowItWorks />

        <FooterBanner />
        <FooterSection />
      </div>
    </>
  );
}
