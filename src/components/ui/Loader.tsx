import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = "Chargement de votre espace..." }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center">
      <div className="relative">
        {/* Logo animé */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-xl shadow-xl"
        >
          <Users className="h-8 w-8 text-white" />
        </motion.div>

        {/* Cercles d'animation */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-xl border-2 border-amber-500"
              initial={{ opacity: 0.3, scale: 1 }}
              animate={{
                opacity: 0,
                scale: 1.5,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Message de chargement */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-amber-800 font-medium mb-2" role="status">
          {message}
        </p>
        <div className="flex space-x-2 justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-amber-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
