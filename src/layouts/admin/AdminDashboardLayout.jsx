import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminNavbar from '../../components/admin/AdminNavbar'

function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close the mobile sidebar
  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  // Open the mobile sidebar
  const openSidebar = () => {
    setSidebarOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">

      {/* Admin sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Admin navbar */}
      <AdminNavbar
        onMenuClick={openSidebar}
      />

      {/* Main admin content */}
      <main className="min-h-screen pt-20 lg:pl-72">
        <div className="w-full px-4 py-6 sm:px-6 sm:py-7 lg:px-8 xl:px-10">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboardLayout

