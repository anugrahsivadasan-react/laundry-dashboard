import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts"

export interface BranchRevenue {
  branch: string
  revenue: number
}

type Props = {
  data: BranchRevenue[]
}

const BranchRevenueChart = ({ data }: Props) => {

  return (
    <div className="bg-[#0f0f10] p-5 rounded-xl border border-gray-800">

      <h2 className="text-sm text-gray-300 mb-4">
        Branch-wise Revenue
      </h2>

      <div className="h-[250px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="branch" stroke="#666"/>
            <Bar dataKey="revenue" fill="#7c3aed" radius={[6,6,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default BranchRevenueChart