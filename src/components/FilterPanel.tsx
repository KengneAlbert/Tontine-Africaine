import React from 'react';
import { X, Filter } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  filters: {
    dateRange: string;
    status: string;
    montantMin: number;
    montantMax: number;
    type: string;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  isOpen, 
  onClose, 
  onApplyFilters,
  filters: initialFilters 
}) => {
  const [filters, setFilters] = React.useState(initialFilters);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative float-right h-full w-96 max-w-lg bg-white shadow-xl">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center">
              <Filter className="h-5 w-5 mr-2 text-amber-600" />
              Filtres avancés
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Période
            </label>
            <select 
              className="w-full border border-gray-300 rounded-md p-2"
              value={filters.dateRange}
              onChange={(e) => setFilters(f => ({ ...f, dateRange: e.target.value }))}
            >
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de tontine
            </label>
            <select 
              className="w-full border border-gray-300 rounded-md p-2"
              value={filters.type}
              onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
            >
              <option value="all">Tous les types</option>
              <option value="epargne">Épargne</option>
              <option value="theme">Thème</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select 
              className="w-full border border-gray-300 rounded-md p-2"
              value={filters.status}
              onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="pending">En attente</option>
              <option value="completed">Complété</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant min (€)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.montantMin}
                onChange={(e) => setFilters(f => ({ ...f, montantMin: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant max (€)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                value={filters.montantMax}
                onChange={(e) => setFilters(f => ({ ...f, montantMax: Number(e.target.value) }))}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setFilters(initialFilters)}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => {
                onApplyFilters(filters);
                onClose();
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
            >
              Appliquer les filtres
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
