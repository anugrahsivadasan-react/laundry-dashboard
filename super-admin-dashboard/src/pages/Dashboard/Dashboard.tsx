import StatsCard from "../../components/dashboard/StatsCard";
import ordersIcon from "../../assets/dahboardicons/ordersicon.svg";
import revenueIcon from "../../assets/dahboardicons/revenueicon.svg";
import branchesIcon from "../../assets/dahboardicons/branchesicon.svg";
import adminsIcon from "../../assets/dahboardicons/adminicon.svg";
import paymentsIcon from "../../assets/dahboardicons/paymenticon.svg";
import WeeklyRevenueGraph from "../../components/dashboard/WeeklyRevenueGraph";
import OrderStatusGraph from "../../components/dashboard/OrderStatsGraph";
import SuperAdminPerformanceChart from "../../components/dashboard/SuperAdminPerformanceChart";
import SuperAdminQuickActions from "../../components/dashboard/SuperAdminQuickActions";


interface StatItem {
  id: number;
  title: string;
  value: string;
  changeText: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
  iconBgColor: string;
}

const statsData: StatItem[] = [
  {
    id: 1,
    title: "Total Orders",
    value: "1,247",
    changeText: "+12.5%",
    changeType: "positive",
    icon: ordersIcon,
    iconBgColor: "#2B7FFF1A",
  },
  {
    id: 2,
    title: "Total Revenue",
    value: "$49,287",
    changeText: "+18.2%",
    changeType: "positive",
    icon: revenueIcon,
    iconBgColor: "#00C9501A",
  },
  {
    id: 3,
    title: "Active Branches",
    value: "12",
    changeText: "No change",
    changeType: "neutral",
    icon: branchesIcon,
    iconBgColor: "#AD46FF1A",
  },
  {
    id: 4,
    title: "Active Admins",
    value: "28",
    changeText: "+2 new",
    changeType: "positive",
    icon: adminsIcon,
    iconBgColor: "#FE9A001A",
  },
  {
    id: 5,
    title: "Pending Payments",
    value: "$3,240",
    changeText: "-23 orders",
    changeType: "negative",
    icon: paymentsIcon,
    iconBgColor: "#FB2C361A",
  },
];

const Dashboard = () => {
  return (
    <div className="p-8 bg-[#0A0A0A] min-h-screen ">
      {/* Stats Grid */}
      <div className="flex gap-4 mb-8">
        {statsData.map((stat) => (
          <StatsCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            changeText={stat.changeText}
            changeType={stat.changeType}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
          />
        ))}
      </div>

<section className="flex gap-4 mb-8">
    <WeeklyRevenueGraph/>

    <OrderStatusGraph/>

</section>

<section className="flex gap-4 mb-8">
  <SuperAdminPerformanceChart/>
  <SuperAdminQuickActions/>
</section>


    </div>
  );
};

export default Dashboard;
