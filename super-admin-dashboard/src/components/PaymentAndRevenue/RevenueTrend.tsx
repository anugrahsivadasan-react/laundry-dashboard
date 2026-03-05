import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts"

export interface RevenueTrend {
  date: string
  revenue: number
}

type Props = {
  data: RevenueTrend[]
}

const RevenueTrendChart = ({ data }: Props) => {
  return (
    <div className="bg-[#0f0f10] p-5 rounded-xl border border-gray-800">
      
      <div className="flex justify-between mb-4">
        <h2 className="text-sm text-gray-300">Revenue Trend</h2>

        <button className="text-xs bg-gray-700 px-3 py-1 rounded">
          Export
        </button>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="date" stroke="#666"/>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#00d084"
              fill="#00d084"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default RevenueTrendChart