import React from 'react';
import footerImg from '../../assets/footer image.png';

export default function FooterBanner() {
  return (
    <div style={{ width: '100%', lineHeight: 0, position: 'relative', zIndex: 1, marginBottom: '-20px' }}>
      <img 
        src={footerImg} 
        alt="Footer Banner" 
        style={{ 
          width: '100%', 
          height: 'auto', 
          display: 'block',
          margin: 0,
          padding: 0
        }} 
      />
    </div>
  );
}
