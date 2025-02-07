import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Users, MapPin, ChevronRight, Wallet, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { GroupForm } from '../components/groups/GroupForm';

export default function Groups() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'epargne' | 'theme'>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const regions = [
    { id: 'diaspora', name: 'Diaspora' },
    { id: 'continent', name: 'Continent Africain' }
  ];

  const countries = {
    diaspora: [
      { id: 'fr', name: 'France' },
      { id: 'us', name: 'États-Unis' },
      { id: 'uk', name: 'Royaume-Uni' },
      { id: 'ca', name: 'Canada' }
    ],
    continent: [
      { id: 'sn', name: 'Sénégal' },
      { id: 'ci', name: 'Côte d\'Ivoire' },
      { id: 'cm', name: 'Cameroun' },
      { id: 'ml', name: 'Mali' }
    ]
  };

  const groups = [
    {
      id: 1,
      name: 'Groupe Paris',
      type: 'epargne',
      country: 'France',
      region: 'Île-de-France',
      members: 85,
      totalContributions: 42500,
      monthlyContribution: 500,
      performance: 98,
      cycleProgress: 45,
      nextBeneficiary: 'Marie Claire',
    },
    {
      id: 2,
      name: 'Groupe Projet Éducation',
      type: 'theme',
      country: 'France',
      region: 'Auvergne-Rhône-Alpes',
      members: 92,
      totalContributions: 46000,
      monthlyContribution: 500,
      performance: 95,
      projectGoal: 100000,
      projectProgress: 46,
      projectCategory: 'education',
    },
    {
      id: 3,
      name: 'Groupe Dakar',
      type: 'epargne',
      country: 'Sénégal',
      region: 'Dakar',
      members: 100,
      totalContributions: 30000,
      monthlyContribution: 300,
      performance: 100,
      cycleProgress: 60,
      nextBeneficiary: 'Alioune Diop',
    }
  ];

  const handleCreateGroup = (data: any) => {
    console.log('Nouveau groupe:', data);
    toast.success('Groupe créé avec succès!');
    setShowCreateForm(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header amélioré */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Groupes</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Créer un groupe
          </motion.button>
        </div>
        <p className="text-gray-600">Gérez vos groupes de tontine et suivez leur progression</p>
      </div>

      <GroupForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={handleCreateGroup}
      />

      {/* Barre de filtres améliorée */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="border-b border-gray-100 bg-gradient-to-r from-amber-50 to-amber-100/50 p-4">
          <h2 className="text-sm font-medium text-amber-900 flex items-center">
            <Filter className="h-4 w-4 mr-2 text-amber-600" />
            Filtres et recherche
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Barre de recherche réalignée */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rechercher</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher un groupe..."
                  className="w-full pl-10 pr-12 py-2.5 border-2 border-gray-200 rounded-lg 
                           focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                           placeholder-gray-400 transition-all duration-200
                           hover:border-amber-200"
                />
                <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs font-sans font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded hidden md:inline-block">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Sélecteur de type amélioré */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Type de tontine</label>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as 'all' | 'epargne' | 'theme')}
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg py-2.5 pl-4 pr-10
                           focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                           hover:border-amber-200 transition-all duration-200"
                >
                  <option value="all">Tous les types</option>
                  <option value="epargne">Tontine d'Épargne</option>
                  <option value="theme">Tontine à Thème</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sélecteur de région amélioré */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Région</label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    setSelectedCountry('all');
                  }}
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg py-2.5 pl-4 pr-10
                           focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                           hover:border-amber-200 transition-all duration-200"
                >
                  <option value="all">Toutes les régions</option>
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sélecteur de pays amélioré */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pays</label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-gray-200 rounded-lg py-2.5 pl-4 pr-10
                           focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500
                           hover:border-amber-200 transition-all duration-200
                           disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={selectedRegion === 'all'}
                >
                  <option value="all">Tous les pays</option>
                  {selectedRegion !== 'all' && countries[selectedRegion].map(country => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Tags de filtres actifs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                {selectedType === 'epargne' ? 'Épargne' : 'Thème'}
                <button onClick={() => setSelectedType('all')} className="ml-2 hover:text-amber-900">×</button>
              </span>
            )}
            {selectedRegion !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                {regions.find(r => r.id === selectedRegion)?.name}
                <button onClick={() => setSelectedRegion('all')} className="ml-2 hover:text-amber-900">×</button>
              </span>
            )}
            {selectedCountry !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800">
                {countries[selectedRegion].find(c => c.id === selectedCountry)?.name}
                <button onClick={() => setSelectedCountry('all')} className="ml-2 hover:text-amber-900">×</button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grille de groupes améliorée */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups
          .filter(group => selectedType === 'all' || group.type === selectedType)
          .map(group => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to={`/dashboard/groups/${group.id}`}
              className="block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                {/* En-tête de carte amélioré */}
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {group.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      group.type === 'epargne' 
                        ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800'
                        : 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800'
                    }`}>
                      {group.type === 'epargne' ? (
                        <><Wallet className="w-3 h-3 mr-1" />Épargne</>
                      ) : (
                        <><Target className="w-3 h-3 mr-1" />Thème</>
                      )}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-amber-600 transform group-hover:translate-x-1 transition-all" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {group.country}, {group.region}
                  </div>

                  {/* Conditional rendering based on type */}
                  {group.type === 'epargne' ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Membres</div>
                          <div className="text-lg font-semibold text-gray-900">{group.members}/100</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Cycle</div>
                          <div className="text-lg font-semibold text-gray-900">{group.cycleProgress}%</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Prochain bénéficiaire: <span className="font-medium">{group.nextBeneficiary}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Objectif</div>
                          <div className="text-lg font-semibold text-gray-900">€{group.projectGoal.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Progression</div>
                          <div className="text-lg font-semibold text-gray-900">{group.projectProgress}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 rounded-full h-2"
                          style={{ width: `${group.projectProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Common footer */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">Contribution mensuelle</div>
                      <div className="text-sm font-semibold text-gray-900">€{group.monthlyContribution}</div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-500">Total collecté</div>
                      <div className="text-sm font-semibold text-gray-900">€{group.totalContributions}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pied de carte amélioré */}
              <div className="border-t border-gray-100 bg-gray-50/50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Performance</p>
                    <p className="text-lg font-semibold text-gray-900">{group.performance}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Membres</p>
                    <p className="text-lg font-semibold text-gray-900">{group.members}/100</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}