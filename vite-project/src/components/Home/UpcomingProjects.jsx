import React from 'react';

const css = `
  .upcoming-section {
    padding: 60px 20px;
    background: #f8fafc;
    overflow: hidden;
  }
  
  .upcoming-container {
    max-width: 1300px;
    margin: 0 auto;
  }

  /* Header Styles */
  .upcoming-header {
    text-align: center;
    margin-bottom: 50px;
  }
  .upcoming-pre-title {
    font-family: 'Poppins', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: #1a3b70;
    margin: 0;
    line-height: 1.2;
    text-transform: uppercase;
  }
  .upcoming-title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    font-weight: 900;
    color: #2f7a35;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .upcoming-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 16px;
  }
  .upcoming-divider::before,
  .upcoming-divider::after {
    content: '';
    height: 1px;
    width: 60px;
    background: #2f7a35;
  }
  .upcoming-divider svg {
    width: 24px;
    height: 24px;
    fill: #2f7a35;
  }
  .upcoming-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #555;
    font-weight: 500;
    margin: 0;
  }
  .upcoming-subtitle strong {
    color: #2f7a35;
  }

  /* Grid Layout */
  .upcoming-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 20px 0;
  }

  /* Card Styles */
  .uc-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid #f0f0f0;
    overflow: hidden;
    transition: transform 0.3s ease;
  }
  .uc-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.1);
  }

  .uc-card-badge {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 16px;
    padding: 8px 12px 14px;
    border-bottom-right-radius: 20px;
    clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
    min-width: 45px;
    text-align: center;
  }

  .uc-card-body {
    display: flex;
    padding: 40px 20px 30px;
    gap: 16px;
    flex: 1;
    align-items: center;
  }

  .uc-card-icon-area {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 40px;
    box-shadow: inset 0 4px 10px rgba(0,0,0,0.05);
  }

  .uc-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .uc-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 1.3;
    margin: 0 0 8px 0;
    text-transform: uppercase;
  }

  .uc-card-line {
    width: 30px;
    height: 3px;
    border-radius: 2px;
    margin-bottom: 12px;
  }

  .uc-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #555;
    line-height: 1.5;
    margin: 0;
  }

  .uc-card-footer {
    padding: 12px 16px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
  }
  .uc-card-footer svg {
    width: 16px;
    height: 16px;
    fill: #fff;
  }

  @media (max-width: 1024px) {
    .upcoming-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 768px) {
    .upcoming-grid {
      grid-template-columns: 1fr;
    }
    .upcoming-title {
      font-size: 32px;
    }
  }
`;

const projects = [
  {
    id: '01',
    title: '10/- RUPEES MEDICINE CENTRE',
    desc: 'Quality medicines available at just ₹10 to make healthcare affordable for all.',
    icon: '💊',
    footerText: 'Affordable Medicines • Better Health',
    color: '#1a56db', 
  },
  {
    id: '02',
    title: 'HEALTH AND WELLNESS PROGRAM',
    desc: 'Promoting a healthier lifestyle through awareness, fitness, nutrition and regular checkups.',
    icon: '🧘‍♀️',
    footerText: 'Healthy Living • Happy Life',
    color: '#057a55',
  },
  {
    id: '03',
    title: 'AI HEALTH CARD',
    desc: 'Smart digital health cards powered by AI for instant access to your medical history.',
    icon: '🤖',
    footerText: 'Smart Healthcare • Instant Access',
    color: '#ea580c', 
  },
  {
    id: '04',
    title: '24x7 TELEMEDICINE',
    desc: 'Get online consultations from top doctors anytime, anywhere for immediate care.',
    icon: '🩺',
    footerText: 'Expert Doctors • 24/7 Availability',
    color: '#7c3aed', 
  },
  {
    id: '05',
    title: 'MOBILE MEDICAL VAN',
    desc: 'Bringing healthcare to your doorstep with fully equipped mobile medical clinics.',
    icon: '🚐',
    footerText: 'Healthcare at Doorstep • Fast Response',
    color: '#0891b2',
  },
  {
    id: '06',
    title: 'DIGITAL MEDICAL RECORDS',
    desc: 'Securely store and manage all your medical records digitally for easy sharing.',
    icon: '📋',
    footerText: 'Secure Storage • Easy Management',
    color: '#d97706',
  },
  {
    id: '07',
    title: 'NOVAMAX DIGITAL CLINIC',
    desc: 'State-of-the-art digital clinics equipped with modern diagnostic technologies.',
    icon: '🏥',
    footerText: 'Modern Diagnostics • Quality Care',
    color: '#e11d48',
  },
  {
    id: '08',
    title: 'FREE HEALTH CAMPS',
    desc: 'Organizing regular health checkup camps in rural areas to provide free medical advice.',
    icon: '🩺',
    footerText: 'Next Initiative • Coming Soon',
    color: '#2f7a35',
  },
  {
    id: '09',
    title: 'MATERNITY SUPPORT',
    desc: 'Ensuring safe motherhood by providing essential medical care and nutritional support.',
    icon: '🤱',
    footerText: 'Mother & Child Care • Better Future',
    color: '#0ea5e9',
  }
];

export default function UpcomingProjects() {
  return (
    <section className="upcoming-section">
      <style>{css}</style>
      <div className="upcoming-container">
        
        {/* Header */}
        <div className="upcoming-header">
          <h3 className="upcoming-pre-title">OUR</h3>
          <h2 className="upcoming-title">UPCOMING PROJECTS</h2>
          <div className="upcoming-divider">
            <svg viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <p className="upcoming-subtitle">
            Innovative Initiatives for a <strong>Better, Healthier & Empowered</strong> Society
          </p>
        </div>

        {/* Grid Layout */}
        <div className="upcoming-grid">
          {projects.map((item) => (
            <div className="uc-card" key={item.id}>
              
              <div className="uc-card-badge" style={{ background: item.color }}>
                {item.id}
              </div>

              <div className="uc-card-body">
                <div className="uc-card-icon-area">
                  {item.icon}
                </div>
                <div className="uc-card-content">
                  <h3 className="uc-card-title" style={{ color: item.color }}>{item.title}</h3>
                  <div className="uc-card-line" style={{ background: item.color }}></div>
                  <p className="uc-card-desc">{item.desc}</p>
                </div>
              </div>

              <div className="uc-card-footer" style={{ background: item.color }}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {item.footerText}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
