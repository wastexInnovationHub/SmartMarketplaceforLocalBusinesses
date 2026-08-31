import { Outlet } from 'react-router-dom'
import LandingFooter from '../components/landing/LandingFooter'
import LandingHeader from '../components/landing/LandingHeader'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#FCF9F8]">
      <LandingHeader />

      <main>
        <Outlet />
      </main>

      <LandingFooter />
    </div>
  )
}

export default PublicLayout