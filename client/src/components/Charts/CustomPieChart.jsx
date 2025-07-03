import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors = [
    "#6366F1", // indigo-500
    "#EC4899", // pink-500
    "#10B981", // emerald-500
    "#F59E0B", // amber-500
    "#3B82F6", // blue-500
    "#F97316", // orange-500
    "#8B5CF6", // violet-500
    "#EF4444", // red-500
  ],
  showTextAnchor = true,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={showTextAnchor ? 70 : 40}
            paddingAngle={2}
            cornerRadius={8}
            labelLine={false}
            label={({ cx, cy }) =>
              showTextAnchor ? (
                <>
                  <text
                    x={cx}
                    y={cy - 15}
                    textAnchor="middle"
                    fill="#4B5563"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    {label}
                  </text>
                  <text
                    x={cx}
                    y={cy + 15}
                    textAnchor="middle"
                    fill="#111827"
                    fontSize="22px"
                    fontWeight="600"
                  >
                    {totalAmount}
                  </text>
                </>
              ) : null
            }
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
                stroke="#FFF"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomTooltip />} 
            wrapperStyle={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E5E7EB',
              padding: '12px',
            }}
          />
          <Legend 
            content={<CustomLegend />}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;