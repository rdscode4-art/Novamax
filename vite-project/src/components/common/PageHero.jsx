import React from 'react';
import { motion } from 'framer-motion';
import './PageHero.css';
import aboutHeroBg from '../../assets/about_hero_bg.png';

export default function PageHero({ title, subtitle, bgGradient, icon, bgImage }) {
  const image = bgImage || aboutHeroBg;

  return (
    <section className="custom-page-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="floating-shape-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
      <div className="floating-shape-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
      </div>
      <motion.div 
        className="custom-hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="custom-hero-title">{title}</h1>
        <div className="custom-hero-breadcrumb">
          Home &nbsp;/&nbsp; <span>{title}</span>
        </div>
      </motion.div>
    </section>
  );
}
