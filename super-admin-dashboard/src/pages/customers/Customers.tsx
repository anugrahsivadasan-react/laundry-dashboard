import { useEffect } from "react"
import CustomerCards from "../../components/customers/CustomerCard"
import CustomersTable from "../../components/customers/CustomersTable"
import {
  fetchCustomerStats,
  fetchUserOrderSummary,
} from "../../redux/action/customerThunks"
import { useAppDispatch } from "../../redux/hooks"
const Customers = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCustomerStats())
    dispatch(fetchUserOrderSummary())
  }, [dispatch])

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-white">
            Customer Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            View and manage all customers across branches
          </p>
        </div>
      </div>

      <CustomerCards />

      <div className="">
        <CustomersTable />
      </div>
    </div>
  )
}

export default Customers
