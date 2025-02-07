import React, { useState } from 'react';
import { Modal } from '../Modal';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Users, Calendar, Euro, Target, AlertCircle } from 'lucide-react';

interface GroupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const GroupForm: React.FC<GroupFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    region: '',
    country: '',
    monthlyContribution: '',
    startDate: '',
    maxMembers: '100',
    description: '',
    // Champs spécifiques à la tontine à thème
    projectGoal: '',
    projectDeadline: '',
    projectCategory: '',
    yearlyContribution: 0, // Nouvelle propriété pour la cotisation annuelle totale
    distributionPhases: [
      {
        beneficiaries: 50,
        distributionDate: '',
        label: 'Distribution mi-année',
        amount: 0, // Montant à distribuer par personne
        totalAmount: 0 // Montant total de la distribution
      },
      {
        beneficiaries: 50,
        distributionDate: '',
        label: 'Distribution fin d\'année',
        amount: 0,
        totalAmount: 0
      }
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.type) newErrors.type = 'Sélectionnez un type de tontine';
      if (!formData.name) newErrors.name = 'Le nom est requis';
    }

    if (currentStep === 2) {
      if (!formData.monthlyContribution) newErrors.monthlyContribution = 'La contribution est requise';
      if (!formData.startDate) newErrors.startDate = 'La date de début est requise';
    }

    if (currentStep === 3 && formData.type === 'theme') {
      if (!formData.projectGoal) newErrors.projectGoal = "L'objectif du projet est requis";
      if (!formData.projectDeadline) newErrors.projectDeadline = 'La date limite est requise';
    }

    if (currentStep === 2 && formData.type === 'epargne') {
      if (!formData.distributionPhases[0].distributionDate) {
        newErrors.firstPhase = 'La date de la première distribution est requise';
      }
      if (!formData.distributionPhases[1].distributionDate) {
        newErrors.secondPhase = 'La date de la deuxième distribution est requise';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      onSubmit(formData);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
            s < step ? 'bg-green-500 text-white' :
            s === step ? 'bg-amber-500 text-white' :
            'bg-gray-200 text-gray-500'
          }`}>
            {s < step ? <Check className="h-5 w-5" /> : s}
          </div>
          {s < 3 && (
            <ChevronRight className={`h-4 w-4 ml-4 ${s < step ? 'text-green-500' : 'text-gray-300'}`} />
          )}
        </div>
      ))}
    </div>
  );

  // Calcul automatique des montants quand la contribution mensuelle change
  const updateDistributionAmounts = (monthlyContribution: number) => {
    const yearlyPerPerson = monthlyContribution * 12; // Cotisation annuelle par personne
    const totalYearly = yearlyPerPerson * 100; // Pour 100 membres
    const distributionPerPerson = totalYearly / 2 / 50; // Montant par personne par distribution

    setFormData(prev => ({
      ...prev,
      yearlyContribution: totalYearly,
      distributionPhases: [
        {
          ...prev.distributionPhases[0],
          amount: distributionPerPerson,
          totalAmount: distributionPerPerson * 50
        },
        {
          ...prev.distributionPhases[1],
          amount: distributionPerPerson,
          totalAmount: distributionPerPerson * 50
        }
      ]
    }));
  };

  // Modifier le handler de la contribution mensuelle
  const handleMonthlyContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFormData(prev => ({ ...prev, monthlyContribution: e.target.value }));
    if (!isNaN(value)) {
      updateDistributionAmounts(value);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Créer un nouveau groupe"
    >
      <div className="max-w-2xl mx-auto">
        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Étape 1: Informations de base */}
          {step === 1 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de Tontine
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['epargne', 'theme'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setFormData({ ...formData, type })}
                      className={`p-4 rounded-lg border-2 text-left ${
                        formData.type === type
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-200'
                      }`}
                    >
                      <div className="font-medium mb-1">
                        {type === 'epargne' ? "Tontine d'Épargne" : 'Tontine à Thème'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {type === 'epargne' 
                          ? 'Épargne collective et rotative'
                          : 'Projets et objectifs spécifiques'}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du groupe
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            </motion.div>
          )}

          {/* Étape 2: Configuration */}
          {step === 2 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contribution mensuelle (€)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyContribution}
                    onChange={handleMonthlyContributionChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              {/* Afficher les erreurs */}
            </motion.div>
          )}

          {step === 2 && formData.type === 'epargne' && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4 mt-4"
            >
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-medium text-amber-800 mb-4">Phases de distribution</h3>
                <div className="grid gap-4">
                  <div className="bg-white p-4 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-gray-900 mb-3">Résumé annuel</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Cotisation mensuelle</p>
                        <p className="font-medium">€{formData.monthlyContribution}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total annuel collecté</p>
                        <p className="font-medium">€{formData.yearlyContribution}</p>
                      </div>
                    </div>
                  </div>

                  {formData.distributionPhases.map((phase, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-amber-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-amber-900">{phase.label}</span>
                        <span className="text-sm text-amber-600">{phase.beneficiaries} bénéficiaires</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-600">Montant par personne</p>
                          <p className="font-medium">€{phase.amount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Montant total</p>
                          <p className="font-medium">€{phase.totalAmount}</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Date de distribution
                        </label>
                        <input
                          type="date"
                          value={phase.distributionDate}
                          onChange={(e) => {
                            const newPhases = [...formData.distributionPhases];
                            newPhases[index].distributionDate = e.target.value;
                            setFormData({ ...formData, distributionPhases: newPhases });
                          }}
                          className="w-full p-2 border border-amber-200 rounded-md focus:ring-amber-500 focus:border-amber-500"
                        />
                        {errors[`phase${index}`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`phase${index}`]}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Étape 3: Détails spécifiques au type */}
          {step === 3 && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-4"
            >
              {formData.type === 'theme' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Objectif du projet (€)
                    </label>
                    <input
                      type="number"
                      value={formData.projectGoal}
                      onChange={(e) => setFormData({ ...formData, projectGoal: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date limite du projet
                    </label>
                    <input
                      type="date"
                      value={formData.projectDeadline}
                      onChange={(e) => setFormData({ ...formData, projectDeadline: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </>
              ) : (
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-medium text-amber-800 mb-2">Résumé de la tontine</h3>
                  <ul className="space-y-2 text-sm text-amber-700">
                    <li>Contribution mensuelle: €{formData.monthlyContribution}</li>
                    <li>Date de début: {formData.startDate}</li>
                    <li>Membres maximum: {formData.maxMembers}</li>
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          <div className="flex justify-between pt-6 border-t">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-amber-600 hover:bg-amber-50 rounded-md"
              >
                Retour
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 ml-auto"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 ml-auto"
              >
                Créer le groupe
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
