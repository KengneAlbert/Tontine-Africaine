import React from 'react';
import { Search, SlidersHorizontal, Share2, HelpCircle } from 'lucide-react';

interface HeaderProps {
  showHelp: boolean;
  setShowHelp: (show: boolean) => void;
  setShowFilters: (show: boolean) => void;
  setShowExportMenu: (show: boolean) => void;
  showExportMenu: boolean;
  activeFilters: any;
}

export const Header: React.FC<HeaderProps> = ({
  showHelp,
  setShowHelp,
  setShowFilters,
  setShowExportMenu,
  showExportMenu,
  activeFilters
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Aide"
        >
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="mt-4 md:mt-0 flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtres
          {Object.values(activeFilters).some(v => v !== 'all' && v !== 0) && (
            <span className="ml-2 w-2 h-2 bg-amber-500 rounded-full" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>
    </div>
  );
};
