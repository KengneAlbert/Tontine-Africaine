import React from 'react';

interface RegionSelectorProps {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  setSelectedGroup: (group: any) => void;
  regions: Array<{ id: string; name: string }>;
  countries: any;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  setSelectedRegion,
  selectedCountry,
  setSelectedCountry,
  setSelectedGroup,
  regions,
  countries
}) => {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Région
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedCountry("all");
                setSelectedGroup(null);
              }}
            >
              <option value="all">Toutes les régions</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pays
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedGroup(null);
              }}
            >
              <option value="all">Tous les pays</option>
              {selectedRegion !== "all" &&
                countries[selectedRegion].map((country: any) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
