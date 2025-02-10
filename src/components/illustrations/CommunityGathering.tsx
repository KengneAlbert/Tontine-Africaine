import React from 'react';
import { motion } from 'framer-motion';

export const CommunityGathering: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <svg viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fond avec motifs */}
      <motion.path
        d="M0 100C150 100 350 100 500 100C500 200 350 300 250 300C150 300 0 200 0 100Z"
        fill="url(#africanGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Groupe de personnes stylisées */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Ajouter plusieurs silhouettes en cercle */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M${250 + 80 * Math.cos(i * Math.PI / 3)} ${150 + 80 * Math.sin(i * Math.PI / 3)} 
               C${250 + 60 * Math.cos(i * Math.PI / 3)} ${150 + 60 * Math.sin(i * Math.PI / 3)}
                ${250 + 40 * Math.cos(i * Math.PI / 3)} ${150 + 40 * Math.sin(i * Math.PI / 3)}
                ${250} ${150}`}
            stroke="#F59E0B"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      </motion.g>

      {/* Dégradé pour le fond */}
      <defs>
        <linearGradient id="africanGradient" x1="0" y1="0" x2="500" y2="300">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);
