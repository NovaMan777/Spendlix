import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-xl p-4 border border-white/20">
          <p className="text-sm font-semibold text-indigo-900 mb-1">
            {payload[0].payload.category}
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"></div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Amount: </span>
              <span className="font-bold text-indigo-800">
                ₹{payload[0].payload.amount.toLocaleString('en-In', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-3xl shadow-2xl border border-white/20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Expense Trend</h3>
          <p className="text-sm text-gray-500">Last 12 months performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"></div>
          <span className="text-sm font-medium text-gray-700">Expense</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
              <stop offset="80%" stopColor="#7C3AED" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#EDE9FE" 
            vertical={false}
            strokeOpacity={0.7}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 12, 
              fill: "#6B7280",
              fontFamily: "Inter, sans-serif"
            }}
            padding={{ left: 20, right: 20 }}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fontSize: 12, 
              fill: "#6B7280",
              fontFamily: "Inter, sans-serif"
            }}
            tickFormatter={(value) => `₹${value.toLocaleString()}`}
            width={80}
          />

          <Tooltip 
            content={CustomToolTip}
            cursor={{
              stroke: "#8B5CF6",
              strokeWidth: 1,
              strokeDasharray: "0",
              fill: "rgba(139, 92, 246, 0.05)"
            }}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            fill="url(#incomeGradient)"
            fillOpacity={1}
            activeDot={{
              r: 8,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#7C3AED"
            }}
            dot={{
              r: 4,
              stroke: "#fff",
              strokeWidth: 2,
              fill: "#7C3AED"
            }}
            animationEasing="ease-out"
            animationDuration={1500}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#D946EF" />
              </linearGradient>
            </defs>
          </Area>
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex justify-end mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Updated: {new Date().toLocaleDateString()}</span>
          <div className="w-1 h-1 rounded-full bg-gray-400"></div>
          <span className="text-xs text-gray-500">INR</span>
        </div>
      </div>
    </div>
  );
};

export default CustomLineChart;