import { useState } from 'react'
import CustomerNavbar from './CustomerNavbar'
import CustomerSidebar from './CustomerSidebar'

function CustomerLayout({ children, user }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FCF9F8]">
      <CustomerSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <CustomerNavbar
        user={user}
        onMenuClick={() => setMobileSidebarOpen(true)}
      />

      <main className="min-h-screen pt-20 lg:ml-64">
        {children}
      </main>
    </div>
  )
}

export default CustomerLayout

