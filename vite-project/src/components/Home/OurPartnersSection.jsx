import React, { useState } from 'react';
import './OurPartnersSection.css';
import JoinUsForms from './JoinUsForms';
import HospitalDirectory from '../Hospitals/HospitalDirectory';

const hospitalPartnersData = [
  {
    id: 1,
    category: 'Hospital',
    name: 'MAX Super Speciality',
    location: 'Delhi',
    address: 'Sector 14, Dwarka, New Delhi - 110075',
    facilities: ['ICU', 'Emergency 24/7', 'Operation Theater'],
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80',
    discount: 'Upto 40% Off'
  },
  {
    id: 2,
    category: 'Hospital',
    name: 'Fortis Hospital',
    location: 'Bangalore',
    address: 'Bannerghatta Road, Bangalore - 560076',
    facilities: ['Cardiology', 'Neurology', '24/7 Pharmacy'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
    discount: 'Upto 40% Off'
  },
  {
    id: 3,
    category: 'Doctor Clinic',
    name: 'Sharma Dental Clinic',
    location: 'Mumbai',
    address: 'Andheri West, Near Metro Station, Mumbai - 400053',
    facilities: ['Root Canal', 'Implants', 'Teeth Whitening'],
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80',
    discount: '20% Off on Consultation'
  },
  {
    id: 4,
    category: 'Medical Store',
    name: 'Apollo Pharmacy',
    location: 'Hyderabad',
    address: 'Jubilee Hills, Road No 36, Hyderabad - 500033',
    facilities: ['All Medicines', 'Home Delivery', '24/7 Open'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    discount: 'Flat 15% Off'
  },
  {
    id: 5,
    category: 'Diagnosis Center',
    name: 'Dr. Lal PathLabs',
    location: 'Delhi',
    address: 'Connaught Place, New Delhi - 110001',
    facilities: ['Blood Test', 'Covid Testing', 'Full Body Checkup'],
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80',
    discount: 'Upto 30% Off'
  },
  {
    id: 6,
    category: 'X-Ray / Ultrasound',
    name: 'Vision Imaging Center',
    location: 'Pune',
    address: 'Koregaon Park, Pune - 411001',
    facilities: ['Digital X-Ray', '3D Ultrasound', 'MRI Scan'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80',
    discount: '25% Off on Scans'
  }
];

const ngoVolunteersData = [
  {
    id: 1,
    level: 'National Level',
    name: 'Dr. Ramesh Kumar',
    designation: 'National President',
    location: 'New Delhi, India',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    contact: 'contact@novamax.org'
  },
  {
    id: 2,
    level: 'State Level',
    name: 'Sunita Sharma',
    designation: 'State Coordinator',
    location: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    contact: 'up@novamax.org'
  },
  {
    id: 3,
    level: 'District Level',
    name: 'Amit Patel',
    designation: 'District Head',
    location: 'Ahmedabad, Gujarat',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    contact: 'amit.patel@novamax.org'
  },
  {
    id: 4,
    level: 'City Level',
    name: 'Priya Singh',
    designation: 'City Operations Manager',
    location: 'Pune, Maharashtra',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    contact: 'priya.s@novamax.org'
  },
  {
    id: 5,
    level: 'Block Level',
    name: 'Vikram Singh',
    designation: 'Block Supervisor',
    location: 'Bijnor, UP',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80',
    contact: 'vikram@novamax.org'
  }
];

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

  const filteredHospitals = hospitalPartnersData.filter(partner => {
    if (activeSubTab === 'All') return true;
    return partner.category === activeSubTab;
  });

  const filteredNgo = ngoVolunteersData.filter(volunteer => {
    if (activeNgoTab === 'All') return true;
    return volunteer.level === activeNgoTab;
  });

  return (
    <section className="our-partners">
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

            {/* Grid for Hospital */}
            {activeSubTab === 'Hospital' ? (
              <HospitalDirectory />
            ) : (
              <div className="op__grid">
                {filteredHospitals.map(partner => (
                  <div key={partner.id} className="op__card">
                    <div className="op__card-image-wrapper">
                      <img src={partner.image} alt={partner.name} className="op__card-img" />
                      <div className="op__card-discount">{partner.discount}</div>
                    </div>
                    <div className="op__card-content">
                      <span className="op__card-category">{partner.category}</span>
                      <h3 className="op__card-title">{partner.name}</h3>
                      
                      <div className="op__card-info">
                        <span className="op__icon">📍</span>
                        <span><strong>{partner.location}</strong> - {partner.address}</span>
                      </div>

                      <div className="op__facilities">
                        {partner.facilities.map((fac, idx) => (
                          <span key={idx} className="op__facility-tag">{fac}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredHospitals.length === 0 && (
                  <div style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', padding: '40px', color: '#666' }}>
                    No partners found in this category yet.
                  </div>
                )}
              </div>
            )}
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

            {/* Grid for NGO */}
            <div className="op__ngo-grid">
              {filteredNgo.map(volunteer => (
                <div key={volunteer.id} className="op__ngo-card">
                  <div className="op__ngo-img-wrapper">
                    <img src={volunteer.image} alt={volunteer.name} className="op__ngo-img" />
                    <div className="op__ngo-level-badge">{volunteer.level}</div>
                  </div>
                  <h3 className="op__ngo-name">{volunteer.name}</h3>
                  <p className="op__ngo-designation">{volunteer.designation}</p>
                  
                  <div className="op__ngo-details">
                    <div className="op__ngo-info">
                      <span>📍</span> {volunteer.location}
                    </div>
                    <div className="op__ngo-info">
                      <span>✉️</span> {volunteer.contact}
                    </div>
                  </div>
                </div>
              ))}

              {filteredNgo.length === 0 && (
                <div style={{ textAlign: 'center', width: '100%', gridColumn: '1 / -1', padding: '40px', color: '#666' }}>
                  No volunteers found for this level yet.
                </div>
              )}
            </div>
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
