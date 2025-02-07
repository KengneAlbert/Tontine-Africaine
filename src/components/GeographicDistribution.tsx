import React, { useState } from 'react';
import { GeographicMap } from './GeographicMap';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface DistributionProps {
  data: Array<{
    id: string;
    name: string;
    groupCount: number;
    memberCount: number;
    growth?: number;
  }>;
  onCountrySelect: (countryId: string) => void;
}

export const GeographicDistribution: React.FC<DistributionProps> = ({
  data,
  onCountrySelect
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [showMap, setShowMap] = useState(true);

  const handleCountryClick = (countryId: string) => {
    setSelectedCountry(countryId);
    onCountrySelect(countryId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-3">
        {/* En-tête avec switch vue */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium">Distribution Géographique</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowMap(true)}
              className={`px-2 py-1 text-[10px] rounded-l-md ${
                showMap 
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Carte
            </button>
            <button
              onClick={() => setShowMap(false)}
              className={`px-2 py-1 text-[10px] rounded-r-md ${
                !showMap 
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Liste
            </button>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="bg-amber-50 p-1.5 rounded-lg">
            <p className="text-[10px] text-amber-600">Total Pays</p>
            <p className="text-sm font-semibold text-amber-700">{data.length}</p>
          </div>
          <div className="bg-amber-50 p-1.5 rounded-lg">
            <p className="text-[10px] text-amber-600">Total Groupes</p>
            <p className="text-sm font-semibold text-amber-700">
              {data.reduce((sum, country) => sum + country.groupCount, 0)}
            </p>
          </div>
          <div className="bg-amber-50 p-1.5 rounded-lg">
            <p className="text-[10px] text-amber-600">Total Membres</p>
            <p className="text-sm font-semibold text-amber-700">
              {data.reduce((sum, country) => sum + country.memberCount, 0)}
            </p>
          </div>
        </div>

        {/* Vue conditionnelle Carte/Liste */}
        {showMap ? (
          <div className="h-[140px] -mx-3">
            <GeographicMap
              data={data}
              onCountryClick={handleCountryClick}
              selectedCountry={selectedCountry}
            />
          </div>
        ) : (
          <div className="max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
            <div className="grid grid-cols-2 gap-1">
              {data.map(country => (
                <div
                  key={country.id}
                  className={`flex flex-col p-2 rounded-lg transition-colors ${
                    selectedCountry === country.id 
                      ? 'bg-amber-50 border border-amber-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => handleCountryClick(country.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate">{country.name}</span>
                    {country.growth && (
                      <span className="text-[10px] text-green-600 flex items-center">
                        <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                        {country.growth}%
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-gray-500">{country.groupCount}g</span>
                    <div className="w-full max-w-[60px] h-1 rounded-full bg-gray-100 ml-1">
                      <div
                        className="h-1 rounded-full bg-amber-500"
                        style={{
                          width: `${(country.groupCount / Math.max(...data.map(d => d.groupCount))) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Légende et filtres */}
        <div className="mt-2 flex items-center justify-between border-t pt-2">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-[10px] text-gray-500">Densité des groupes</span>
          </div>
          <select className="text-[10px] border rounded px-1 py-0.5">
            <option value="all">Tous les types</option>
            <option value="epargne">Épargne</option>
            <option value="theme">Thème</option>
          </select>
        </div>
      </div>
    </div>
  );
};
