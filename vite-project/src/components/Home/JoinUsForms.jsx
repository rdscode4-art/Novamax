import React, { useState } from 'react';
import './JoinUsForms.css';
import { joinService } from '../../services/joinService';

const designationOptions = {
  state: ['State President', 'State Vice President', 'State General Secretary'],
  district: ['District President', 'District Vice President', 'District General Secretary', 'District Project Manager'],
  block: ['Block President', 'Block Vice President', 'Block General Secretary', 'Volunteer'],
  city: ['City President', 'City Vice President', 'City General Secretary', 'Volunteer'],
  village: ['Village President', 'Village Vice President', 'Village General Secretary', 'Volunteer'],
  national: ['National President', 'National Vice President', 'National General Secretary']
};

export default function JoinUsForms() {
  const [formType, setFormType] = useState('post');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Volunteer form state
  const [volunteerForm, setVolunteerForm] = useState({
    fullName: '', fatherName: '', phone: '', whatsapp: '', email: '', panCard: '', postLevel: '', address: '', photo: null,
  });

  // Subadmin form state
  const [subadminForm, setSubadminForm] = useState({
    fullName: '', fatherName: '', phone: '', email: '', panCard: '', postLevel: '', designation: '',
    aadhaar: '', state: '', pinCode: '', address: '', photo: null,
  });

  const handleVolChange = (e) => {
    if (e.target.type === 'file') {
      setVolunteerForm(p => ({ ...p, photo: e.target.files[0] }));
    } else {
      setVolunteerForm(p => ({ ...p, [e.target.name]: e.target.value }));
    }
  };

  const handleSubChange = (e) => {
    if (e.target.type === 'file') {
      setSubadminForm(p => ({ ...p, photo: e.target.files[0] }));
    } else if (e.target.name === 'postLevel') {
      // Reset designation when postLevel changes
      setSubadminForm(p => ({ ...p, postLevel: e.target.value, designation: '' }));
    } else {
      setSubadminForm(p => ({ ...p, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('formType', type === 'post' ? 'volunteer' : 'subadmin');
      const data = type === 'post' ? volunteerForm : subadminForm;
      Object.entries(data).forEach(([k, v]) => {
        if (k === 'photo' && v) fd.append('photo', v);
        else if (v) fd.append(k, v);
      });
      await joinService.submit(fd);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="join-us-container op__fade-in" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 style={{ color: '#1a3a6b' }}>Application Submitted!</h2>
        <p style={{ color: '#555', fontSize: 15 }}>Thank you for joining our mission! We will review and get back to you.</p>
        <button onClick={() => { setSubmitted(false); setError(''); }}
          style={{ marginTop: 24, padding: '12px 28px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
          Submit Another Application
        </button>
      </div>
    );
  }

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
                border: '1.5px dashed #2563a8', background: '#eff6ff',
                color: '#2563a8', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
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
        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14, maxWidth: 600, margin: '0 auto 16px' }}>
            {error}
          </div>
        )}

        {formType === 'post' && (
          <form className="ju-form op__fade-in" onSubmit={(e) => handleSubmit(e, 'post')}>
            <h3 className="ju-form-title">Volunteer Post Application</h3>
            <div className="ju-form-grid">
              <div className="ju-input-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={volunteerForm.fullName} onChange={handleVolChange} placeholder="Enter your full name" required />
              </div>
              <div className="ju-input-group">
                <label>Father's Name</label>
                <input type="text" name="fatherName" value={volunteerForm.fatherName} onChange={handleVolChange} placeholder="Enter father's name" required />
              </div>
              <div className="ju-input-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={volunteerForm.phone} onChange={handleVolChange} placeholder="10-digit mobile number" required />
              </div>
              <div className="ju-input-group">
                <label>WhatsApp Number</label>
                <input type="tel" name="whatsapp" value={volunteerForm.whatsapp} onChange={handleVolChange} placeholder="WhatsApp number" />
              </div>
              <div className="ju-input-group">
                <label>Email Address (Optional)</label>
                <input type="email" name="email" value={volunteerForm.email} onChange={handleVolChange} placeholder="Email address" />
              </div>
              <div className="ju-input-group">
                <label>PAN Card (Optional)</label>
                <input type="text" name="panCard" value={volunteerForm.panCard} onChange={handleVolChange} placeholder="Enter PAN number" />
              </div>
              <PhotoUpload label="Applicant Photo (Clear Front Face)" onChange={handleVolChange} />
              <div className="ju-input-group">
                <label>Post Applying For</label>
                <select name="postLevel" value={volunteerForm.postLevel} onChange={handleVolChange} required>
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
                <textarea name="address" value={volunteerForm.address} onChange={handleVolChange} rows="3" placeholder="Enter your complete address" required />
              </div>
            </div>
            <button type="submit" className="ju-submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        )}

        {formType === 'subadmin' && (
          <form className="ju-form op__fade-in" onSubmit={(e) => handleSubmit(e, 'subadmin')}>
            <h3 className="ju-form-title">Sub-Admin Application</h3>
            <div className="ju-form-grid">
              <div className="ju-input-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={subadminForm.fullName} onChange={handleSubChange} placeholder="Enter your full name" required />
              </div>
              <div className="ju-input-group">
                <label>Father's Name</label>
                <input type="text" name="fatherName" value={subadminForm.fatherName} onChange={handleSubChange} placeholder="Enter father's name" required />
              </div>
              <div className="ju-input-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={subadminForm.phone} onChange={handleSubChange} placeholder="10-digit mobile number" required />
              </div>
              <div className="ju-input-group">
                <label>Email Address (Optional)</label>
                <input type="email" name="email" value={subadminForm.email} onChange={handleSubChange} placeholder="Email address" />
              </div>
              <div className="ju-input-group">
                <label>PAN Card (Optional)</label>
                <input type="text" name="panCard" value={subadminForm.panCard} onChange={handleSubChange} placeholder="Enter PAN number" />
              </div>
              <PhotoUpload label="Applicant Photo (Clear Front Face)" onChange={handleSubChange} />
              <div className="ju-input-group">
                <label>Post Level</label>
                <select name="postLevel" value={subadminForm.postLevel} onChange={handleSubChange} required>
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
                <input type="text" name="aadhaar" value={subadminForm.aadhaar} onChange={handleSubChange} placeholder="12-digit Aadhaar number" />
              </div>
              <div className="ju-input-group">
                <label>Designation</label>
                <select name="designation" value={subadminForm.designation} onChange={handleSubChange} required disabled={!subadminForm.postLevel}>
                  <option value="">Select Designation</option>
                  {subadminForm.postLevel && designationOptions[subadminForm.postLevel]?.map(desig => (
                    <option key={desig} value={desig}>{desig}</option>
                  ))}
                </select>
              </div>
              <div className="ju-input-group">
                <label>State</label>
                <input type="text" name="state" value={subadminForm.state} onChange={handleSubChange} placeholder="Enter State" required />
              </div>
              <div className="ju-input-group">
                <label>Pin Code</label>
                <input type="text" name="pinCode" value={subadminForm.pinCode} onChange={handleSubChange} placeholder="Enter PIN code" />
              </div>
              <div className="ju-input-group ju-full-width">
                <label>Detailed Address</label>
                <textarea name="address" value={subadminForm.address} onChange={handleSubChange} rows="3" placeholder="House no, Street, City/Village" required />
              </div>
            </div>
            <button type="submit" className="ju-submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Sub-Admin Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
