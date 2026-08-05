import React from 'react';
import { Stethoscope, HeartPulse, Pill, Syringe, Activity, ShieldPlus, TestTube, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalBackground() {
  const icons = [
    { Icon: Stethoscope, top: '10%', left: '8%', size: 70, delay: 0 },
    { Icon: HeartPulse, top: '25%', right: '8%', size: 85, delay: 1.5 },
    { Icon: Pill, top: '60%', left: '12%', size: 60, delay: 0.5 },
    { Icon: Syringe, top: '75%', right: '10%', size: 75, delay: 2 },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: 50, /* Over sections but under modals/headers if needed. Let's use 50 */
      overflow: 'hidden'
    }}>
      {icons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: item.top,
            ...(item.left ? { left: item.left } : { right: item.right }),
            color: '#1a3a6b',
            opacity: 0.04, // Very subtle, acts as a watermark
          }}
        >
          <item.Icon size={item.size} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
}
