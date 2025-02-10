import React from 'react';
import { motion } from 'framer-motion';
import { Globe, HeartHandshake, Users, ArrowLeftRight } from 'lucide-react';

const regions = {
  diaspora: [
    {
      name: "Europe",
      image: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?w=800",
      members: "25,000+",
      countries: ["France", "Belgique", "Allemagne", "Royaume-Uni"]
    },
    {
      name: "Amérique du Nord",
      image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800",
      members: "15,000+",
      countries: ["États-Unis", "Canada"]
    },
    {
      name: "Asie",
      image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
      members: "5,000+",
      countries: ["Chine", "Japon", "Émirats Arabes Unis"]
    }
  ],
  continent: [
    {
      name: "Afrique de l'Ouest",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
      members: "50,000+",
      countries: ["Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso"]
    },
    {
      name: "Afrique Centrale",
      image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800",
      members: "30,000+",
      countries: ["Cameroun", "Gabon", "Congo", "RDC"]
    },
    {
      name: "Afrique de l'Est",
      image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800",
      members: "20,000+",
      countries: ["Kenya", "Tanzanie", "Ouganda"]
    }
  ]
};

const connections = [
  "Connexions intergénérationnelles",
  "Partage des traditions",
  "Investissements transfrontaliers",
  "Développement communautaire",
  "Soutien mutuel"
];

const RegionCard = ({ region }) => (
  <div className="group relative overflow-hidden rounded-xl mb-4">
    <div className="aspect-video w-full overflow-hidden">
      <img
        src={region.image}
        alt={region.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
      <h4 className="text-lg font-semibold">{region.name}</h4>
      <p className="text-sm opacity-90">{region.members} membres</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {region.countries.map((country, idx) => (
          <span 
            key={idx}
            className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm"
          >
            {country}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const GlobalCommunity = () => (
  <section className="py-24 bg-gradient-to-b from-amber-50/20 to-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900">
          Réunir l'Afrique et sa Diaspora
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Une plateforme qui rapproche les Africains du continent et du monde entier
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Section Continent */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-6 flex items-center"
          >
            <Globe className="h-6 w-6 text-amber-600 mr-2" />
            Sur le Continent
          </motion.h3>
          <div className="grid gap-6">
            {regions.continent.map((region, idx) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <RegionCard region={region} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Diaspora */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-6 flex items-center"
          >
            <Users className="h-6 w-6 text-amber-600 mr-2" />
            Dans la Diaspora
          </motion.h3>
          <div className="grid gap-6">
            {regions.diaspora.map((region, idx) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <RegionCard region={region} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Connexions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-gradient-to-r from-amber-500 to-amber-600 p-8 rounded-2xl shadow-xl text-white"
      >
        <div className="flex items-center mb-4">
          <HeartHandshake className="h-8 w-8 mr-3" />
          <h3 className="text-2xl font-semibold">Connexions</h3>
        </div>
        <ul className="space-y-4">
          {connections.map((connection) => (
            <li key={connection} className="flex items-center">
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              {connection}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);
