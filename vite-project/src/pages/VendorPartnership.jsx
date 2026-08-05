import React, { useState, useRef } from 'react';
import './VendorPartnership.css';
import { partnerService } from '../services/partnerService';

export default function VendorPartnership() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState({ name: '', registrationNumber: '', email: '', phone: '', experience: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const formRef = useRef(null);

  const categories = [
    { id: 'doctor',      title: 'Doctor',      icon: '👨‍⚕️', desc: 'Partner as an individual practitioner' },
    { id: 'hospital',    title: 'Hospital',    icon: '🏥',   desc: 'Register your hospital facility' },
    { id: 'pathology',   title: 'Pathology',   icon: '🔬',   desc: 'Join as a testing laboratory' },
    { id: 'diagnostics', title: 'Diagnostics', icon: '🩺',   desc: 'Partner for imaging & scans' },
  ];

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await partnerService.submit({ ...form, applicantType: selectedCategory });
      setSubmitted(true);
      setForm({ name: '', registrationNumber: '', email: '', phone: '', experience: '', address: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (id) => {
    setSelectedCategory(id);
    setSubmitted(false);
    setError('');
    // Auto scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

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
              onClick={() => handleSelectCategory(cat.id)}
            >
              <span className="vendor-icon">{cat.icon}</span>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="vendor-form-section" ref={formRef} style={{ scrollMarginTop: '80px' }}>
            <div className="vendor-form-header">
              <h2>Apply as {categories.find(c => c.id === selectedCategory)?.title}</h2>
              <p>Please fill out the form below to begin the partnership process.</p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#1a3a6b', marginBottom: 8 }}>Application Submitted!</h3>
                <p style={{ color: '#555' }}>Thank you! Our team will review your application and contact you soon.</p>
                <button onClick={() => { setSubmitted(false); setSelectedCategory(null); }}
                  style={{ marginTop: 20, padding: '10px 24px', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
                    {error}
                  </div>
                )}
                <div className="v-form-grid">
                  <div className="v-input-group">
                    <label>Full Name / Establishment Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter name" required />
                  </div>
                  <div className="v-input-group">
                    <label>Registration Number (Doctor/Hospital)</label>
                    <input type="text" name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Enter registration number" />
                  </div>
                  <div className="v-input-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="example@email.com" required />
                  </div>
                  <div className="v-input-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit number" required />
                  </div>
                  <div className="v-input-group v-full-width">
                    <label>Years of Experience / Established Year</label>
                    <input type="text" name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 10 years or 2015" />
                  </div>
                  <div className="v-input-group v-full-width">
                    <label>Complete Address</label>
                    <textarea name="address" value={form.address} onChange={handleChange} rows="3" placeholder="Enter full address of the facility/clinic" required />
                  </div>
                  <button type="submit" className="v-submit-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Partnership Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
