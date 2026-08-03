import React from 'react';
import './PageHero.css';

export default function PageHero({ title, subtitle, bgGradient, icon, bgImage }) {
  const dynamicStyle = {
    background: bgImage 
      ? `linear-gradient(to right, rgba(10,46,115,0.9), rgba(31,94,255,0.7)), url(${bgImage}) center/cover no-repeat`
      : bgGradient || 'linear-gradient(135deg, #0A2E73 0%, #1F5EFF 100%)',
  };

  return (
    <div className="page-hero" style={dynamicStyle}>
      <div className="page-hero__particles">
        <div className="page-hero__particle page-hero__particle-1"></div>
        <div className="page-hero__particle page-hero__particle-2"></div>
        <div className="page-hero__particle page-hero__particle-3"></div>
      </div>
      
      <div className="page-hero__content">
        {icon && <div className="page-hero__icon-wrapper">{icon}</div>}
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__subtitle">{subtitle}</p>
      </div>
      
      <div className="page-hero__shape-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#ffffff"></path>
        </svg>
      </div>
    </div>
  );
}
