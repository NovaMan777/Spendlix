import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const categoryColor = payload[0].payload.fill; // Get the color from the pie segment
    
    return (
      <div className="bg-white backdrop-blur-sm bg-opacity-90 shadow-lg rounded-xl p-3 border-0">
        <div className="flex items-center mb-1">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: categoryColor }}
          />
          <p className="text-sm font-bold text-gray-800">
            {payload[0].name}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500">Amount:</span>
          <span className="text-sm font-bold ml-2" style={{ color: categoryColor }}>
            ₹{payload[0].value.toLocaleString()}
          </span>
        </div>
        {/* Optional percentage display - uncomment if you want to show percentages */}
        {/* <div className="flex justify-between items-center mt-1">
          <span className="text-xs font-medium text-gray-500">Percentage:</span>
          <span className="text-xs font-semibold text-gray-700">
            {((payload[0].payload.percent || 0) * 100).toFixed(1)}%
          </span>
        </div> */}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;