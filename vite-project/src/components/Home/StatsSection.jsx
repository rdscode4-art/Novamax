import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import dashboardService from '../../services/dashboardService';

const css = `
  .stats {
    background: linear-gradient(90deg, #1a3a6b 0%, #0d2247 100%);
    padding: 16px 24px;
    overflow: hidden;
  }
  .stats__container {
    max-width: 1400px;
    margin: 0 auto;
  }
  .stats__marquee {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
  }
  .stats__item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 24px;
    border-right: 1px solid rgba(255,255,255,0.15);
    justify-content: center;
  }
  .stats__item:nth-child(4) { border-right: none; }
  .stats__item--dup {
    display: none;
  }
  .stats__icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }
  .stats__text { display: flex; flex-direction: column; gap: 2px; }
  .stats__number {
    font-size: 24px;
    font-weight: 900;
    color: #fff;
    line-height: 1;
    letter-spacing: -0.5px;
  }
  .stats__label {
    font-size: 11px;
    color: rgba(255,255,255,0.7);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  @media (max-width: 900px) {
    .stats__marquee { 
      display: flex;
      width: max-content;
      animation: autoscroll 15s linear infinite;
    }
    .stats__item--dup {
      display: flex;
    }
    .stats__item { 
      flex: 0 0 auto;
      min-width: 220px;
      border-right: 1px solid rgba(255,255,255,0.1); 
      border-bottom: none; 
      padding: 16px 24px;
    }
    @keyframes autoscroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  }
`;

const defaultStats = [
  { icon: '👥', endVal: 50000, suffix: '+',            label: 'Happy Members' },
  { icon: '🏥', endVal: 500,   suffix: '+',            label: 'Partner Hospitals' },
  { icon: '💰', endVal: 10,    prefix: '₹', suffix: ' Crore+', label: 'Healthcare Savings' },
  { icon: '🩺', endVal: 2,     suffix: ' Lakh+',       label: 'Treatments Provided' },
];

function Counter({ endVal, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const duration = 2000;
    
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * endVal));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, endVal]);

  return <span ref={ref}>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
}


export default function StatsSection() {
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats();
        
        if (response.success && response.data) {
          const apiStats = [
            { 
              icon: '👥', 
              endVal: response.data.totalMembers || 50000, 
              suffix: '+', 
              label: 'Happy Members' 
            },
            { 
              icon: '🏥', 
              endVal: response.data.totalHospitals || 500, 
              suffix: '+', 
              label: 'Partner Hospitals' 
            },
            { 
              icon: '💰', 
              endVal: response.data.healthcareSavings || 10, 
              prefix: '₹', 
              suffix: ' Crore+', 
              label: 'Healthcare Savings' 
            },
            { 
              icon: '🩺', 
              endVal: response.data.treatmentsProvided || 2, 
              suffix: ' Lakh+', 
              label: 'Treatments Provided' 
            },
          ];
          setStats(apiStats);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep default stats on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  
  return (
    <>
      <style>{css}</style>
      <section className="stats">
        <div className="stats__container">
          <div className="stats__marquee">
            {[...stats, ...stats].map((s, i) => (
              <div key={i} className={`stats__item ${i >= stats.length ? 'stats__item--dup' : ''}`}>
                <div className="stats__icon">{s.icon}</div>
                <div className="stats__text">
                  <span className="stats__number">
                    <Counter endVal={s.endVal} prefix={s.prefix} suffix={s.suffix} />
                  </span>
                  <span className="stats__label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
