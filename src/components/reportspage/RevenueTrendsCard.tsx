import React from "react";

const data = [
  { month: "Jan", value: 24600 },
  { month: "Feb", value: 28400 },
  { month: "Mar", value: 31300 },
  { month: "Apr", value: 29800 },
  { month: "May", value: 34500 },
  { month: "Jun", value: 38200 },
];

const RevenueTrendsCard = () => {
  const maxValue = 40000;

  const getX = (i: number) => 60 + (i * 980) / (data.length - 1);
  const getY = (v: number) => 300 - (v / maxValue) * 240;

  const path = data
    .map((d, i) => {
      const x = getX(i);
      const y = getY(d.value);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const fillPath = `
    ${path}
    L ${getX(data.length - 1)} 300
    L ${getX(0)} 300
    Z
  `;

  return (
    <div className="bg-white border rounded-[14px] w-full max-w-[1131px] h-[450px] p-6">
      <div>
        <h3 className="font-semibold text-gray-900">Revenue Trends</h3>
        <p className="text-sm text-gray-500">
          Monthly revenue and order growth
        </p>
      </div>

      <svg className="mt-6 w-full h-[330px]">
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="60"
            x2="1040"
            y1={60 + i * 60}
            y2={60 + i * 60}
            stroke="#E5E7EB"
            strokeDasharray="3 3"
          />
        ))}

        {data.map((_, i) => (
          <line
            key={i}
            y1="60"
            y2="300"
            x1={getX(i)}
            x2={getX(i)}
            stroke="#E5E7EB"
            strokeDasharray="3 3"
          />
        ))}

        {/* Y Axis */}
        <line x1="60" y1="60" x2="60" y2="300" stroke="#9CA3AF" />
        <line x1="60" y1="300" x2="1040" y2="300" stroke="#9CA3AF" />

        {/* Y Labels */}
        {[0, 10000, 20000, 30000, 40000].map((v, i) => (
          <text
            key={v}
            x="20"
            y={300 - (v / maxValue) * 240 + 4}
            fontSize="12"
            fill="#9CA3AF"
          >
            {v === 0 ? "0" : v / 1000 + "k"}
          </text>
        ))}

        {/* Fill */}
        <path d={fillPath} fill="url(#revenueFill)" />

        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke="#2563EB"
          strokeWidth="2.5"
        />

        {/* Values */}
        {data.map((d, i) => (
          <text
            key={i}
            x={getX(i)}
            y={getY(d.value) - 10}
            fontSize="12"
            textAnchor="middle"
            fill="#111827"
            fontWeight="600"
          >
            ${(d.value / 1000).toFixed(1)}k
          </text>
        ))}

        {/* X Labels */}
        {data.map((d, i) => (
          <text
            key={d.month}
            x={getX(i)}
            y="325"
            fontSize="12"
            textAnchor="middle"
            fill="#9CA3AF"
          >
            {d.month}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default RevenueTrendsCard;
