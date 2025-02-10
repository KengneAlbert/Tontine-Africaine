import React from 'react';
import { motion } from 'framer-motion';
import { LinkedinIcon, Facebook, Quote, Youtube, Trophy, Users, PlayCircle, Award, Star, TrendingUp, BookOpen, Instagram } from 'lucide-react';
import founder from '../../assets/images/stephanie.jpg';

export const Founder = () => {
  return (
    <>
      {/* Section existante de présentation */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src={founder}
                  alt="Stéphanie Mbida"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-50 p-4 rounded-xl shadow-xl">
                <div className="flex space-x-4">
                  <a href="https://instagram.com" className="text-gray-600 hover:text-amber-600">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="https://www.facebook.com/parlonsdebusiness" className="text-gray-600 hover:text-amber-600">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="https://youtube.com/@ParlonsDeBusiness" className="text-gray-600 hover:text-amber-600">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 bg-amber-100/50 rounded-full px-4 py-2">
                <Trophy className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Entrepreneur à succès</span>
              </div>

              <h2 className="text-4xl font-bold text-gray-900">Stéphanie Mbida</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experte en finance avec plus de 15 ans d'expérience, Stéphanie Mbida a créé Tontine Africaine 
                avec la vision de moderniser les pratiques traditionnelles d'épargne tout en préservant 
                leurs valeurs fondamentales de solidarité et d'entraide.
              </p>

              <div className="space-y-4 pt-6">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-600">15</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Années d'expérience</h3>
                    <p className="text-sm text-gray-600">En finance et création de richesse</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-600">20</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Pays africains</h3>
                    <p className="text-sm text-gray-600">Expertise des marchés locaux</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <PlayCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Chaîne YouTube</h3>
                    <p className="text-sm text-gray-600">Abonnez-vous pour des conseils financiers</p>
                  </div>
                </div>
              </div>

              <blockquote className="italic text-gray-600 border-l-4 border-amber-500 pl-4 mt-8">
                "Notre mission est de créer un pont entre tradition et innovation, permettant à chacun 
                de participer à une épargne collaborative moderne et sécurisée."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nouvelle section Succès Story */}
      <section className="py-16 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Parcours d'Excellence</h2>
            <p className="mt-4 text-gray-600">De l'expertise financière à l'entrepreneuriat digital</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Parlons de Business",
                description: "Chaîne YouTube avec plus de 100K abonnés, partageant expertise et conseils en entrepreneuriat"
              },
              {
                icon: Award,
                title: "Prix & Reconnaissances",
                description: "Lauréate du Prix de l'Innovation Financière 2023"
              },
              {
                icon: TrendingUp,
                title: "Impact Social",
                description: "Plus de 10,000 entrepreneurs accompagnés à travers l'Afrique"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-amber-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Media remplacée */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Notre Vision</h2>
            <p className="mt-4 text-gray-600">Découvrez pourquoi nous avons créé Tontine Africaine</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              className="aspect-video rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/IrA23F6qLck" 
                title="Pourquoi Tontine Africaine ?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>

            <div className="mt-8 text-center">
              <p className="text-lg text-gray-600 mb-4">
                Une vidéo exclusive où Stéphanie Mbida partage sa vision pour révolutionner 
                l'épargne collaborative en Afrique.
              </p>
              <a
                href="https://youtube.com/@ParlonsDeBusiness"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Youtube className="h-5 w-5 mr-2" />
                Suivre Parlons de Business
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
