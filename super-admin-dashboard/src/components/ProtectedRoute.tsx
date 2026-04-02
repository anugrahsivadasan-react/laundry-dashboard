import React from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"

const ProtectedRoute: React.FC = () => {
  
  const { loading, isVerified, authChecked } = useAppSelector((s) => s.auth)
  const location = useLocation()
  console.log(loading)
  // if (!authChecked || loading) {
  //   return <div>Loading...</div>
  // }

  // if (!isVerified) {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }

  return <Outlet />
}

export default ProtectedRoute
