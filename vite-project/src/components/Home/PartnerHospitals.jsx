import { useState } from 'react';

const css = `
  .partners {
    padding: 42px 24px;
    background: #fff;
  }
  .partners__container {
    max-width: 1400px;
    margin: 0 auto;
  }
  .partners__header-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }
  .partners__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    width: 100%;
  }
  .partners__header::before,
  .partners__header::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
  .partners__title {
    font-size: 24px;
    font-weight: 900;
    color: #1a3a6b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
    white-space: nowrap;
  }
  .partners__view-all {
    position: absolute;
    right: 20px;
    background: #fff;
    color: #555;
    border: 1px solid #d0d0d0;
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    z-index: 2;
    transition: all 0.2s;
  }
  .partners__view-all:hover { background: #f0f0f0; }
  
  .partners__slider {
    position: relative;
    overflow: hidden;
    padding: 10px 0;
  }
  
  .partners__track {
    display: flex;
    gap: 16px;
    width: max-content;
    animation: scroll-left 30s linear infinite;
  }
  
  .partners__track:hover {
    animation-play-state: paused;
  }

  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 8px)); }
  }

  .partners__card {
    background: #fff;
    border: 1px solid #eaeaea;
    border-radius: 14px;
    padding: 8px;
    text-align: left;
    transition: all 0.2s;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    width: 260px; /* Fixed width for scrolling items */
    flex-shrink: 0;
  }
  .partners__card:hover {
    border-color: #2e7d32;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    transform: translateY(-3px);
  }
  .partners__card-img {
    height: 120px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
    background: #f0f0f0;
  }
  .partners__card-body {
    padding: 0 4px 8px;
  }
  .partners__card-name {
    font-size: 13px;
    font-weight: 800;
    color: #1a3a6b;
    margin: 0 0 2px;
    line-height: 1.25;
  }
  .partners__card-location {
    font-size: 11px;
    color: #1a3a6b;
    margin: 0 0 8px;
    font-weight: 500;
  }
  .partners__card-discount {
    font-size: 11px;
    color: #2e7d32;
    font-weight: 700;
    margin: 0 0 12px;
  }
  .partners__card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #f0f0f0;
    padding-top: 8px;
    margin-top: 4px;
  }
  .partners__card-type {
    font-size: 10.5px;
    color: #666;
    margin: 0;
  }
  .partners__card-rating {
    font-size: 11.5px;
    font-weight: 700;
    color: #333;
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 0;
  }
  .partners__card-rating span { color: #ffb300; font-size: 14px; }
`;

const hospitals = [
  { 
    img: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=500&q=80', 
    name: 'MAX Super Speciality', 
    location: 'Hospital, Delhi',
    type: 'Multi Speciality', discount: 'Upto 40% Discount', rating: '4.8' 
  },
  { 
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80', 
    name: 'Fortis Hospital', 
    location: 'Bangalore',
    type: 'Multi Speciality', discount: 'Upto 40% Discount', rating: '4.6' 
  },
  { 
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&q=80', 
    name: 'Apollo Hospitals', 
    location: 'Hyderabad',
    type: 'Multi Speciality', discount: 'Upto 40% Discount', rating: '4.7' 
  },
  { 
    img: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=500&q=80', 
    name: 'KIMS Hospital', 
    location: 'Hyderabad',
    type: 'Multi Speciality', discount: 'Upto 30% Discount', rating: '4.5' 
  },
  { 
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=80', 
    name: 'Narayana Health', 
    location: 'Kolkata',
    type: 'Multi Speciality', discount: 'Upto 30% Discount', rating: '4.6' 
  },
];

export default function PartnerHospitals() {
  return (
    <>
      <style>{css}</style>
      <section className="partners">
        <div className="partners__container">
          
          <div className="section-heading">
            <div className="section-heading__label">Trusted Network</div>
            <h2 className="section-heading__title">Our Partner Hospitals</h2>
            <div className="section-heading__underline"></div>
            <p className="section-heading__subtitle">Discover our wide network of trusted hospitals and clinics offering exclusive discounts.</p>
          </div>

          <div className="partners__slider">
            <div className="partners__track">
              {/* Render twice for seamless infinite scrolling */}
              {[...hospitals, ...hospitals].map((h, i) => (
                <div key={i} className="partners__card">
                  <img src={h.img} alt={h.name} className="partners__card-img" />
                  <div className="partners__card-body">
                    <p className="partners__card-name">{h.name}</p>
                    <p className="partners__card-location">{h.location}</p>
                    <p className="partners__card-discount">{h.discount}</p>
                    <div className="partners__card-footer">
                      <p className="partners__card-type">{h.type}</p>
                      <p className="partners__card-rating"><span>★</span> {h.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
