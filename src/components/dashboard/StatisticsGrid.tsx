import React from 'react';
import { Users, Globe, Coins, PieChart } from 'lucide-react';
import { StatCard } from './StatCard';

interface StatisticsGridProps {
  selectedRegion: string;
  selectedCountry: string;
  countries: any;
}

export const StatisticsGrid: React.FC<StatisticsGridProps> = ({
  selectedRegion,
  selectedCountry,
  countries
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Groupes Actifs"
        value={
          selectedRegion === "all"
            ? "68"
            : selectedCountry === "all" && selectedRegion !== "all"
            ? countries[selectedRegion]
                .reduce((acc: number, curr: any) => acc + (curr.groupCount || 0), 0)
                .toString()
            : countries[selectedRegion]
                .find((c: any) => c.id === selectedCountry)
                ?.groupCount.toString() || "0"
        }
        icon={<Users className="h-6 w-6 text-amber-600" />}
        change="+12%"
        details="Limite de 100 membres par groupe"
      />
      <StatCard
        title="Total Membres"
        value={
          selectedRegion === "all"
            ? "6,800"
            : selectedCountry === "all" && selectedRegion !== "all"
            ? countries[selectedRegion]
                .reduce((acc: number, curr: any) => acc + (curr.memberCount || 0), 0)
                .toString()
            : countries[selectedRegion]
                .find((c: any) => c.id === selectedCountry)
                ?.memberCount.toString() || "0"
        }
        icon={<Globe className="h-6 w-6 text-amber-600" />}
        change="+8%"
        details="Répartis dans plusieurs pays"
      />
      <StatCard
        title="Total Collecté"
        value="€45,678"
        icon={<Coins className="h-6 w-6 text-amber-600" />}
        change="+15%"
        details="Ce mois-ci"
      />
      <StatCard
        title="Taux de Participation"
        value="97%"
        icon={<PieChart className="h-6 w-6 text-amber-600" />}
        change="+3%"
        details="Moyenne globale"
      />
    </div>
  );
};
