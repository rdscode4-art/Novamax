import React from 'react';

const css = `
  .features-bar-container {
    width: 100%;
    max-width: 1200px;
    margin: -30px auto 40px; /* Negative margin to overlap hero banner */
    padding: 0 20px;
    position: relative;
    z-index: 10;
  }

  .features-bar {
    background: #fff;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 32px;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 20px;
    position: relative;
    flex: 1;
    justify-content: center;
  }

  .feature-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 15%;
    height: 70%;
    width: 1px;
    background: #e0e0e0;
  }

  .feature-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature-icon svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .feature-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .feature-title {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #1a3a6b;
    white-space: nowrap;
  }

  .feature-sub {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #1a3a6b;
    opacity: 0.8;
    white-space: nowrap;
  }

  @media (max-width: 1024px) {
    .features-bar {
      padding: 12px 16px;
    }
    .feature-item {
      padding: 10px;
      gap: 8px;
    }
    .feature-title {
      font-size: 13px;
    }
    .feature-sub {
      font-size: 11px;
    }
  }

  @media (max-width: 768px) {
    .features-bar-container {
      margin-top: 20px;
    }
    .features-bar {
      flex-direction: column;
      border-radius: 24px;
      padding: 20px;
      gap: 16px;
    }
    .feature-item {
      width: 100%;
      justify-content: flex-start;
      padding: 10px;
    }
    .feature-item:not(:last-child)::after {
      right: 10%;
      top: 100%;
      width: 80%;
      height: 1px;
    }
  }
`;

const features = [
  {
    title: 'Digital Health Card',
    sub: 'Instant Access',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2f7a35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M7 15h.01M11 15h2" />
        <circle cx="17" cy="15" r="3" fill="#2f7a35" stroke="none" />
        <path d="M15.5 15l1 1 2-2" stroke="#fff" strokeWidth="2" />
      </svg>
    )
  },
  {
    title: 'Book Appointments',
    sub: 'Quick & Easy',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#1a3a6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <circle cx="9" cy="14" r="1" fill="#1a3a6b" stroke="none" />
        <circle cx="15" cy="14" r="1" fill="#1a3a6b" stroke="none" />
        <circle cx="9" cy="18" r="1" fill="#1a3a6b" stroke="none" />
        <circle cx="15" cy="18" r="1" fill="#1a3a6b" stroke="none" />
      </svg>
    )
  },
  {
    title: 'Find Hospitals',
    sub: 'Near You',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2f7a35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" fill="#1a3a6b" stroke="none" />
      </svg>
    )
  },
  {
    title: 'Treatment History',
    sub: 'Track & Manage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#1a3a6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 14h6M9 18h6" />
        <path d="M9 10h.01" strokeWidth="3" />
      </svg>
    )
  },
  {
    title: 'Health Wallet',
    sub: 'Safe & Secure',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#1a3a6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2v4h4v-6h-2z" fill="#1a3a6b" />
      </svg>
    )
  }
];

export default function FeaturesBar() {
  return (
    <section className="features-bar-container">
      <style>{css}</style>
      <div className="features-bar">
        {features.map((item, index) => (
          <div className="feature-item" key={index}>
            <div className="feature-icon">
              {item.icon}
            </div>
            <div className="feature-text">
              <span className="feature-title">{item.title}</span>
              <span className="feature-sub">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
