'use client';

import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'Carbs', value: 150 },
  { name: 'Protein', value: 90 },
  { name: 'Fat', value: 60 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28',];

export default function MacroDonutChart() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 border rounded-3xl hover:shadow-xl cursor-pointer">
      <div className="flex items-center gap-8">
        <PieChart width={220} height={220}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Legend */}
        <aside className="flex flex-col gap-3">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-gray-700">{entry.name}</span>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
