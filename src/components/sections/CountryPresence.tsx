import React from 'react';
import { motion } from 'framer-motion';

const countries = [
  { name: "Sénégal", members: "5,000+", volume: "€1.2M" },
  { name: "Côte d'Ivoire", members: "4,200+", volume: "€980K" },
  { name: "Mali", members: "3,800+", volume: "€850K" },
  { name: "Cameroun", members: "3,500+", volume: "€720K" },
  { name: "Burkina Faso", members: "2,900+", volume: "€650K" }
];

export const CountryPresence = () => (
  <section className="py-24 bg-gradient-to-b from-amber-50/30 to-white relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-900">Notre présence en Afrique</h2>
        <p className="mt-4 text-xl text-gray-600">
          Une communauté grandissante à travers le continent
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {countries.map((country, index) => (
          <motion.div
            key={country.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900">{country.name}</h3>
              <p className="mt-2 text-amber-600 font-bold">{country.members}</p>
              <p className="text-sm text-gray-600">Volume : {country.volume}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
