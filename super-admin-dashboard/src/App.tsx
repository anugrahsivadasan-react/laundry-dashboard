
import { Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import AccessControl from './pages/Access control/AccessControl'
import Orders from './pages/orders/Orders'
import Customers from './pages/customers/Customers'

// command to checkout the branch and pull the latest changes from the remote repository:
// git checkout super-admin
// git pull origin super-admin


import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import Branches from './pages/Branches/Branches'
import AdminManagement from './pages/AdminManagement/AdminManagement'
import ServiceAndPrices from './pages/serviceandprice/ServiceAndPrices'
import OffersAndCoupons from './pages/offers&coupons/OffersAndCoupons'
import NotificationPage from './pages/NotificationPage/NotificationPage'
import PaymentsAndRevenue from './pages/PaymentsAndRevenue/PaymentsAndRevenue'
import CSMandSettings from './pages/CSMandSettngs/CSMandSettings'
import SecuirityAndLogs from './pages/SecuirityAndLogs/SecuirityAndLogs'
function App() {
 

  return (
    <BrowserRouter>
    <Routes>


        {/* MAIN DASHBOARD LAYOUT */}
        <Route path="/" element={<DashboardLayout />}>

          {/* Default Dashboard */}
          <Route index element={<Home />} />

          {/* pages Route  */}
          <Route path="dashboard" element={<Home />} />
          <Route path="branches" element={<Branches />} />
          <Route path="admin" element={<AdminManagement />} />
          <Route path="access-control" element={<AccessControl />} />
          <Route path="services-pricing" element={<ServiceAndPrices />} />
          <Route path="offers-coupons" element={<OffersAndCoupons/>} />
          <Route path="notifications" element={<NotificationPage/>} />
         <Route path="Orders" element={<Orders />} />
          <Route path="Customers" element={<Customers />} />
          <Route path="payments-revenue" element={<PaymentsAndRevenue />} />
          <Route path="support" element={<CSMandSettings />} />
          <Route path="settings" element={<SecuirityAndLogs />} />
          
        </Route>


      </Routes>
   
    </BrowserRouter>
  )
}

export default App
