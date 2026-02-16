
import { Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'

// command to checkout the branch and pull the latest changes from the remote repository:
// git checkout super-admin
// git pull origin super-admin


import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import Branches from './pages/Branches/Branches'

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
          
        </Route>


      </Routes>
   
    </BrowserRouter>
  )
}

export default App
