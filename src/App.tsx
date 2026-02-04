import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";

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
          {/* <Route path="orders" element={<Home />} /> */}

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
