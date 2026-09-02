import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import BusinessSidebar from '../../components/business/BusinessSidebar'
import BusinessNavbar from '../../components/business/BusinessNavbar'

function BusinessDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-dvh bg-[#F3FAF8]">

      {/* Business sidebar */}
      <BusinessSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main application area */}
      <div className="min-h-dvh lg:pl-72">

        {/* Business navbar */}
        <BusinessNavbar
          onMenuClick={openSidebar}
        />

        {/* Page content */}
        <main className="w-full">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default BusinessDashboardLayout

