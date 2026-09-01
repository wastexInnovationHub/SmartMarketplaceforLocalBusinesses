import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'

import HomePage from '../pages/landing/HomePage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import TermsOfServicePage from '../pages/legal/TermsOfServicePage'
import PrivacyPolicyPage from '../pages/legal/PrivacyPolicyPage'

import CustomerDashboardPage from '../pages/customer/CustomerDashboardPage'
import BusinessDashboardPage from '../pages/business/BusinessDashboardPage'
import DeliveryDashboardPage from '../pages/delivery/DeliveryDashboardPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            PUBLIC WEBSITE
        ========================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* =========================
            AUTHENTICATION
        ========================== */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* =========================
            LEGAL
        ========================== */}
        <Route
          path="/terms"
          element={<TermsOfServicePage />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPolicyPage />}
        />

        {/* =========================
            CUSTOMER
        ========================== */}
        <Route
          path="/customer/dashboard"
          element={<CustomerDashboardPage />}
        />

        {/* =========================
            BUSINESS
        ========================== */}
        <Route
          path="/business/dashboard"
          element={<BusinessDashboardPage />}
        />

        {/* =========================
            DELIVERY
        ========================== */}
        <Route
          path="/delivery/dashboard"
          element={<DeliveryDashboardPage />}
        />

        {/* =========================
            ADMIN
        ========================== */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboardPage />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

