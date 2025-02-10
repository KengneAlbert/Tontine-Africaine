import { motion } from 'framer-motion';

interface HornProps {
  direction: 'left' | 'right';
}

export const TraditionalHorn: React.FC<HornProps> = ({ direction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`absolute top-1/2 -translate-y-1/2 hidden lg:block ${
        direction === 'left' ? '-left-24' : '-right-24'
      }`}
    >
      <div className={`relative ${direction === 'right' ? 'transform -scale-x-100' : ''}`}>
        <svg
          width="120"
          height="200"
          viewBox="0 0 120 200"
          fill="none"
          className="transform scale-y-100"
        >
          <path
            d="M60 0C60 0 120 50 120 100C120 150 60 200 60 200C60 200 0 150 0 100C0 50 60 0 60 0Z"
            fill="url(#horn-gradient)"
            className="filter drop-shadow-lg"
          />
          <defs>
            <linearGradient
              id="horn-gradient"
              x1="0"
              y1="0"
              x2="120"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>
          
          {/* Motifs traditionnels */}
          <path
            d="M60 20C60 20 100 60 100 100C100 140 60 180 60 180"
            stroke="#FCD34D"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-50"
          />
          
          {/* Cercles décoratifs */}
          {[40, 80, 120, 160].map((y) => (
            <circle
              key={y}
              cx="60"
              cy={y}
              r="4"
              fill="#FCD34D"
              className="opacity-75"
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
};
