import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
export interface PaymentMethod {
  name: string
  value: number
}
const COLORS = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"]

type Props = {
  data: PaymentMethod[]
}

const PaymentMethods = ({ data }: Props) => {

  return (
    <div className="bg-[#0f0f10] p-5 rounded-xl border border-gray-800">

      <h2 className="text-sm text-gray-300 mb-4">Payment Methods</h2>

      <div className="h-[200px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2 text-xs text-gray-300">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: COLORS[index] }}
              />
              {item.name}
            </span>
            <span>{item.value}%</span>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PaymentMethods