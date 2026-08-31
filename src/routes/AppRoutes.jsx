import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'

import HomePage from '../pages/landing/HomePage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import TermsOfServicePage from '../pages/legal/TermsOfServicePage'
import PrivacyPolicyPage from '../pages/legal/PrivacyPolicyPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Legal */}
        <Route
          path="/terms"
          element={<TermsOfServicePage />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPolicyPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes