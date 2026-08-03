import React, { useState } from 'react';

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
    background: linear-gradient(135deg, #0A2E73 0%, #26D0CE 100%);
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
  .hospital-dir__input::placeholder {
    color: #94a3b8;
  }
  .hospital-dir__input:focus {
    border-color: #3b82f6;
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
  .hospital-dir__main {
    flex: 1;
    min-width: 0;
  }
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
  .h-card:hover .h-card__img {
    transform: scale(1.08);
  }
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
    color: #2563eb;
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
  .h-card__location svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
  .h-card__location strong {
    color: #334155;
    font-weight: 700;
  }
  
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
    color: #3b82f6;
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
  .hospital-dir__empty-icon {
    font-size: 56px;
    margin-bottom: 20px;
  }
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

const images = [
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
];

const hospitalsData = [
  { id: 1, name: "MAX Super Speciality", state: "Delhi", city: "Delhi", address: "Sector 14, Dwarka, New Delhi", pincode: "110075", discount: "Upto 40% Off", image: images[0], facilities: ["ICU", "Emergency 24/7", "Operation Theater"] },
  { id: 2, name: "Fortis Hospital", state: "Karnataka", city: "Bangalore", address: "Bannerghatta Road, Bangalore", pincode: "560076", discount: "Upto 40% Off", image: images[1], facilities: ["Cardiology", "Neurology", "24/7 Pharmacy"] },
  { id: 3, name: "Apollo Hospitals", state: "Andhra Pradesh", city: "Visakhapatnam", address: "Health City, Arilova", pincode: "530002", discount: "Upto 50% Off", image: images[2], facilities: ["ICU", "Diagnostics", "24/7 Ambulance"] },
  { id: 4, name: "Ramakrishna Mission", state: "Arunachal Pradesh", city: "Itanagar", address: "VIP Road, Itanagar", pincode: "791111", discount: "Upto 30% Off", image: images[3], facilities: ["General Ward", "Emergency", "Maternity"] },
  { id: 5, name: "GNRC Hospitals", state: "Assam", city: "Guwahati", address: "Dispur, Guwahati", pincode: "781006", discount: "Upto 40% Off", image: images[0], facilities: ["Neurosciences", "Emergency 24/7", "ICU"] },
  { id: 6, name: "Paras HMRI Hospital", state: "Bihar", city: "Patna", address: "Raja Bazar, Bailey Road", pincode: "800014", discount: "Upto 50% Off", image: images[1], facilities: ["Oncology", "Cardiology", "NICU"] },
  { id: 7, name: "Ramkrishna Care", state: "Chhattisgarh", city: "Raipur", address: "Aurobindo Enclave, Pachpedi Naka", pincode: "492001", discount: "Upto 45% Off", image: images[2], facilities: ["Trauma Center", "Blood Bank", "ICU"] },
  { id: 8, name: "Manipal Hospitals", state: "Goa", city: "Panaji", address: "Dona Paula, Panaji", pincode: "403004", discount: "Upto 30% Off", image: images[3], facilities: ["ICU", "Operation Theater", "Diagnostics"] },
  { id: 9, name: "Zydus Hospital", state: "Gujarat", city: "Ahmedabad", address: "SG Highway, Thaltej", pincode: "380054", discount: "Upto 50% Off", image: images[0], facilities: ["Transplant Center", "Emergency 24/7", "Pharmacy"] },
  { id: 10, name: "Medanta - The Medicity", state: "Haryana", city: "Gurugram", address: "Sector 38, Gurugram", pincode: "122001", discount: "Upto 40% Off", image: images[1], facilities: ["ICU", "Robotic Surgery", "Air Ambulance"] },
  { id: 11, name: "IGMC Hospital", state: "Himachal Pradesh", city: "Shimla", address: "Ridge Sanjauli Road", pincode: "171001", discount: "Upto 20% Off", image: images[2], facilities: ["General Ward", "Emergency", "Outpatient"] },
  { id: 12, name: "Medica Superspecialty", state: "Jharkhand", city: "Ranchi", address: "Bariatu Road, Ranchi", pincode: "834009", discount: "Upto 35% Off", image: images[3], facilities: ["Orthopedics", "ICU", "Trauma"] },
  { id: 13, name: "Aster Medcity", state: "Kerala", city: "Kochi", address: "Cheranalloor, Kochi", pincode: "682027", discount: "Upto 40% Off", image: images[0], facilities: ["Cardiology", "Neurology", "Robotic Surgery"] },
  { id: 14, name: "Apollo Hospitals", state: "Madhya Pradesh", city: "Indore", address: "Vijay Nagar, Indore", pincode: "452010", discount: "Upto 50% Off", image: images[1], facilities: ["ICU", "Emergency 24/7", "Diagnostics"] },
  { id: 15, name: "Lilavati Hospital", state: "Maharashtra", city: "Mumbai", address: "Bandra West, Mumbai", pincode: "400050", discount: "Upto 30% Off", image: images[2], facilities: ["Maternity", "ICU", "24/7 Pharmacy"] },
  { id: 16, name: "Shija Hospitals", state: "Manipur", city: "Imphal", address: "Langol, Imphal", pincode: "795001", discount: "Upto 25% Off", image: images[3], facilities: ["General Surgery", "Emergency", "Blood Bank"] },
  { id: 17, name: "Bethany Hospital", state: "Meghalaya", city: "Shillong", address: "Nongrim Hills, Shillong", pincode: "793003", discount: "Upto 30% Off", image: images[0], facilities: ["ICU", "Diagnostics", "Outpatient"] },
  { id: 18, name: "Synod Hospital", state: "Mizoram", city: "Aizawl", address: "Durtlang, Aizawl", pincode: "796001", discount: "Upto 20% Off", image: images[1], facilities: ["General Ward", "Emergency", "Pharmacy"] },
  { id: 19, name: "Oking Hospital", state: "Nagaland", city: "Kohima", address: "Phoolbari, Kohima", pincode: "797001", discount: "Upto 25% Off", image: images[2], facilities: ["ICU", "Maternity", "Emergency"] },
  { id: 20, name: "KIMS Hospital", state: "Odisha", city: "Bhubaneswar", address: "Patia, Bhubaneswar", pincode: "751024", discount: "Upto 40% Off", image: images[3], facilities: ["Cardiology", "Neurology", "ICU"] },
  { id: 21, name: "CMC Hospital", state: "Punjab", city: "Ludhiana", address: "Brown Road, Ludhiana", pincode: "141008", discount: "Upto 30% Off", image: images[0], facilities: ["Trauma Center", "ICU", "Blood Bank"] },
  { id: 22, name: "Fortis Escorts", state: "Rajasthan", city: "Jaipur", address: "JLN Marg, Malviya Nagar", pincode: "302017", discount: "Upto 45% Off", image: images[1], facilities: ["Cardiology", "Emergency 24/7", "Operation Theater"] },
  { id: 23, name: "Central Referral", state: "Sikkim", city: "Gangtok", address: "Tadong, Gangtok", pincode: "737102", discount: "Upto 35% Off", image: images[2], facilities: ["General Ward", "ICU", "Diagnostics"] },
  { id: 24, name: "Apollo Greams Road", state: "Tamil Nadu", city: "Chennai", address: "Greams Lane, Chennai", pincode: "600006", discount: "Upto 40% Off", image: images[3], facilities: ["Transplant Center", "ICU", "Robotic Surgery"] },
  { id: 25, name: "Yashoda Hospitals", state: "Telangana", city: "Hyderabad", address: "Secunderabad", pincode: "500003", discount: "Upto 50% Off", image: images[0], facilities: ["Oncology", "Cardiology", "NICU"] },
  { id: 26, name: "ILS Hospitals", state: "Tripura", city: "Agartala", address: "Capital Complex, Agartala", pincode: "799006", discount: "Upto 30% Off", image: images[1], facilities: ["ICU", "Emergency 24/7", "Maternity"] },
  { id: 27, name: "Sahara Hospital", state: "Uttar Pradesh", city: "Lucknow", address: "Gomti Nagar, Lucknow", pincode: "226010", discount: "Upto 40% Off", image: images[2], facilities: ["Neurology", "Orthopedics", "ICU"] },
  { id: 28, name: "AMRI Hospitals", state: "West Bengal", city: "Kolkata", address: "Salt Lake City, Kolkata", pincode: "700098", discount: "Upto 40% Off", image: images[3], facilities: ["Cardiology", "Emergency 24/7", "Diagnostics"] }
];

export default function HospitalDirectory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHospitals = hospitalsData.filter((hospital) => {
    const term = searchTerm.toLowerCase();
    return (
      hospital.name.toLowerCase().includes(term) ||
      hospital.city.toLowerCase().includes(term) ||
      hospital.state.toLowerCase().includes(term) ||
      hospital.pincode.toLowerCase().includes(term) ||
      hospital.address.toLowerCase().includes(term)
    );
  });

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
          </aside>

          <main className="hospital-dir__main">
            {filteredHospitals.length > 0 ? (
              <div className="hospital-dir__grid">
                {filteredHospitals.map((hospital) => (
                  <div key={hospital.id} className="h-card">
                    
                    <div className="h-card__img-container">
                      <img src={hospital.image} alt={hospital.name} className="h-card__img" loading="lazy" />
                      <div className="h-card__discount">{hospital.discount}</div>
                    </div>
                    
                    <div className="h-card__body">
                      <div className="h-card__tag">HOSPITAL</div>
                      <h3 className="h-card__name">{hospital.name}</h3>
                      
                      <div className="h-card__location">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#e11d48" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                        </svg>
                        <div>
                          <strong>{hospital.city}</strong> - {hospital.address} - {hospital.pincode}
                        </div>
                      </div>

                      <div className="h-card__divider"></div>

                      <div className="h-card__facilities">
                        {hospital.facilities.map((fac, idx) => (
                          <span key={idx} className="h-card__facility">{fac}</span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="hospital-dir__empty">
                <div className="hospital-dir__empty-icon">🏥</div>
                <h3 className="hospital-dir__empty-title">No Hospitals Found</h3>
                <p>We couldn't find any hospitals matching "{searchTerm}". Please try a different city, state, or pincode.</p>
              </div>
            )}
          </main>

        </div>
      </section>
    </>
  );
}
