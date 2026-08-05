import React, { useState, useEffect, useCallback } from 'react';
import { hospitalService } from '../../services/hospitalService';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const css = `
  .hospital-dir {
    padding: 30px 0;
    background: transparent;
    font-family: 'Inter', sans-serif;
  }
  .hospital-dir__layout {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }
  
  /* Sidebar */
  .hospital-dir__sidebar {
    flex: 0 0 320px;
    background: #fff;
    padding: 30px 24px;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.06);
    border: 1px solid rgba(241, 245, 249, 0.8);
    position: sticky;
    top: 100px;
    animation: fadeIn 0.8s ease-out forwards;
    text-align: left;
  }
  .hospital-dir__title {
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(135deg, #1a3a6b 0%, #26D0CE 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 12px;
    line-height: 1.3;
  }
  .hospital-dir__desc {
    font-size: 14px;
    color: #475569;
    margin: 0 0 24px;
    line-height: 1.5;
  }
  .hospital-dir__search-bar {
    position: relative;
    width: 100%;
  }
  .hospital-dir__input {
    width: 100%;
    padding: 16px 20px 16px 50px;
    font-size: 15px;
    color: #0f172a;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #f8fafc;
  }
  .hospital-dir__input::placeholder { color: #94a3b8; }
  .hospital-dir__input:focus {
    border-color: #2563a8;
    background: #fff;
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
  }
  .hospital-dir__search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Main Content */
  .hospital-dir__main { flex: 1; min-width: 0; }
  .hospital-dir__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  
  /* Cards */
  .h-card {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    border: 1px solid rgba(241, 245, 249, 0.5);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
  }
  .h-card:nth-child(1) { animation-delay: 0.1s; }
  .h-card:nth-child(2) { animation-delay: 0.2s; }
  .h-card:nth-child(3) { animation-delay: 0.3s; }
  .h-card:nth-child(4) { animation-delay: 0.4s; }
  .h-card:nth-child(5) { animation-delay: 0.5s; }
  .h-card:nth-child(6) { animation-delay: 0.6s; }
  .h-card:nth-child(n+7) { animation-delay: 0.7s; }
  .h-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  }
  
  /* Skeleton */
  .h-card--skeleton { background: #f1f5f9; }
  .h-card--skeleton::after {
    content: '';
    display: block;
    height: 100%;
    min-height: 280px;
    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  .h-card__img-container {
    position: relative;
    width: 100%;
    height: 180px;
    overflow: hidden;
  }
  .h-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .h-card:hover .h-card__img { transform: scale(1.08); }
  .h-card__discount {
    position: absolute;
    top: 12px;
    right: 12px;
    background: linear-gradient(135deg, #ff5722 0%, #ff8a50 100%);
    color: #fff;
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 15px rgba(255, 87, 34, 0.4);
    animation: pulseGlow 2s infinite;
  }
  
  .h-card__body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
  }
  .h-card__tag {
    color: #2563a8;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .h-card__name {
    color: #0f172a;
    font-size: 20px;
    font-weight: 800;
    margin: 0 0 12px;
    line-height: 1.3;
  }
  .h-card__location {
    color: #64748b;
    font-size: 13px;
    display: flex;
    align-items: flex-start;
    gap: 6px;
    line-height: 1.5;
    margin-bottom: 16px;
    max-width: 95%;
  }
  .h-card__location svg { flex-shrink: 0; margin-top: 2px; }
  .h-card__location strong { color: #334155; font-weight: 700; }
  .h-card__divider {
    width: 90%;
    height: 1px;
    background: #f1f5f9;
    margin: 10px 0 16px;
  }
  .h-card__facilities {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    width: 100%;
  }
  .h-card__facility {
    background: #eff6ff;
    color: #2563a8;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  
  .hospital-dir__empty {
    text-align: center;
    padding: 80px 20px;
    color: #64748b;
    width: 100%;
  }
  .hospital-dir__empty-icon { font-size: 56px; margin-bottom: 20px; }
  .hospital-dir__empty-title {
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 12px;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulseGlow {
    0% { box-shadow: 0 0 0 0 rgba(255, 87, 34, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(255, 87, 34, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 87, 34, 0); }
  }

  @media (max-width: 1280px) {
    .hospital-dir__grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  }
  @media (max-width: 992px) {
    .hospital-dir__layout { flex-direction: column; }
    .hospital-dir__sidebar { flex: none; width: 100%; position: static; margin-bottom: 20px; }
    .hospital-dir__grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .hospital-dir__grid { grid-template-columns: 1fr; gap: 20px; }
  }
`;

export default function HospitalDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const fetchHospitals = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const res = await hospitalService.getAll({
        page,
        limit: 12,
        search: debouncedSearch || undefined,
      });
      setHospitals(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, pages: 1, total: 0 });
    } catch (err) {
      setError('Failed to load hospitals. Please try again.');
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchHospitals(1);
  }, [fetchHospitals]);

  const getImageUrl = (img) => {
    if (!img) return 'https://via.placeholder.com/600x400?text=Hospital';
    if (img.startsWith('http')) return img;
    return `${BASE_URL}${img}`;
  };

  return (
    <>
      <style>{css}</style>
      <section className="hospital-dir">
        <div className="hospital-dir__layout">

          <aside className="hospital-dir__sidebar">
            <h2 className="hospital-dir__title">Search Partner Hospitals</h2>
            <p className="hospital-dir__desc">
              Find a Novamax registered hospital near you. Search by your city, state, pincode, or hospital name.
            </p>
            <div className="hospital-dir__search-bar">
              <span className="hospital-dir__search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                className="hospital-dir__input"
                placeholder="Search by City, Pincode, State, or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {pagination.total > 0 && (
              <p style={{ marginTop: 16, fontSize: 13, color: '#64748b' }}>
                Showing {hospitals.length} of {pagination.total} hospitals
              </p>
            )}
          </aside>

          <main className="hospital-dir__main">
            {/* Loading skeleton */}
            {loading && (
              <div className="hospital-dir__grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-card h-card--skeleton" />
                ))}
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="hospital-dir__empty">
                <div className="hospital-dir__empty-icon">⚠️</div>
                <h3 className="hospital-dir__empty-title">Something went wrong</h3>
                <p>{error}</p>
                <button
                  onClick={() => fetchHospitals(1)}
                  style={{ marginTop: 12, padding: '8px 20px', background: '#1a3a6b', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Hospital grid */}
            {!loading && !error && hospitals.length > 0 && (
              <>
                <div className="hospital-dir__grid">
                  {hospitals.map((hospital) => (
                    <div key={hospital._id} className="h-card">
                      <div className="h-card__img-container">
                        <img src={getImageUrl(hospital.image)} alt={hospital.name} className="h-card__img" loading="lazy" />
                        <div className="h-card__discount">{hospital.discount}</div>
                      </div>
                      <div className="h-card__body">
                        <div className="h-card__tag">{hospital.category?.toUpperCase() || 'HOSPITAL'}</div>
                        <h3 className="h-card__name">{hospital.name}</h3>
                        <div className="h-card__location">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#e11d48">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                          </svg>
                          <div>
                            <strong>{hospital.location}</strong> — {hospital.address}
                          </div>
                        </div>
                        <div className="h-card__divider"></div>
                        <div className="h-card__facilities">
                          {hospital.facilities?.map((fac, idx) => (
                            <span key={idx} className="h-card__facility">{fac}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => fetchHospitals(i + 1)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 8,
                          border: '1.5px solid #1a3a6b',
                          background: pagination.page === i + 1 ? '#1a3a6b' : '#fff',
                          color: pagination.page === i + 1 ? '#fff' : '#1a3a6b',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Empty state */}
            {!loading && !error && hospitals.length === 0 && (
              <div className="hospital-dir__empty">
                <div className="hospital-dir__empty-icon">🏥</div>
                <h3 className="hospital-dir__empty-title">No Hospitals Found</h3>
                <p>We couldn't find any hospitals matching "{searchTerm}". Please try a different search.</p>
              </div>
            )}
          </main>

        </div>
      </section>
    </>
  );
}
