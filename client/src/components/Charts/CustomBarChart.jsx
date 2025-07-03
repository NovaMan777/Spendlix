import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const getBarColor = (index) => {
    const colors = [
      "url(#gradient1)",
      "url(#gradient2)",
      "url(#gradient3)",
      "url(#gradient4)",
    ];
    return colors[index % colors.length];
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-xl rounded-lg p-3 border-0 backdrop-blur-sm bg-opacity-90">
          <p className="text-sm font-bold text-indigo-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600 font-medium">
            Amount:{" "}
            <span className="text-sm font-bold text-indigo-600">
              ₹{payload[0].payload.amount.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-lg mt-6 border border-indigo-100 overflow-x-auto">
      <h3 className="text-xl font-bold text-indigo-900 mb-4">
        Financial Overview
      </h3>

      <div style={{ width: `${data.length * 32}px`, minWidth: "100%" }}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6a11cb" />
                <stop offset="100%" stopColor="#2575fc" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f54ea2" />
                <stop offset="100%" stopColor="#ff7676" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#17ead9" />
                <stop offset="100%" stopColor="#6078ea" />
              </linearGradient>
              <linearGradient id="gradient4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f02fc2" />
                <stop offset="100%" stopColor="#6094ea" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />

            <Tooltip
              content={CustomToolTip}
              cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
            />

            <Bar
              dataKey="amount"
              radius={[12, 12, 0, 0]}
              barSize={14}
              onMouseEnter={handleMouseEnter}
              activeBar={{
                radius: [12, 12, 0, 0],
                stroke: "#fff",
                strokeWidth: 2,
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={getBarColor(index)}
                  strokeWidth={index === activeIndex ? 2 : 0}
                  stroke="#fff"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
