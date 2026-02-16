import { useDashboardViewModel } from "./DashboardViewModel";
// import Loader from "../../components/Loader/index";
import ErrorState from "../../components/ErrorState/index";
import Header from "../../components/dashboard components/Header";
import StatsCard from "../../components/dashboard components/StatsCard";
// statscard
import today from "../../assets/statsCardDAshboard/order.svg"
import pending from "../../assets/statsCardDAshboard/pending.svg"
import progress from "../../assets/statsCardDAshboard/progress.svg"
import ready from "../../assets/statsCardDAshboard/ready.svg"
import OrderStatusChart from "../../components/dashboard components/OrderStatusChart";
// ColorCard
import amount from "../../assets/colorcardDashboard/amount.svg"
import cus from "../../assets/colorcardDashboard/customer.svg"
import del from "../../assets/colorcardDashboard/delivery.svg"

import RevenueGraph from "../../components/dashboard components/RevenueGraph";
import ColorCard from "../../components/dashboard components/ColorCard";
import RecentOrdersTable from "../../components/dashboard components/RecentOders";


const Dashboard = () => {
  const { data, loading, error } = useDashboardViewModel();
  

  // if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="p-6 pr-6 bg-[#EEF2F7]">
     <Header />

      <div className="grid grid-cols-4 gap-5 mb-5 pt-[30px]" >
     
          <>
            <StatsCard title="Today's order" value={48} per="12%"  bg="blue" color="blue" icon={<img src={today} alt="logo" className="w-12 h-12" />} />
            <StatsCard title="Pending Picups" value={15} per="5%" color="red" bg="red" icon={<img src={pending} alt="logo" className="w-12 h-12" />} />
            <StatsCard title="In Process" value={23} per="12%" color="purple" bg="purple" icon={<img src={progress} alt="logo" className="w-12 h-12" />} />
            <StatsCard title="Ready for Delivery" value={18} per="12%" color="green" bg= "green" icon={<img src={ready} alt="logo" className="w-12 h-12" />} />
                     </>
        
      </div>
      <div className="flex gap-4">
      <RevenueGraph />

      <OrderStatusChart/>

    </div>
    <div className="grid grid-cols-3 gap-5 mb-5 pt-[30px]" >
     
          <>
            <ColorCard title="Total Revenue" value={"$24,580"} per="This Month"  bg="blue" color="blue" icon={<img src={amount} alt="logo" className="w-12 h-12" />} />
            <ColorCard title="Total Customers" value={1248} per="Active" color="red" bg="purple" icon={<img src={cus} alt="logo" className="w-12 h-12" />} />
            <ColorCard title="Deliveries Sheduled" value={32} per="Today" color="purple" bg="red" icon={<img src={del} alt="logo" className="w-12 h-12" />} />
           
          </>
        
      </div>
 <div className="">
      <RecentOrdersTable />
    </div>

    </div>
  );
};

export default Dashboard;
