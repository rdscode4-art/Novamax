import React, { useState, useEffect } from 'react';
import galleryService from '../../services/galleryService';

const css = `
  .gallery {
    padding: 42px 24px;
    background: #fff;
  }
  .gallery__container {
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .gallery__header-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }
  .gallery__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    width: 100%;
  }
  .gallery__header::before,
  .gallery__header::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
  .gallery__title {
    font-size: 24px;
    font-weight: 900;
    color: #1a3a6b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
    white-space: nowrap;
  }
  .gallery__view-all {
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
  .gallery__view-all:hover { background: #f0f0f0; }

  .gallery__slider {
    position: relative;
    overflow: hidden;
    padding: 10px 0;
  }
  
  .gallery__track {
    display: flex;
    gap: 16px;
    width: max-content;
    animation: scroll-left-gallery 25s linear infinite;
  }
  
  .gallery__track:hover {
    animation-play-state: paused;
  }

  @keyframes scroll-left-gallery {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 8px)); }
  }

  .gallery__track--reverse {
    display: flex;
    gap: 16px;
    width: max-content;
    animation: scroll-right-gallery 30s linear infinite;
  }
  
  .gallery__track--reverse:hover {
    animation-play-state: paused;
  }

  @keyframes scroll-right-gallery {
    0% { transform: translateX(calc(-50% - 8px)); }
    100% { transform: translateX(0); }
  }

  .gallery__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
    width: 220px; /* Fixed width for scrolling */
    flex-shrink: 0;
  }
  .gallery__item:hover {
    transform: translateY(-4px);
  }
  .gallery__img-box {
    width: 100%;
    height: 140px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    border: 1px solid #f0f0f0;
  }
  .gallery__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }
  .gallery__item:hover .gallery__img {
    transform: scale(1.05);
  }
  .gallery__item-label {
    color: #1a3a6b;
    font-size: 13px;
    font-weight: 800;
    text-align: center;
    margin: 0;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    .gallery { padding: 32px 16px; }
    .gallery__item { width: 170px; }
    .gallery__img-box { height: 110px; }
  }
  @media (max-width: 480px) {
    .gallery { padding: 24px 12px; }
    .gallery__item { width: 140px; }
    .gallery__img-box { height: 90px; }
    .gallery__item-label { font-size: 11px; }
  }
`;

const items = [
  { img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80', label: 'Medical Camps' },
  { img: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&q=80', label: 'Free Medicine Distribution' },
  { img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80', label: 'Hospital Activities' },
  { img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80', label: 'Health Awareness Program' },
  { img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&q=80', label: 'NGO Events' },
  { img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80', label: 'Doctor Meet & Greet' },
];

export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState(items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galleryService.getGallery({ status: 'active' });
        if (data.data && data.data.length > 0) {
          const formattedItems = data.data.map(item => ({
            img: item.image || item.img,
            label: item.title || item.label
          }));
          setGalleryItems(formattedItems);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Keep default items on error
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <section className="gallery">
          <div className="gallery__container">
            <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
              Loading gallery...
            </div>
          </div>
        </section>
      </>
    );
  }
  
  return (
    <>
      <style>{css}</style>
      <section className="gallery">
        <div className="gallery__container">
          
          <div className="section-heading">
            <div className="section-heading__label">Our Moments</div>
            <h2 className="section-heading__title">Gallery</h2>
            <div className="section-heading__underline"></div>
            <p className="section-heading__subtitle">Glimpses from our healthcare initiatives, medical camps, and community events.</p>
          </div>

          <div className="gallery__slider">
            <div className="gallery__track">
              {/* Render twice for seamless infinite scrolling */}
              {[...galleryItems, ...galleryItems].map((item, i) => (
                <div key={i} className="gallery__item">
                  <div className="gallery__img-box">
                    <img src={item.img} alt={item.label} className="gallery__img" />
                  </div>
                  <p className="gallery__item-label">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="gallery__slider" style={{ marginTop: '20px' }}>
            <div className="gallery__track--reverse">
              {/* Reverse items for variation and seamless infinite scrolling */}
              {[...galleryItems].reverse().concat([...galleryItems].reverse()).map((item, i) => (
                <div key={`rev-${i}`} className="gallery__item">
                  <div className="gallery__img-box">
                    <img src={item.img} alt={item.label} className="gallery__img" />
                  </div>
                  <p className="gallery__item-label">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
