import React, { useState } from "react";
import StaffTabs from "./StaffTabs";
import StaffCard from "./StaffCard";

/* ---------------- ADMIN & STAFF DATA ---------------- */
const adminStaffData = [
  {
    name: "Sarah Admin",
    role: "Super Admin",
    status: "Active",
    email: "sarah@jugglelaundry.com",
    phone: "+1 234 567 8900",
    branch: "All Branches",
    lastLogin: "2 hours ago",
  },
  {
    name: "John Manager",
    role: "Branch Manager",
    status: "Active",
    email: "john@jugglelaundry.com",
    phone: "+1 234 567 8901",
    branch: "Aluva Branch",
    lastLogin: "5 hours ago",
  },
  {
    name: "Emma Staff",
    role: "Staff",
    status: "Active",
    email: "emma@jugglelaundry.com",
    phone: "+1 234 567 8902",
    branch: "Aluva Branch",
    lastLogin: "1 day ago",
  },
];

/* ---------------- DELIVERY STAFF DATA ---------------- */
const deliveryStaffData = [
  {
    name: "Mike Driver",
    status: "Available",
    phone: "+1 234 567 8910",
    vehicle: "Bike - KA01AB1234",
    assigned: 8,
    completed: 145,
  },
  {
    name: "John Driver",
    status: "On Duty",
    phone: "+1 234 567 8911",
    vehicle: "Van - KA01CD5678",
    assigned: 12,
    completed: 289,
  },
  {
    name: "Sarah Driver",
    status: "Available",
    phone: "+1 234 567 8912",
    vehicle: "Bike - KA01EF9012",
    assigned: 6,
    completed: 178,
  },
  {
    name: "Tom Driver",
    status: "Off Duty",
    phone: "+1 234 567 8913",
    vehicle: "Van - KA01GH3456",
    assigned: 0,
    completed: 234,
  },
];

const rolesPermissionsData = [
  {
    role: "Super Admin",
    description: "Full system access",
    usersCount: 2,
    badgeColor: "purple" as const,
    permissions: [
      "Dashboard",
      "Orders",
      "Customers",
      "Payments",
      "Reports",
      "Settings",
      "User Management",
    ],
  },
  {
    role: "Branch Manager",
    description: "Branch-level management",
    usersCount: 3,
    badgeColor: "blue" as const,
    permissions: [
      "Dashboard",
      "Orders",
      "Customers",
      "Pickup/Delivery",
      "Reports",
    ],
  },
  {
    role: "Staff",
    description: "Limited access",
    usersCount: 12,
    badgeColor: "green" as const,
    permissions: ["Orders", "Customers", "Pickup/Delivery"],
  },
];


const StaffManagementSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "admin" | "delivery" | "roles"
  >("admin");

  return (
    <div className="w-full">
      <StaffTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* CONTENT */}
      <div className="flex flex-col gap-6 mt-6">
        {/* -------- ADMIN & STAFF -------- */}
        {activeTab === "admin" &&
          adminStaffData.map((staff, idx) => (
            <StaffCard
              key={idx}
              type="admin"
              name={staff.name}
              role={staff.role}
              status={staff.status}
              email={staff.email}
              phone={staff.phone}
              branch={staff.branch}
              lastLogin={staff.lastLogin}
            />
          ))}

        {/* -------- DELIVERY STAFF -------- */}
        {activeTab === "delivery" &&
         
           <div className="grid grid-cols-2 gap-6">
  {deliveryStaffData.map((staff, idx) => (
    <StaffCard
      key={idx}
      type="delivery"
      name={staff.name}
      status={staff.status}
      phone={staff.phone}
      vehicle={staff.vehicle}
      assigned={staff.assigned}
      completed={staff.completed}
    />
  ))}
</div>

}

        {/* -------- ROLES & PERMISSIONS -------- */}
        {activeTab === "roles" && (
          <StaffCard
    type="roles"
    name=""
    permissionsData={rolesPermissionsData}
  />
        )}
      </div>
    </div>
  );
};

export default StaffManagementSection;
