import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PerformanceData {
  name: string;
  performance: number;
  contributions: number;
  membres: number;
}

interface Props {
  data: PerformanceData[];
  period: 'month' | 'quarter' | 'year';
}

export const PerformanceChart: React.FC<Props> = ({ data, period }) => {
  const getBarColor = (performance: number) => {
    if (performance >= 95) return '#059669'; // vert
    if (performance >= 90) return '#F59E0B'; // ambre
    return '#DC2626'; // rouge
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis 
          dataKey="name" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis 
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={[0, 100]}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-3 rounded-lg shadow border">
                  <p className="font-medium text-sm">{data.name}</p>
                  <p className="text-sm text-gray-600">Performance: {data.performance}%</p>
                  <p className="text-sm text-gray-600">Contributions: €{data.contributions.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Membres: {data.membres}</p>
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      {period === 'month' ? 'Données mensuelles' :
                       period === 'quarter' ? 'Données trimestrielles' :
                       'Données annuelles'}
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="performance"
          radius={[4, 4, 0, 0]}
          fill="#F59E0B"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.performance)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
