import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronRight } from 'lucide-react';

export const GuideInteractif = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Bienvenue sur Tontine Africaine",
      content: "Découvrez comment notre plateforme modernise l'épargne collaborative traditionnelle."
    },
    {
      title: "Créez votre groupe",
      content: "Invitez vos membres et définissez vos règles de fonctionnement."
    },
    {
      title: "Gérez vos contributions",
      content: "Suivez les versements et les distributions en temps réel."
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 p-4 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-all z-50"
      >
        <HelpCircle className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-8 w-80 bg-white rounded-xl shadow-2xl p-6 z-50"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>

            <div className="text-sm mb-6">
              <h3 className="font-bold text-lg mb-2">{steps[currentStep].title}</h3>
              <p className="text-gray-600">{steps[currentStep].content}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-amber-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentStep((prev) => 
                  prev === steps.length - 1 ? 0 : prev + 1
                )}
                className="flex items-center text-sm text-amber-600 font-medium"
              >
                Suivant
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
