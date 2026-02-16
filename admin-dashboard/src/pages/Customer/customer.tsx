import React, { useState } from "react";
import CustomerStatsCard from "../../components/Customers/CustomerStatsCard";
import { Users, Star, Mail, Award } from "lucide-react";
import CustomerSearchBar from "../../components/Customers/CustomerSearchBar";
import CustomerCard from "../../components/Customers/CustomerCard";
// import AddCustomerModal from "../../components/Customers/AddCustomerModal";__________________________________no need so  removed





const Customer: React.FC = () => {

const [search, setSearch] = useState("");
// const [openModal, setOpenModal] = useState(false);



const customers = [
  {
    id: 1, 
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "Active",
    rating: 4.8,
    email: "john.doe@email.com",
    phone: "+1 234 567 8901",
    address: "123 Main St, Downtown",
    totalOrders: 24,
    totalSpent: 1240,
    lastOrder: "Jan 13, 2026",
  },
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "Active",
    rating: 4.8,
    email: "john.doe@email.com",
    phone: "+1 234 567 8901",
    address: "123 Main St, Downtown",
    totalOrders: 24,
    totalSpent: 1240,
    lastOrder: "Jan 13, 2026",
  },
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "Active",
    rating: 4.8,
    email: "john.doe@email.com",
    phone: "+1 234 567 8901",
    address: "123 Main St, Downtown",
    totalOrders: 24,
    totalSpent: 1240,
    lastOrder: "Jan 13, 2026",
  },
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "Active",
    rating: 4.8,
    email: "john.doe@email.com",
    phone: "+1 234 567 8901",
    address: "123 Main St, Downtown",
    totalOrders: 24,
    totalSpent: 1240,
    lastOrder: "Jan 13, 2026",
  },
];



  return (
    <div className="p-6 bg-[#F3F6F9] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold text-[#101828]">
            Customer Management
          </h1>
          <p className="text-[14px] font-arimo text-[#6A7282]">
            View and manage customer information
          </p>
        </div>

        {/* <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90"   __________________________________no need so  removed
         onClick={() => setOpenModal(true)}
         >

          Add Customer
        </button> */}
      </div>

      {/* STATS ROW */}
      <div className="flex gap-4 mb-8">
        <CustomerStatsCard
          title="Total Customers"
          value="1,248"
          change="+12% this month"
          icon={<Users size={16} className="text-blue-600" />}
          highlight
        />

        <CustomerStatsCard
          title="VIP Customers"
          value="124"
          change="+8% this month"
          icon={<Star size={16} className="text-purple-600" />}
        />

        <CustomerStatsCard
          title="New This Month"
          value="86"
          change="+24% vs last month"
          icon={<Mail size={16} className="text-green-600" />}
        />

        <CustomerStatsCard
          title="Avg. Rating"
          value="4.8"
          subtitle="Excellent"
          icon={<Award size={16} className="text-yellow-500" />}
        />
      </div>

<div>
    <CustomerSearchBar
    value={search}
  onChange={setSearch}
  onFilterClick={() => console.log("Filter clicked")}
  />
</div>

<div className="grid grid-cols-2 gap-6 mt-6">
  {customers.map((customer) => (
    <CustomerCard key={customer.id} customer={customer} />
  ))}
</div>

 
{/* <AddCustomerModal open={openModal} onClose={() => setOpenModal(false)} /> */}


    </div>
  );
};

export default Customer;
