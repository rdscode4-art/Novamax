import React, { useState } from 'react';
import './JoinUsForms.css';

export default function JoinUsForms() {
  const [formType, setFormType] = useState('post'); // 'post' | 'subadmin'

  const PhotoUpload = ({ label }) => {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    };

    return (
      <div className="ju-input-group">
        <label>{label || 'Applicant Photo'}</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          
          <div style={{ flex: 1 }}>
            <label 
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                width: '100%', borderRadius: '12px', 
                border: '1.5px dashed #2563eb', background: '#eff6ff',
                color: '#2563eb', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                height: '52px', transition: 'all 0.2s'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Upload from file
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
            <small style={{ display: 'block', marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
              Upload a clear passport size photo.
            </small>
          </div>

          <div style={{ 
            width: '42px', height: '52px', 
            background: '#e2e8f0', borderRadius: '8px', 
            overflow: 'hidden', flexShrink: 0,
            border: '1px solid #ddd',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {preview ? (
              <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
            ) : (
              <span style={{ fontSize: '18px', color: '#94a3b8' }}>👤</span>
            )}
          </div>
          
        </div>
      </div>
    );
  };

  return (
    <div className="join-us-container op__fade-in">
      <div className="join-us-header">
        <h2>Join Our Mission</h2>
        <p>Become a vital part of the NOVAMAX Foundation. Select your desired role below to apply.</p>
        
        <div className="join-us-toggle">
          <button 
            className={`ju-toggle-btn ${formType === 'post' ? 'ju-toggle-btn--active' : ''}`}
            onClick={() => setFormType('post')}
          >
            Apply for Post (Volunteer)
          </button>
          <button 
            className={`ju-toggle-btn ${formType === 'subadmin' ? 'ju-toggle-btn--active' : ''}`}
            onClick={() => setFormType('subadmin')}
          >
            Apply for Sub-Admin
          </button>
        </div>
      </div>

      <div className="join-us-form-wrapper">
        {formType === 'post' && (
          <form className="ju-form op__fade-in" onSubmit={(e) => e.preventDefault()}>
            <h3 className="ju-form-title">Volunteer Post Application</h3>
            
            <div className="ju-form-grid">
              <div className="ju-input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="ju-input-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="10-digit mobile number" required />
              </div>
              <div className="ju-input-group">
                <label>WhatsApp Number</label>
                <input type="tel" placeholder="WhatsApp number" required />
              </div>
              <div className="ju-input-group">
                <label>Email Address</label>
                <input type="email" placeholder="Email address" required />
              </div>
              
              <PhotoUpload label="Applicant Photo (Clear Front Face)" />
              
              <div className="ju-input-group">
                <label>Post Applying For</label>
                <select required>
                  <option value="">Select a level</option>
                  <option value="national">National Level Volunteer</option>
                  <option value="state">State Level Volunteer</option>
                  <option value="district">District Level Volunteer</option>
                  <option value="city">City / Town Level Volunteer</option>
                  <option value="block">Block Level Volunteer</option>
                  <option value="village">Village Level Volunteer</option>
                </select>
              </div>

              <div className="ju-input-group ju-full-width">
                <label>Full Address</label>
                <textarea rows="3" placeholder="Enter your complete address" required></textarea>
              </div>
            </div>
            
            <button type="submit" className="ju-submit-btn">Submit Application</button>
          </form>
        )}

        {formType === 'subadmin' && (
          <form className="ju-form op__fade-in" onSubmit={(e) => e.preventDefault()}>
            <h3 className="ju-form-title">Sub-Admin Application</h3>
            
            <div className="ju-form-grid">
              <div className="ju-input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="ju-input-group">
                <label>Father's Name</label>
                <input type="text" placeholder="Enter father's name" required />
              </div>
              <div className="ju-input-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="10-digit mobile number" required />
              </div>
              <div className="ju-input-group">
                <label>Email Address</label>
                <input type="email" placeholder="Email address" required />
              </div>
              
              <PhotoUpload label="Applicant Photo (Clear Front Face)" />
              
              <div className="ju-input-group">
                <label>Post Level</label>
                <select required>
                  <option value="">Select Level</option>
                  <option value="national">National Level</option>
                  <option value="state">State Level</option>
                  <option value="district">District Level</option>
                  <option value="city">City / Town Level</option>
                  <option value="block">Block Level</option>
                  <option value="village">Village Level</option>
                </select>
              </div>

              <div className="ju-input-group">
                <label>Aadhaar Number</label>
                <input type="text" placeholder="12-digit Aadhaar number" required />
              </div>
              <div className="ju-input-group">
                <label>Designation</label>
                <select required>
                  <option value="">Select Designation</option>
                  <option value="president">President</option>
                  <option value="secretary">Secretary</option>
                  <option value="coordinator">Coordinator</option>
                  <option value="executive">Executive Member</option>
                </select>
              </div>
              <div className="ju-input-group">
                <label>State</label>
                <input type="text" placeholder="Enter State" required />
              </div>
              <div className="ju-input-group">
                <label>Pin Code</label>
                <input type="text" placeholder="Enter PIN code" required />
              </div>
              
              <div className="ju-input-group ju-full-width">
                <label>Detailed Address</label>
                <textarea rows="3" placeholder="House no, Street, City/Village" required></textarea>
              </div>
            </div>
            
            <button type="submit" className="ju-submit-btn">Submit Sub-Admin Application</button>
          </form>
        )}
      </div>
    </div>
  );
}
