import React, { useState, useEffect } from 'react';
import './OurPartnersSection.css';
import JoinUsForms from './JoinUsForms';
import HospitalDirectory from '../Hospitals/HospitalDirectory';
import volunteerService from '../../services/volunteerService';
import api from '../../services/api';

const subTabs = [
  'All',
  'Hospital',
  'Doctor Clinic',
  'Medical Store',
  'Diagnosis Center',
  'X-Ray / Ultrasound'
];

const ngoSubTabs = [
  'All',
  'National Level',
  'State Level',
  'District Level',
  'City Level',
  'Block Level',
  'Village Level'
];

export default function OurPartnersSection() {
  const [mainTab, setMainTab] = useState('Hospital'); // 'Hospital' | 'NGO'
  const [activeSubTab, setActiveSubTab] = useState('All');
  const [activeNgoTab, setActiveNgoTab] = useState('All');
  
  // NGO Volunteers State

  // Fetch volunteers when NGO tab is active
  useEffect(() => {
    if (mainTab === 'NGO') {
      fetchVolunteers();
    }
  }, [mainTab, activeNgoTab]);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = activeNgoTab !== 'All' ? { level: activeNgoTab } : {};
      const response = await volunteerService.getVolunteers(params);
      
      setVolunteers(response.data || []);
    } catch (err) {
      console.error('Error fetching volunteers:', err);
      setError('Failed to load volunteers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (img) => {
    if (!img) return 'https://via.placeholder.com/600x400?text=Hospital';
    if (img.startsWith('http')) return img;
    return `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${img}`;
  };

  return (
    <section className="our-partners" id="join-us-forms">
      <div className="our-partners__container">
        
        {/* Main Tabs */}
        <div className="op__main-tabs">
          <button 
            className={`op__main-tab ${mainTab === 'Hospital' ? 'op__main-tab--active' : ''}`}
            onClick={() => setMainTab('Hospital')}
          >
            Hospitals & Clinics
          </button>
          <button 
            className={`op__main-tab ${mainTab === 'NGO' ? 'op__main-tab--active' : ''}`}
            onClick={() => setMainTab('NGO')}
          >
            Volunteers / NGO Post Holders
          </button>
          <button 
            className={`op__main-tab ${mainTab === 'Join' ? 'op__main-tab--active' : ''}`}
            onClick={() => setMainTab('Join')}
          >
            Join Us / Apply
          </button>
        </div>

        {/* ── Hospital Content Area ── */}
        {mainTab === 'Hospital' && (
          <div className="op__fade-in">
            {/* Sub Tabs for Hospital */}
            <div className="op__sub-tabs">
              {subTabs.map(tab => (
                <button 
                  key={tab}
                  className={`op__sub-tab ${activeSubTab === tab ? 'op__sub-tab--active' : ''}`}
                  onClick={() => setActiveSubTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid for all Medical Partners */}
            <HospitalDirectory activeCategory={activeSubTab} />
          </div>
        )}

        {/* ── NGO Content Area ── */}
        {mainTab === 'NGO' && (
          <div className="op__fade-in">
            {/* Sub Tabs for NGO */}
            <div className="op__sub-tabs">
              {ngoSubTabs.map(tab => (
                <button 
                  key={tab}
                  className={`op__sub-tab ${activeNgoTab === tab ? 'op__sub-tab--active' : ''}`}
                  onClick={() => setActiveNgoTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Loading State */}
            {loading && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                Loading volunteers...
              </div>
            )}

            {/* Error State */}
            {error && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>
                {error}
              </div>
            )}

            {/* Grid for NGO */}
            {!loading && !error && (
              <div className="op__ngo-grid">
                {volunteers.map(volunteer => (
                  <div key={volunteer._id} className="op__ngo-card">
                    <div className="op__ngo-card-inner">
                      <div className="op__ngo-img-wrapper">
                        <div className="op__ngo-img-ring"></div>
                        <img 
                          src={volunteer.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'} 
                          alt={volunteer.name} 
                          className="op__ngo-img" 
                        />
                        <div className="op__ngo-level-badge">{volunteer.level}</div>
                      </div>
                      <h3 className="op__ngo-name">{volunteer.name}</h3>
                      <p className="op__ngo-designation">{volunteer.designation}</p>
                      
                      <div className="op__ngo-details">
                        <div className="op__ngo-info">
                          <span>📍</span> {volunteer.location}
                        </div>
                        {volunteer.email && (
                          <div className="op__ngo-info">
                            <span>✉️</span> {volunteer.email}
                          </div>
                        )}
                        {volunteer.phone && (
                          <div className="op__ngo-info">
                            <span>📞</span> {volunteer.phone}
                          </div>
                        )}
                      </div>
                      <button className="op__ngo-connect-btn">Connect</button>
                    </div>
                  </div>
                ))}

                {volunteers.length === 0 && !loading && (
                  <div style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', padding: '40px', color: '#666' }}>
                    No volunteers found for this level yet.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Join Us Content Area ── */}
        {mainTab === 'Join' && (
          <JoinUsForms />
        )}

      </div>
    </section>
  );
}
