import React from 'react';
import { motion } from 'framer-motion';
import heroBanner from '../../assets/herosection.png';
import mobileBanner from '../../assets/mobilebanner.png';

export default function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ width: '100%', overflow: 'hidden', background: '#fff', margin: 0, padding: 0, lineHeight: 0 }}
    >
      <picture>
        <source media="(max-width: 768px)" srcSet={mobileBanner} />
        <img
          src={heroBanner}
          alt="Healthcare for every family in India"
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block',
            objectFit: 'cover',
            margin: 0,
            padding: 0
          }}
        />
      </picture>
    </motion.section>
  );
}
