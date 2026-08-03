import React, { useState } from 'react';
import './VendorPartnership.css';

export default function VendorPartnership() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 'doctor', title: 'Doctor', icon: '👨‍⚕️', desc: 'Partner as an individual practitioner' },
    { id: 'hospital', title: 'Hospital', icon: '🏥', desc: 'Register your hospital facility' },
    { id: 'pathology', title: 'Pathology', icon: '🔬', desc: 'Join as a testing laboratory' },
    { id: 'diagnostics', title: 'Diagnostics', icon: '🩺', desc: 'Partner for imaging & scans' }
  ];

  return (
    <div className="vendor-page op__fade-in">
      <div className="vendor-hero">
        <div className="vendor-hero-content">
          <h1>Partner With NOVAMAX</h1>
          <p>Join our growing network of healthcare providers. Expand your reach, streamline your operations, and deliver better care to patients across the country.</p>
        </div>
      </div>

      <div className="vendor-container">
        <div className="vendor-categories">
          {categories.map(cat => (
            <div 
              key={cat.id}
              className={`vendor-card ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="vendor-icon">{cat.icon}</span>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="vendor-form-section">
            <div className="vendor-form-header">
              <h2>Apply as {categories.find(c => c.id === selectedCategory)?.title}</h2>
              <p>Please fill out the form below to begin the partnership process.</p>
            </div>
            
            <form onSubmit={e => e.preventDefault()}>
              <div className="v-form-grid">
                <div className="v-input-group">
                  <label>Full Name / Establishment Name</label>
                  <input type="text" placeholder="Enter name" required />
                </div>
                
                <div className="v-input-group">
                  <label>Registration Number (MCI/State)</label>
                  <input type="text" placeholder="Enter registration number" required />
                </div>

                <div className="v-input-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="example@email.com" required />
                </div>

                <div className="v-input-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="10-digit number" required />
                </div>

                <div className="v-input-group v-full-width">
                  <label>Years of Experience / Established Year</label>
                  <input type="text" placeholder="e.g. 10 years or 2015" required />
                </div>

                <div className="v-input-group v-full-width">
                  <label>Complete Address</label>
                  <textarea rows="3" placeholder="Enter full address of the facility/clinic" required></textarea>
                </div>
                
                <button type="submit" className="v-submit-btn">Submit Partnership Request</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
