import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Shield, 
  Coins, 
  ArrowRight, 
  ChevronRight, 
  BarChart3, 
  Check, 
  Globe, 
  Star,
  Sparkles,
  ShieldCheck,
  Heart,
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Target, // Ajout de l'import manquant
  Settings, 
  HelpCircle, 
  Languages, 
  Menu
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "La meilleure plateforme de tontine que j'ai utilisée. Simple et efficace !",
    name: "Marie Diallo",
    role: "Membre depuis 2023"
  },
  {
    quote: "Gérer notre tontine familiale n'a jamais été aussi facile.",
    name: "Amadou Sow",
    role: "Président de groupe"
  },
  {
    quote: "Un excellent moyen de préserver nos traditions tout en utilisant la technologie moderne.",
    name: "Sarah Kouassi",
    role: "Membre active"
  }
];

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
    {icon}
    <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-base text-gray-500 text-center">{description}</p>
  </div>
);

interface AdminFeatureProps {
  icon: React.ReactNode;
  text: string;
}

const AdminFeature: React.FC<AdminFeatureProps> = ({ icon, text }) => (
  <li className="flex items-center space-x-3 text-gray-700">
    <span className="flex-shrink-0 h-5 w-5 text-amber-600">{icon}</span>
    <span>{text}</span>
    <ChevronRight className="h-4 w-4 text-amber-600" />
  </li>
);

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Ajouter l'état du formulaire
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: 'general' // général, support, partenariat
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);

    // Reset après 3 secondes
    setTimeout(() => {
      setSubmitStatus('idle');
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
        subject: 'general'
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Header amélioré */}
      <nav className="bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl fixed w-full z-50 border-b border-amber-100/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo et Nom */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-lg hover:shadow-lg transition-all duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 text-transparent bg-clip-text">
                Tontine Africaine
              </span>
            </motion.div>

            {/* Navigation principale */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="#features">Fonctionnalités</NavLink>
              <NavLink href="#security">Sécurité</NavLink>
              <NavLink href="#about">À propos</NavLink>
              <NavLink href="#pricing">Tarifs</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Languages className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/dashboard" 
                  className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition duration-300 flex items-center space-x-2"
                >
                  <span>Connexion</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Menu mobile amélioré */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu mobile amélioré */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 shadow-2xl"
          >
            {/* ... mobile menu content ... */}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section avec parallax */}
      <section className="relative min-h-screen flex items-center pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 grid grid-cols-3 gap-1 p-1"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="aspect-square">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="w-full h-full bg-amber-200/20 rounded-full"
              />
            </div>
          ))}
        </motion.div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge animé */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100/80 text-amber-800 text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse" />
                Nouvelle Version Disponible
              </span>
            </motion.div>

            {/* Titre principal amélioré */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="block mb-2 text-gray-900">La Plus Grande</span>
              <span className="block bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-transparent bg-clip-text">
                Tontine Africaine
              </span>
            </h1>
            
            {/* Description améliorée */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 max-w-2xl mx-auto text-xl sm:text-2xl text-gray-600 leading-relaxed"
            >
              Une plateforme <span className="text-amber-600 font-semibold">moderne</span> et <span className="text-amber-600 font-semibold">sécurisée</span> pour gérer votre épargne collaborative traditionnelle.
            </motion.p>

            {/* CTA améliorés */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-200" />
                <Link 
                  to="/dashboard"
                  className="relative flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-lg font-medium text-white shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
                >
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
                </Link>
              </motion.div>
              
              <motion.a
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-medium text-amber-800 bg-gradient-to-b from-amber-50 to-amber-100/50 hover:to-amber-100 border-2 border-amber-200/50 rounded-xl shadow-lg shadow-amber-100/50 transition-all duration-300"
              >
                Découvrir
              </motion.a>
            </motion.div>

            {/* Stats améliorées */}
            <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/20 to-transparent blur-2xl -z-10" />
              <StatCard 
                number="10K+" 
                label="Membres actifs"
                icon={<Users className="h-6 w-6 text-amber-600" />}
              />
              <StatCard 
                number="€2M+" 
                label="Épargne totale"
                icon={<Coins className="h-6 w-6 text-amber-600" />}
              />
              <StatCard 
                number="98%" 
                label="Taux de satisfaction"
                icon={<Star className="h-6 w-6 text-amber-600" />}
              />
            </div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-amber-500 rounded-full p-1">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-scroll" />
              </div>
            </motion.div>
          </motion.div>

          {/* Caractéristiques principales modifiées */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield />,
                title: "Sécurité Maximale",
                description: "Protection de vos fonds avec les plus hauts standards de sécurité bancaire."
              },
              {
                icon: <Coins />,
                title: "Gestion Financière",
                description: "Suivez vos contributions et distributions en temps réel avec précision."
              },
              {
                icon: <Users />,
                title: "Gestion des Membres",
                description: "Organisation simplifiée des groupes et des rôles des participants."
              },
              {
                icon: <BarChart3 />,
                title: "Tableaux de Bord",
                description: "Visualisez les performances et l'évolution de vos tontines."
              },
              {
                icon: <Globe />,
                title: "Accessibilité Mondiale",
                description: "Participez à des tontines partout dans le monde en toute simplicité."
              },
              {
                icon: <Target />,
                title: "Objectifs Personnalisés",
                description: "Définissez et suivez vos objectifs d'épargne collectifs."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute -top-6 left-6">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-xl shadow-lg">
                    {React.cloneElement(feature.icon as any, { className: "h-6 w-6 text-white" })}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Nouvelle section Comment ça marche */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900">Comment ça marche ?</h2>
            <p className="mt-4 text-xl text-gray-600">Simple, transparent et efficace</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: 1,
                title: "Créez votre groupe",
                description: "Invitez vos membres et définissez vos règles",
                icon: Users
              },
              {
                step: 2,
                title: "Cotisez régulièrement",
                description: "Gestion automatique des contributions",
                icon: Coins
              },
              {
                step: 3,
                title: "Suivez vos progrès",
                description: "Tableaux de bord et rapports détaillés",
                icon: BarChart3
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-amber-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <item.icon className="h-8 w-8 mx-auto text-amber-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nouvelle section Témoignages */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <Carousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA final amélioré */}
      <section className="relative py-24 bg-gradient-to-b from-amber-50 to-amber-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Prêt à commencer votre voyage d'épargne ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de membres qui font confiance à notre plateforme
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nouvelle section Avantages */}
      <section className="py-32 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-20">
            <motion.span 
              className="text-amber-600 font-medium text-sm tracking-wider uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Pourquoi nous choisir
            </motion.span>
            <motion.h2 
              className="mt-2 text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Une solution complète pour votre tontine
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Sécurité garantie",
                description: "Protection maximale de vos fonds et données personnelles"
              },
              {
                icon: Sparkles,
                title: "Interface intuitive",
                description: "Gestion simplifiée de vos groupes et contributions"
              },
              {
                icon: Heart,
                title: "Support 24/7",
                description: "Une équipe dédiée à votre disposition"
              },
              {
                icon: Building2,
                title: "Conformité légale",
                description: "Respect des réglementations en vigueur"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-amber-50 p-6 rounded-2xl transition-all duration-300"
              >
                <div className="relative w-12 h-12 mb-6">
                  <div className="absolute inset-0 bg-amber-100 rounded-lg transform rotate-6 transition-transform group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-amber-50 rounded-lg transform -rotate-3 transition-transform group-hover:rotate-0" />
                  <div className="relative flex items-center justify-center h-full">
                    <feature.icon className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nouvelle section Contact */}
      <section className="py-24 bg-amber-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Contactez-nous</h2>
                <p className="text-lg text-gray-600">Notre équipe est là pour vous aider</p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Phone, text: "+33 1 23 45 67 89" },
                  { icon: Mail, text: "contact@tontine-africaine.com" },
                  { icon: MapPin, text: "Paris, France" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                      <item.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t">
                <div className="flex space-x-6">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Instagram, href: "#" },
                    { icon: Youtube, href: "#" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="text-gray-400 hover:text-amber-600 transition-colors"
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <select
                    value={formState.subject}
                    onChange={e => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  >
                    <option value="general">Renseignement général</option>
                    <option value="support">Support technique</option>
                    <option value="partnership">Partenariat</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={e => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formState.message}
                    onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full py-3 relative overflow-hidden rounded-xl text-white font-medium
                    ${isSubmitting ? 'bg-gray-400' : 'bg-gradient-to-r from-amber-500 to-amber-600'}
                    transition-all duration-300 flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : submitStatus === 'success' ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white flex items-center"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Message envoyé !
                    </motion.div>
                  ) : (
                    "Envoyer le message"
                  )}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer amélioré */}
      <footer className="bg-gray-900 pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            {/* Logo et Description */}
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-amber-500/20 p-2 rounded-lg">
                  <Users className="h-8 w-8 text-amber-500" />
                </div>
                <span className="text-xl font-bold text-white">
                  Tontine Africaine
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                La plateforme moderne de gestion de tontines, alliant tradition et innovation pour une épargne collaborative sécurisée.
              </p>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="text-white font-semibold mb-4">Produit</h3>
              <ul className="space-y-3">
                <FooterLink href="#features">Fonctionnalités</FooterLink>
                <FooterLink href="#security">Sécurité</FooterLink>
                <FooterLink href="#pricing">Tarifs</FooterLink>
                <FooterLink href="#faq">FAQ</FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-3">
                <FooterLink href="#about">À propos</FooterLink>
                <FooterLink href="#careers">Carrières</FooterLink>
                <FooterLink href="#blog">Blog</FooterLink>
                <FooterLink href="#press">Presse</FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <FooterLink href="#contact">Contact</FooterLink>
                <FooterLink href="#help">Centre d'aide</FooterLink>
                <FooterLink href="#status">Statut</FooterLink>
                <FooterLink href="#terms">Conditions</FooterLink>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2">
              <h3 className="text-white font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">
                Restez informé de nos dernières actualités
              </p>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                  S'abonner
                </button>
              </form>
            </div>
          </div>

          {/* Séparateur */}
          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-6">
                <SocialLink href="#" icon={Facebook} />
                <SocialLink href="#" icon={Twitter} />
                <SocialLink href="#" icon={Instagram} />
                <SocialLink href="#" icon={Youtube} />
              </div>
              <div className="text-gray-400 text-sm">
                © 2024 Tontine Africaine. Tous droits réservés.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const NavLink = ({ href, children }) => (
  <a 
    href={href}
    className="text-gray-600 hover:text-amber-600 transition-colors duration-300 text-sm font-medium"
  >
    {children}
  </a>
);

const StatCard = ({ number, label, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.8 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl shadow-amber-100/50 transform group-hover:scale-105 transition-transform duration-300" />
    <div className="relative p-8 text-center">
      {icon}
      <div className="mt-3 text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 text-transparent bg-clip-text">
        {number}
      </div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  </motion.div>
);

// Nouveau composant Carousel
const Carousel = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  return (
    <div className="relative">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: direction * 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 200 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          {/* Témoignage content */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 text-6xl text-amber-200">"</div>
            <p className="text-xl text-gray-700 italic relative z-10 mb-6">
              {testimonials[current].quote}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full" />
              <div>
                <p className="font-medium text-gray-900">{testimonials[current].name}</p>
                <p className="text-sm text-gray-500">{testimonials[current].role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => {
            setDirection(-1);
            setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
          }}
          className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
        >
          {/* Previous arrow */}
        </button>
        <button
          onClick={() => {
            setDirection(1);
            setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
          }}
          className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors"
        >
          {/* Next arrow */}
        </button>
      </div>
    </div>
  );
};

// Nouveaux composants Footer
const FooterLink = ({ href, children }) => (
  <li>
    <a 
      href={href}
      className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
    >
      {children}
    </a>
  </li>
);

const SocialLink = ({ href, icon: Icon }) => (
  <a 
    href={href}
    className="text-gray-400 hover:text-amber-500 transition-colors"
  >
    <Icon className="h-5 w-5" />
  </a>
);
