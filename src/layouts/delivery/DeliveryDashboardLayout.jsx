import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import DeliverySidebar from '../../components/delivery/DeliverySidebar'
import DeliveryNavbar from '../../components/delivery/DeliveryNavbar'

function DeliveryDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">

      {/* Delivery sidebar */}
      <DeliverySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Delivery navbar */}
      <DeliveryNavbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Delivery main content */}
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

export default DeliveryDashboardLayout

