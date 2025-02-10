import React from 'react';
import { motion } from 'framer-motion';

export const AfricanPattern: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Motifs de base */}
      <defs>
        <pattern id="adinkraPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="2" fill="#F59E0B" fillOpacity="0.2" />
          <circle cx="0" cy="0" r="2" fill="#F59E0B" fillOpacity="0.2" />
          <circle cx="0" cy="50" r="2" fill="#F59E0B" fillOpacity="0.2" />
          <circle cx="50" cy="0" r="2" fill="#F59E0B" fillOpacity="0.2" />
          <circle cx="50" cy="50" r="2" fill="#F59E0B" fillOpacity="0.2" />
          <path d="M25 0L50 25L25 50L0 25Z" stroke="#F59E0B" strokeOpacity="0.2" strokeWidth="1" fill="none" />
        </pattern>
      </defs>

      {/* Background avec motifs */}
      <motion.rect
        width="300"
        height="300"
        fill="url(#adinkraPattern)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Motifs géométriques animés */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.g key={i} transform={`rotate(${i * 90} 150 150)`}>
          <motion.path
            d="M150 50C183.137 50 210 76.8629 210 110C210 143.137 183.137 170 150 170C116.863 170 90 143.137 90 110C90 76.8629 116.863 50 150 50Z"
            stroke="#F59E0B"
            strokeOpacity="0.3"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        </motion.g>
      ))}

      {/* Motifs centraux */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <path
          d="M150 140L160 150L150 160L140 150Z"
          fill="#F59E0B"
          fillOpacity="0.4"
        />
      </motion.g>
    </svg>
  </div>
);
