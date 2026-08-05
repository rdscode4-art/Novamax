import React, { useState } from 'react';

const css = `
  .faq {
    padding: 100px 24px;
    background: #fff;
    font-family: 'Inter', sans-serif;
  }
  .faq__container {
    max-width: 900px;
    margin: 0 auto;
  }
  .faq__header {
    text-align: center;
    margin-bottom: 64px;
  }
  .faq__title {
    font-family: 'Poppins', sans-serif;
    font-size: 40px;
    font-weight: 700;
    color: #1a3a6b;
    margin-bottom: 16px;
  }
  .faq__subtitle {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
  }
  .faq__list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .faq__item {
    background: #F8FAFD;
    border: 1px solid #E6EAF0;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s;
  }
  .faq__item--active {
    background: #fff;
    border-color: #2563a8;
    box-shadow: 0 8px 24px rgba(31,94,255,0.08);
  }
  .faq__question {
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #1A1A1A;
  }
  .faq__icon {
    font-size: 24px;
    color: #2563a8;
    transition: transform 0.3s;
  }
  .faq__item--active .faq__icon {
    transform: rotate(45deg);
  }
  .faq__answer {
    padding: 0 32px;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    color: #666;
    font-size: 15px;
    line-height: 1.6;
  }
  .faq__item--active .faq__answer {
    padding: 0 32px 24px;
    max-height: 500px; /* arbitrary max-height for animation */
  }
`;

const faqs = [
  {
    q: 'What is the NOVAMAX Health Card?',
    a: 'The NOVAMAX Health Card is a premium membership card that gives you and your family access to highly subsidized rates on OPD, IPD, medicines, and diagnostics at our partnered hospitals and clinics.'
  },
  {
    q: 'How do I download and use the Mobile App?',
    a: 'You can download the NOVAMAX app from the Google Play Store. Once registered, your digital health card will be automatically activated inside the app, and you can use it to book appointments or locate nearby hospitals.'
  },
  {
    q: 'Are my family members covered under one plan?',
    a: 'Yes, depending on the membership plan you choose (like Gold or Premium), you can add family members to your health wallet and they can avail the exact same benefits.'
  },
  {
    q: 'How do I claim discounts at the hospital?',
    a: 'It is very simple. Present your physical or digital NOVAMAX Health Card at the billing counter of any partner hospital before the invoice is generated, and the applicable discount will be automatically deducted.'
  },
  {
    q: 'What if I need emergency medical assistance?',
    a: 'Our app features a one-tap Emergency Support button that connects you immediately to our 24x7 helpdesk, which can coordinate ambulance services and alert the nearest partner hospital.'
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <>
      <style>{css}</style>
      <section className="faq">
        <div className="faq__container">
          <div className="faq__header">
            <h2 className="faq__title">Frequently Asked Questions</h2>
            <p className="faq__subtitle">
              Have questions about our membership or mobile app? Find your answers below.
            </p>
          </div>
          <div className="faq__list">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`faq__item ${openIdx === i ? 'faq__item--active' : ''}`}
              >
                <div className="faq__question" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                  {faq.q}
                  <span className="faq__icon">+</span>
                </div>
                <div className="faq__answer">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
