 import React from "react";
import OrdersCustomersChart from "./graphs/OrdersCustomersChart";
import RevenueTrendChart from "../PaymentAndRevenue/RevenueTrend";
import type { RevenueTrend } from "../PaymentAndRevenue/RevenueTrend";

const OverviewTab: React.FC = () => {
  // Replace with your actual data source
  const revenueTrendData: RevenueTrend[] = [];

  return (
    <div className="w-full">

      {/* Graph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
         <RevenueTrendChart data={revenueTrendData} />

         
        {/* Orders & Customers Chart */}
        <OrdersCustomersChart />

       
       

      </div>

    </div>
  );
};

export default OverviewTab;