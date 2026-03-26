import DashboardLayout from "./layouts/DashboardLayout"
import Home from "./pages/Home"
import AccessControl from "./pages/Access control/AccessControl"
import Orders from "./pages/orders/Orders"
import Customers from "./pages/customers/Customers"

// command to checkout the branch and pull the latest changes from the remote repository:
// git checkout super-admin
// git pull origin super-admin

import "./App.css"
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom"
import Branches from "./pages/Branches/Branches"
import AdminManagement from "./pages/AdminManagement/AdminManagement"
import ServiceAndPrices from "./pages/serviceandprice/ServiceAndPrices"
import OffersAndCoupons from "./pages/offers&coupons/OffersAndCoupons"
import NotificationPage from "./pages/NotificationPage/NotificationPage"
import PaymentsAndRevenue from "./pages/PaymentsAndRevenue/PaymentsAndRevenue"
import CSMandSettings from "./pages/CSMandSettngs/CSMandSettings"
import SecuirityAndLogs from "./pages/SecuirityAndLogs/SecuirityAndLogs"
import { Toaster } from "react-hot-toast"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./components/ProtectedRoute"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { useEffect } from "react"
import { getProfile } from "./redux/action/authThunks"
import ReportAndAnalytics from "./pages/reportandanalytics/ReportAndAnalytics"

function App() {
  const dispatch = useAppDispatch()

  const { isVerified, authChecked } = useAppSelector((s) => s.auth)

  useEffect(() => {
    if (!authChecked && !isVerified) {
      dispatch(getProfile())
    }
  }, [dispatch, isVerified, authChecked])

  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN DASHBOARD LAYOUT */}

        <Route
          path="/login"
          element={isVerified ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            {/* Default Dashboard */}
            <Route index element={<Home />} />

            {/* pages Route  */}
            <Route path="dashboard" element={<Home />} />
            <Route path="branches" element={<Branches />} />
            <Route path="admin" element={<AdminManagement />} />
            <Route path="access-control" element={<AccessControl />} />
            <Route path="services-pricing" element={<ServiceAndPrices />} />
            <Route path="offers-coupons" element={<OffersAndCoupons />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="Orders" element={<Orders />} />
            <Route path="Customers" element={<Customers />} />
            <Route path="payments-revenue" element={<PaymentsAndRevenue />} />
            <Route path="report-analytics" element={<ReportAndAnalytics />} />
            <Route path="support" element={<CSMandSettings />} />
            <Route path="settings" element={<SecuirityAndLogs />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-left" reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App
