"use client";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#FFBB28", "#00C49F"];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function MacroDonutChart({ data, servingSize = 1 }) {
  // if (!data?.macros) {
  //   return (
  //     <article>
  //       <div className="flex gap-8 border rounded-3xl p-8 items-center">
  //         <Info size={72} color="#348ceb"/>
  //         <div>
  //           <h1 className="text-md font-bold leading-loose">Discover Your Meal’s Macronutrient Profile in Seconds</h1>
  //           <p className="text-sm text-gray-600 leading-relaxed">
  //             Upload a meal photo, select the best AI prediction,
  //             then click<br /> <b>Get Nutritional Facts</b>
  //             . In seconds, receive a detailed breakdown of <br />
  //             proteins, carbohydrates, fats, and calories to optimize your diet.
  //           </p>
  //         </div>
  //       </div>
  //     </article>
  //   );
  // }

  const macros = Object.keys(data.macros)
    .map((val) => ({ name: val, value: data.macros[val].value * servingSize }))
    .filter(({ name }) => !(name == "calories" || name == "recipesUsed"));

  useEffect(() => {
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToSection("result");
  });

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
          <Tooltip formatter={(value, name) => [`${value}g`, name]} />
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
