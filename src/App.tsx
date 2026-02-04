import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import OrderManagement from "./pages/Orders/OrderManagement";
import Customer from "./pages/Customer/customer";

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
          <Route path="customers" element={<Customer/>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
