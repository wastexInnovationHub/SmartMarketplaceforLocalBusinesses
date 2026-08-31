import { Outlet } from 'react-router-dom'
import LandingHeader from '../components/landing/LandingHeader'
import LandingFooter from '../components/landing/LandingFooter'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#FCF9F8] text-[#1B1C1C]">
      <LandingHeader />

      <main>
        <Outlet />
      </main>

      <LandingFooter />
    </div>
  )
}

export default PublicLayout