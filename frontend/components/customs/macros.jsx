"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", '#FFBB28', '#00C49F'];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function MacroDonutChart({ data, servingSize = 1 }) {
  const macros = Object.keys(data.macros)
    .map((val) => ({ name: val, value: data.macros[val].value * servingSize }))
    .filter(({ name }) => !(name == "calories" || name == "recipesUsed"));

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 border rounded-3xl hover:shadow-xl cursor-pointer">
      <div className="flex items-center gap-8">
        <PieChart width={280} height={280}>
          <Pie
            data={macros}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ value }) => `${value}g`}
          >
            {macros.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}g`, name]}/>
        </PieChart>

        {/* Legend */}
        <aside className="flex flex-col gap-3">
          {macros.map((entry, index) => (
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
