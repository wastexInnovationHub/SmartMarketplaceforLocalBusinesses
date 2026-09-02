import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import CustomerSidebar from '../../components/customer/CustomerSidebar'
import CustomerNavbar from '../../components/customer/CustomerNavbar'

function CustomerDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#1B1C1C]">

      {/* Customer sidebar */}
      <CustomerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Customer navbar */}
      <CustomerNavbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Main content */}
      <main className="min-h-screen pt-20 lg:pl-72">

        <div className="w-full px-4 py-7 sm:px-6 lg:px-8 xl:px-10">

          <div className="mx-auto w-full max-w-[1400px]">

            <Outlet />

          </div>

        </div>

      </main>

    </div>
  )
}

export default CustomerDashboardLayout

