import React, { useRef } from "react";

const CustomLegend = ({ payload = [] }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
  };

  if (!payload.length) return null;

  return (
    <div className="relative group w-full py-5 px-4 bg-[#fdf6ec] rounded-2xl shadow-inner border border-[#f0e8db]">
      {/* Scroll arrows (only visible on hover) */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/60 rounded-full shadow hover:bg-white transition hidden group-hover:flex"
      >
        ◀
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/60 rounded-full shadow hover:bg-white transition hidden group-hover:flex"
      >
        ▶
      </button>

      {/* Scrollable Legend Row - Hidden Scrollbar */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto px-2 no-scrollbar"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {payload.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="relative group/legend flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-xl border border-white/30 transition-all duration-300 ease-out whitespace-nowrap hover:scale-[1.03] hover:shadow-md"
            style={{
              boxShadow: `
                0 2px 4px rgba(0,0,0,0.05),
                0 6px 10px -2px rgba(0,0,0,0.1),
                0 0 0 1px rgba(0,0,0,0.02)
              `,
              transform: 'perspective(500px) translateZ(0)',
              willChange: 'transform, box-shadow',
            }}
          >
            {/* Dot */}
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                backgroundColor: entry.color,
                boxShadow: `
                  ${entry.color} 0 0 0 1px,
                  rgba(0,0,0,0.1) 0 1px 3px 0,
                  rgba(255,255,255,0.4) 0 1px 0 inset
                `,
              }}
            />

            {/* Label with tooltip */}
            <span className="text-sm font-medium text-gray-800 truncate max-w-[120px] relative">
              <span className="group-hover/legend:underline decoration-dotted cursor-help">
                {entry.value}
              </span>
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/legend:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                {entry.value}
              </span>
            </span>

            {/* Count badge */}
            {entry.payload?.count && (
              <span className="text-xs font-medium text-gray-600 bg-white/40 px-2 py-0.5 rounded ml-1 border border-white/30">
                {entry.payload.count}
              </span>
            )}

            {/* Edge lighting */}
            <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/30 mix-blend-overlay" />
          </div>
        ))}
      </div>

      {/* Hide scrollbars completely via custom CSS */}
      <style>{}</style>
    </div>
  );
};

export default CustomLegend;
