import React from 'react';
import { motion } from 'framer-motion';

export const UnityCircle: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Fond décoratif avec motifs africains */}
      <motion.path
        d="M200 20C304.934 20 390 105.066 390 210C390 314.934 304.934 400 200 400C95.0664 400 10 314.934 10 210C10 105.066 95.0664 20 200 20Z"
        fill="url(#africanBg)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Cercle central représentant l'unité */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Personnes stylisées autour du cercle */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.5 }}
            transform={`rotate(${i * 45} 200 200)`}
          >
            {/* Corps de la personne */}
            <path
              d={`M200 80
                  a 30 30 0 0 1 30 30
                  v 40
                  a 30 30 0 0 1 -60 0
                  v -40
                  a 30 30 0 0 1 30 -30z`}
              fill="#F59E0B"
              className="drop-shadow-md"
            />
            {/* Tête */}
            <circle
              cx="200"
              cy="70"
              r="20"
              fill="#F59E0B"
            />
            {/* Bras tendus vers le centre */}
            <motion.path
              d={`M180 110
                  Q 190 130 200 140
                  Q 210 130 220 110`}
              stroke="#F59E0B"
              strokeWidth="8"
              strokeLinecap="round"
              animate={{ 
                d: [
                  `M180 110 Q 190 130 200 140 Q 210 130 220 110`,
                  `M180 110 Q 190 125 200 135 Q 210 125 220 110`,
                  `M180 110 Q 190 130 200 140 Q 210 130 220 110`
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.g>
        ))}

        {/* Cercle intérieur symbolisant l'objectif commun */}
        <motion.circle
          cx="200"
          cy="200"
          r="40"
          fill="#FDE68A"
          stroke="#F59E0B"
          strokeWidth="4"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Symbole de la tontine au centre */}
        <motion.g
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M200 170L215 200L200 230L185 200Z"
            fill="#F59E0B"
          />
        </motion.g>
      </motion.g>

      {/* Dégradés et effets */}
      <defs>
        <radialGradient id="africanBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.5" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);
