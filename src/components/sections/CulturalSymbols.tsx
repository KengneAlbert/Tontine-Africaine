import React from 'react';
import { motion } from 'framer-motion';

const symbols = [
  {
    name: "Adinkra - Sankofa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Sankofa.svg/800px-Sankofa.svg.png",
    meaning: "Apprendre du passé",
    origin: "Ghana"
  },
  {
    name: "Nsibidi - Iyo",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Nsibidi.svg/800px-Nsibidi.svg.png",
    meaning: "Union et harmonie",
    origin: "Nigeria"
  },
  {
    name: "Kente - Nyansapow",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Kente-pattern.svg/800px-Kente-pattern.svg.png",
    meaning: "Sagesse et intelligence",
    origin: "Ghana/Côte d'Ivoire"
  }
];

export const CulturalSymbols = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bogolan-pattern opacity-10" />
    <div className="max-w-7xl mx-auto px-4">
      <motion.div className="text-center mb-16">
        <span className="text-amber-600 text-sm font-medium uppercase tracking-wider">Nos racines</span>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">Symboles de notre héritage</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {symbols.map((symbol, index) => (
          <motion.div
            key={symbol.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative group"
          >
            <div className="bg-amber-50 rounded-2xl p-6 hover:bg-amber-100/50 transition-colors">
              <div className="w-24 h-24 mx-auto mb-6">
                <img
                  src={symbol.image}
                  alt={symbol.name}
                  className="w-full h-full object-contain filter contrast-150"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {symbol.name}
              </h3>
              <p className="text-gray-600 text-center mb-2">{symbol.meaning}</p>
              <p className="text-amber-600 text-sm text-center">{symbol.origin}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
