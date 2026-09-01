import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// ======================================================
// PUBLIC LAYOUT
// ======================================================
import PublicLayout from '../layouts/PublicLayout'

// ======================================================
// PUBLIC PAGES
// ======================================================
import HomePage from '../pages/landing/HomePage'

// ======================================================
// AUTH PAGES
// Login & Register intentionally have NO public header/footer
// ======================================================
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

// ======================================================
// CUSTOMER LAYOUT
// ======================================================
import CustomerDashboardLayout from '../layouts/customer/CustomerDashboardLayout'

// ======================================================
// CUSTOMER PAGES
// ======================================================
import CustomerDashboardPage from '../pages/customer/CustomerDashboardPage'
import CustomerBusinessesPage from '../pages/customer/CustomerBusinessesPage'
import CustomerFavoritesPage from '../pages/customer/CustomerFavoritesPage'
import CustomerOrdersPage from '../pages/customer/CustomerOrdersPage'
import CustomerProfilePage from '../pages/customer/CustomerProfilePage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            PUBLIC WEBSITE
            LandingHeader + LandingFooter
        ================================================== */}

        <Route element={<PublicLayout />}>

          {/* Home */}
          <Route
            path="/"
            element={<HomePage />}
          />

        </Route>


        {/* ==================================================
            AUTHENTICATION
            NO LandingHeader
            NO LandingFooter
        ================================================== */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />


        {/* ==================================================
            CUSTOMER APPLICATION
            CustomerDashboardLayout handles customer navigation
        ================================================== */}

        <Route
          path="/customer"
          element={<CustomerDashboardLayout />}
        >

          {/* /customer → /customer/dashboard */}
          <Route
            index
            element={
              <Navigate
                to="/customer/dashboard"
                replace
              />
            }
          />

          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<CustomerDashboardPage />}
          />

          {/* Businesses */}
          <Route
            path="businesses"
            element={<CustomerBusinessesPage />}
          />

          {/* Favorites */}
          <Route
            path="favorites"
            element={<CustomerFavoritesPage />}
          />

          {/* Orders */}
          <Route
            path="orders"
            element={<CustomerOrdersPage />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<CustomerProfilePage />}
          />

        </Route>


        {/* ==================================================
            UNKNOWN ROUTE
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes