// src/pages/Dashboard.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../Utils/Constants'

// Role-specific dashboards
import AdminDashboard from '../components/dashboard/AdminDashboard/AdminDashboard'
import OrganiserDashboard from '../components/dashboard/organiserDashboard/organiserDashboard'
import UserDashboard from '../components/dashboard/userDashboard/userDashboard'

const Dashboard = () => {
  const { user } = useSelector((state) => state.profile)

  const renderDashboard = () => {
    switch (user?.role) {
      case ACCOUNT_TYPE.ORGANISER:
        return <OrganiserDashboard />
      case ACCOUNT_TYPE.ATTENDEE:
        return <UserDashboard />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] pt-10">
      {/* Header */}
      <div className="py-4 px-6">
        <h1 className="text-2xl font-semibold text-blue-600">Dashboard</h1>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-white mb-4" />

      {/* Role-based Content */}
      <div className="p-4 sm:p-6">{renderDashboard()}</div>
    </div>
  )
}

export default Dashboard
