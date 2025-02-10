import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { 
    name: "Bank of Africa", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Bank_of_Africa_logo.png",
    description: "Partenaire bancaire principal" 
  },
  { 
    name: "Orange Money", 
    logo: "https://logodownload.org/wp-content/uploads/2019/04/orange-logo-1.png",
    description: "Solution de paiement mobile" 
  },
  { 
    name: "Wave", 
    logo: "https://wave.com/static/wave-logo.svg",
    description: "Transfert d'argent instantané" 
  },
  { 
    name: "MTN Mobile Money", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MTN_Logo.png",
    description: "Services financiers mobiles" 
  },
  { 
    name: "Ecobank", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Ecobank_logo.png",
    description: "Banque panafricaine" 
  },
  { 
    name: "Moov Money", 
    logo: "https://moov-africa.com/wp-content/themes/moov-africa/images/logo.svg",
    description: "Paiement mobile" 
  }
];

export const TrustsPartners = () => (
  <section className="py-16 bg-gray-50 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900">Ils nous font confiance</h2>
        <p className="mt-4 text-xl text-gray-600">
          Des partenaires de premier plan pour sécuriser vos transactions
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-center"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
