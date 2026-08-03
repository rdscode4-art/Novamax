const fs = require('fs');

const pagesData = {
  'AboutUs.jsx': {
    title: 'About Us',
    subtitle: 'Making Quality Healthcare Affordable through NOVAMAX Digital Help For Humans Foundation.',
    icon: '🤝',
    gradient: 'linear-gradient(135deg, #0A2E73 0%, #1F5EFF 100%)',
    replaceRegex: /<section className="about__hero">(.|\n)*?<\/section>/
  },
  'ContactUs.jsx': {
    title: 'Contact Us',
    subtitle: 'We are here to assist you. Reach out to us for any queries or support regarding our healthcare services.',
    icon: '📞',
    gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)',
    replaceRegex: /<section className="contact-page__hero">(.|\n)*?<\/section>/
  },
  'HealthCard.jsx': {
    title: 'NOVAMAX Health Card',
    subtitle: 'Your gateway to premium healthcare services at highly subsidized rates across our verified network.',
    icon: '💳',
    gradient: 'linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%)',
    replaceRegex: /<section className="hc-page__hero">(.|\n)*?<\/section>/
  },
  'PartnerHospitals.jsx': {
    title: 'Partner Hospitals',
    subtitle: 'Our extensive network of top-tier hospitals and clinics committed to providing quality healthcare.',
    icon: '🏥',
    gradient: 'linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)',
    replaceRegex: /<section style=\{\{ padding: '80px 24px 0', textAlign: 'center' \}\}>(.|\n)*?<\/section>/
  },
  'Gallery.jsx': {
    title: 'Our Gallery',
    subtitle: 'Moments from our healthcare initiatives, medical camps, and community awareness programs.',
    icon: '📸',
    gradient: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
    replaceRegex: /<section style=\{\{ padding: '80px 24px 0', textAlign: 'center' \}\}>(.|\n)*?<\/section>/
  },
  'Certifications.jsx': {
    title: 'Our Certifications',
    subtitle: 'Recognized and registered with leading authorities, ensuring trust, transparency, and reliability.',
    icon: '🏆',
    gradient: 'linear-gradient(135deg, #FDC830 0%, #F37335 100%)',
    replaceRegex: /<section style=\{\{ padding: '80px 24px 0', textAlign: 'center' \}\}>(.|\n)*?<\/section>/
  }
};

for (const [file, data] of Object.entries(pagesData)) {
  const filePath = 'src/pages/' + file;
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('PageHero')) {
        content = content.replace(/import React from 'react';\n/, "import React from 'react';\nimport PageHero from '../components/common/PageHero';\n");
      }

      const heroComponent = `<PageHero \n        title="${data.title}" \n        subtitle="${data.subtitle}" \n        icon="${data.icon}" \n        bgGradient="${data.gradient}" \n      />`;
      
      if(data.replaceRegex.test(content)) {
          content = content.replace(data.replaceRegex, heroComponent);
      } else {
          console.log('Regex did not match for ' + file);
      }
      
      content = content.replace(/<div style=\{\{ paddingTop: '80px' \}\}>/, '<div>');
      
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + file);
    }
  } catch (e) {
    console.error('Error on ' + file, e);
  }
}
