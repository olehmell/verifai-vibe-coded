import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeProps {
  score: number;
}

const Gauge: React.FC<GaugeProps> = ({ score }) => {
  // Determine color based on score
  const getColor = (value: number) => {
    if (value >= 90) return '#22c55e'; // Green-500
    if (value >= 70) return '#84cc16'; // Lime-500
    if (value >= 40) return '#eab308'; // Yellow-500
    return '#ef4444'; // Red-500
  };

  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const activeColor = getColor(score);

  return (
    <div className="relative h-48 w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell key="cell-0" fill={activeColor} />
            <Cell key="cell-1" fill="#e2e8f0" /> {/* Slate-200 */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-0 flex flex-col items-center pb-2">
        <span className="text-4xl font-bold text-slate-800">{score}</span>
        <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Credibility</span>
      </div>
    </div>
  );
};

export default Gauge;
