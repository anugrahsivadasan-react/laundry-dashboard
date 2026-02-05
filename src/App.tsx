import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import OrderManagement from "./pages/Orders/OrderManagement";
import PicupAndDelivery from "./pages/picup&delivery/PicupAndDelivery";
import Customer from "./pages/Customer/customer";
import Payments from "./pages/Payments/Payments";
import OffersAndCoupons from "./pages/Offers&Coupons/OffersAndCoupons";
import ServicesAndPricing from "./pages/ServicesAndPricing/ServicesAndPricing";
import Report from "./pages/reportspage/Report";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN DASHBOARD LAYOUT */}
        <Route path="/" element={<DashboardLayout />}>

          {/* Default Dashboard */}
          <Route index element={<Home />} />

          {/* Dashboard Route */}
          <Route path="dashboard" element={<Home />} />
          <Route path="orders" element={<OrderManagement/>} />
          <Route path="pickup" element={<PicupAndDelivery/>} />
          <Route path="customers" element={<Customer/>} />
          <Route path="payments" element={<Payments/>} />
          <Route path="offers" element={<OffersAndCoupons/>} />
          <Route path="services-pricing" element={<ServicesAndPricing/>} />
          <Route path="reports" element={<Report/>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
