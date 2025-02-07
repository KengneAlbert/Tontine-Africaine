import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip } from 'react-tooltip'; // Modifié ici

interface GeoData {
  id: string;
  name: string;
  groupCount: number;
  memberCount: number;
}

interface Props {
  data: GeoData[];
  onCountryClick: (countryId: string) => void;
  selectedCountry?: string;
}

export const GeographicMap: React.FC<Props> = ({ data, onCountryClick, selectedCountry }) => {
  const colorScale = scaleLinear<string>()
    .domain([0, Math.max(...data.map(d => d.groupCount))])
    .range(['#FEF3C7', '#F59E0B']);

  return (
    <div className="relative h-[150px]"> {/* Augmenté légèrement la hauteur */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 400, // Augmenté l'échelle
          center: [0, 12], // Ajusté le centre
          rotate: [0, 0, 0] // Ajouté la rotation
        }}
        height={150}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <ZoomableGroup 
          center={[0, 12]}
          zoom={1}
        >
          <Geographies 
            geography="/african-countries.json"
            stroke="#D1D5DB"
            strokeWidth={0.5}
          >
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryData = data.find(d => d.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryData ? colorScale(countryData.groupCount) : '#F3F4F6'}
                    stroke="#fff"
                    strokeWidth={0.5}
                    className={`${
                      selectedCountry === geo.id ? 'outline outline-2 outline-amber-500' : ''
                    } cursor-pointer transition-colors hover:fill-amber-400`}
                    onClick={() => countryData && onCountryClick(geo.id)}
                    data-tip={countryData ? `
                      ${countryData.name}<br/>
                      ${countryData.groupCount} groupes<br/>
                      ${countryData.memberCount} membres
                    ` : ''}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip 
        className="text-[10px]"
        delayShow={200}
      />
    </div>
  );
};
