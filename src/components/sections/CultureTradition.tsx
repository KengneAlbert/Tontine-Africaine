import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, BookOpen, Heart } from 'lucide-react';

export const CultureTradition = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bogolan-pattern opacity-10" />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold">Culture & Tradition</h2>
          <p className="mt-4 text-lg text-gray-600">Découvrez l'héritage de l'épargne collaborative africaine</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Histoire des Tontines",
              description: "Les origines et l'évolution des tontines en Afrique",
              icon: Scroll,
              pattern: "adinkra-pattern"
            },
            {
              title: "Sagesse Ancestrale",
              description: "Les principes et valeurs qui guident nos pratiques",
              icon: BookOpen,
              pattern: "kente-pattern"
            },
            {
              title: "Solidarité Moderne",
              description: "L'adaptation de la tradition aux besoins actuels",
              icon: Heart,
              pattern: "zulu-pattern"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`absolute inset-0 ${item.pattern} opacity-10 group-hover:opacity-20 transition-opacity rounded-xl`} />
              <div className="relative p-8 bg-white/80 backdrop-blur rounded-xl shadow-xl hover:shadow-2xl transition-all">
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
