import React from 'react';

const css = `
  .dashboard {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  
  /* Left Wrapper - Full Bleed */
  .dashboard__left-wrapper {
    flex: 0 0 45%;
    background: #0d2247;
    padding: 80px 40px 80px 10%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .dashboard__left-content {
    max-width: 420px;
    width: 100%;
    position: relative;
    z-index: 2;
  }
  .dashboard__title {
    font-size: 24px;
    font-weight: 800;
    margin: 0 0 16px;
    line-height: 1.3;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .dashboard__desc {
    font-size: 15px;
    color: rgba(255,255,255,0.85);
    line-height: 1.6;
    margin-bottom: 32px;
  }
  .dashboard__cta {
    background: #2e7d32;
    color: #fff;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .dashboard__cta:hover { background: #1b5e20; transform: translateY(-1px); }

  /* Overlapping Card Mock */
  .dashboard__card-mock {
    position: absolute;
    right: -130px;
    top: 50%;
    transform: translateY(-50%);
    width: 260px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(0,0,0,0.3);
    z-index: 10;
    background: #fff;
  }
  .dashboard__card-top {
    padding: 16px 14px 12px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .dashboard__card-logo-text { display: flex; flex-direction: column; }
  .dashboard__card-logo-name {
    font-size: 15px;
    font-weight: 800;
    color: #1a3a6b;
    letter-spacing: 0.5px;
  }
  .dashboard__card-logo-sub {
    font-size: 6px;
    color: #0d2247;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2px;
  }
  .dashboard__card-stripe {
    background: #2e7d32;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 6px 14px;
    text-transform: uppercase;
  }
  .dashboard__card-bottom-mock {
    padding: 12px 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .dashboard__card-bottom-mock::before {
    content: '';
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 100px;
    height: 100px;
    background: #1a3a6b;
    border-radius: 50%;
    z-index: 0;
  }
  .dashboard__card-bottom-mock > div {
    position: relative;
    z-index: 1;
  }
  .dashboard__card-num {
    font-size: 12px;
    color: #0d2247;
    font-weight: 800;
    font-family: monospace;
    letter-spacing: 1px;
    margin: 0;
  }
  .dashboard__card-exp {
    font-size: 11px;
    color: #666;
    font-family: monospace;
    margin: 4px 0 0;
  }
  .dashboard__card-qr-box {
    width: 40px;
    height: 40px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  }

  /* Right Wrapper */
  .dashboard__right-wrapper {
    flex: 0 0 55%;
    padding: 80px 10% 80px 160px; /* 160px leaves space for the overlapping card */
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  
  .dashboard__right-header {
    margin-bottom: 24px;
  }
  .dashboard__right-title {
    font-size: 18px;
    font-weight: 900;
    color: #1a3a6b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }
  
  .dashboard__right-body {
    display: flex;
    align-items: center;
    gap: 40px; /* Space between grid and phone */
  }

  .dashboard__stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    flex: 1;
  }
  .dashboard__stat-box {
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
    min-height: 96px;
  }
  .dashboard__stat-val {
    font-size: 20px;
    font-weight: 800;
    color: #2e7d32;
    line-height: 1;
  }
  .dashboard__stat-icon {
    font-size: 28px;
    color: #1a3a6b;
    line-height: 1;
    position: relative;
  }
  .dashboard__stat-badge {
    position: absolute;
    top: -2px;
    right: -4px;
    background: #f44336;
    color: #fff;
    font-size: 9px;
    font-weight: bold;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .dashboard__stat-label {
    font-size: 11px;
    font-weight: 700;
    color: #555;
    line-height: 1.3;
    white-space: pre-line;
  }

  /* Phone Mockup */
  .dashboard__phone-container {
    position: relative;
    flex-shrink: 0;
    z-index: 5;
  }
  .dashboard__phone-container::before {
    content: '';
    position: absolute;
    top: -20px;
    bottom: -20px;
    left: -20px;
    right: -60px; /* Bleed off right edge */
    background: #f2f5f8; /* Faint grey backdrop */
    border-radius: 30px;
    z-index: -1;
  }
  .dashboard__phone {
    width: 220px;
    background: #fff;
    border-radius: 28px;
    box-shadow: -10px 10px 30px rgba(0,0,0,0.1);
    overflow: hidden;
    border: 6px solid #1a3a6b;
  }
  .dashboard__phone-notch {
    background: #fff;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dashboard__phone-notch-bar {
    width: 40px;
    height: 4px;
    background: #ccc;
    border-radius: 2px;
  }
  .dashboard__phone-screen {
    background: #f5f7fa;
    padding: 12px;
  }
  .dashboard__phone-header {
    background: #1a3a6b;
    color: #fff;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 12px;
  }
  .dashboard__phone-header p { margin: 0; font-size: 9px; opacity: 0.8; }
  .dashboard__phone-header strong { font-size: 14px; display: block; margin-top: 2px; }
  
  .dashboard__phone-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
  .dashboard__phone-stat {
    background: #fff;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  }
  .dashboard__phone-stat strong { display: block; font-size: 16px; color: #2e7d32; font-weight: 800; margin-bottom: 4px; }
  .dashboard__phone-stat span { font-size: 9px; color: #555; font-weight: 600; }
  
  .dashboard__phone-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-bottom: 12px;
  }
  .dashboard__phone-action {
    background: #fff;
    border-radius: 6px;
    padding: 8px 0;
    text-align: center;
    font-size: 7px;
    font-weight: 600;
    color: #555;
    box-shadow: 0 2px 4px rgba(0,0,0,0.03);
  }
  .dashboard__phone-action span { display: block; font-size: 14px; margin-bottom: 4px; }

  @media (max-width: 1200px) {
    .dashboard__left-wrapper { flex: 0 0 100%; padding: 60px 20px; justify-content: center; }
    .dashboard__card-mock { position: relative; right: auto; top: auto; transform: none; margin-top: 40px; }
    .dashboard__right-wrapper { flex: 0 0 100%; padding: 40px 20px; }
    .dashboard__phone-container { margin-top: 40px; }
    .dashboard__right-body { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 768px) {
    .dashboard__stats-grid { grid-template-columns: repeat(2, 1fr); }
    .dashboard__right-body { align-items: center; }
  }
`;

export default function MemberDashboard() {
  return (
    <>
      <style>{css}</style>
      <section className="dashboard">
        
        {/* Left Wrapper */}
        <div className="dashboard__left-wrapper">
          <div className="dashboard__left-content">
            <h2 className="dashboard__title">Your Health, Our Responsibility</h2>
            <p className="dashboard__desc">
              Join NOVAMAX Health Card and get access to premium healthcare benefits across India.
            </p>
            <button className="dashboard__cta">Apply Health Card Today</button>
          </div>

          {/* Overlapping Card */}
          <div className="dashboard__card-mock">
            <div className="dashboard__card-top">
              <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" stroke="#4caf50" strokeWidth="2" fill="white" />
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="#1a3a6b" fontWeight="bold">NOVA</text>
              </svg>
              <div className="dashboard__card-logo-text">
                <span className="dashboard__card-logo-name">NOVAMAX</span>
                <span className="dashboard__card-logo-sub">Digital Help For Humane Foundation</span>
              </div>
            </div>
            <div className="dashboard__card-stripe">Health Benefit Card</div>
            <div className="dashboard__card-bottom-mock">
              <div>
                <p className="dashboard__card-num">NMHF 2024 5678 9012</p>
                <p className="dashboard__card-exp">VALID THRU: 12/28</p>
              </div>
              <div className="dashboard__card-qr-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Wrapper */}
        <div className="dashboard__right-wrapper">
          <div className="dashboard__right-header">
            <h2 className="dashboard__right-title">Member Dashboard Preview</h2>
          </div>
          
          <div className="dashboard__right-body">
            {/* Stats Grid */}
            <div className="dashboard__stats-grid">
              {[
                { label: 'Total Savings', val: '₹ 24,500' },
                { label: 'Hospital Visits', val: '5' },
                { label: 'Family Members', val: '4' },
                { label: 'Health Card', val: 'Active' },
                { label: 'Download\nE-Card', icon: '📄' },
                { label: 'Treatment\nHistory', icon: '💼' },
                { label: 'Book\nAppointment', icon: '📅' },
                { label: 'Notifications', icon: '🔔', badge: '3' },
              ].map((s) => (
                <div key={s.label} className="dashboard__stat-box">
                  {s.val && <span className="dashboard__stat-val">{s.val}</span>}
                  {s.icon && (
                    <span className="dashboard__stat-icon">
                      {s.icon}
                      {s.badge && <span className="dashboard__stat-badge">{s.badge}</span>}
                    </span>
                  )}
                  <span className="dashboard__stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Phone Mockup with Backdrop */}
            <div className="dashboard__phone-container">
              <div className="dashboard__phone">
                <div className="dashboard__phone-notch">
                  <div className="dashboard__phone-notch-bar"></div>
                </div>
                <div className="dashboard__phone-screen">
                  <div className="dashboard__phone-header">
                    <p>Welcome Back</p>
                    <strong>Majibur Rahman</strong>
                  </div>
                  <div className="dashboard__phone-stats">
                    <div className="dashboard__phone-stat">
                      <strong>₹24,500</strong>
                      <span>Total Savings</span>
                    </div>
                    <div className="dashboard__phone-stat">
                      <strong>Active</strong>
                      <span>Card Status</span>
                    </div>
                  </div>
                  <div style={{fontSize: '11px', fontWeight: 'bold', color: '#1a3a6b', marginBottom: '8px', marginTop: '16px'}}>Quick Access</div>
                  <div className="dashboard__phone-actions">
                    {[
                      { icon: '🏥', label: 'Hospitals' },
                      { icon: '📅', label: 'Book' },
                      { icon: '💳', label: 'My Card' },
                      { icon: '💊', label: 'Medicine' },
                      { icon: '📋', label: 'Reports' },
                      { icon: '👥', label: 'Family' },
                    ].map((a) => (
                      <div key={a.label} className="dashboard__phone-action">
                        <span>{a.icon}</span>
                        {a.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </>
  );
}
