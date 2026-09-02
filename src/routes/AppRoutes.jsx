import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Public layout
import PublicLayout from '../layouts/PublicLayout'

// Public pages
import HomePage from '../pages/landing/HomePage'

// Authentication pages
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

// Customer layout
import CustomerDashboardLayout from '../layouts/customer/CustomerDashboardLayout'

// Customer pages
import CustomerDashboardPage from '../pages/customer/CustomerDashboardPage'
import CustomerBusinessesPage from '../pages/customer/CustomerBusinessesPage'
import CustomerBusinessStorefrontPage from '../pages/customer/CustomerBusinessStorefrontPage'
import CustomerFavoritesPage from '../pages/customer/CustomerFavoritesPage'
import CustomerOrdersPage from '../pages/customer/CustomerOrdersPage'
import CustomerProfilePage from '../pages/customer/CustomerProfilePage'

// Business layout
import BusinessDashboardLayout from '../layouts/business/BusinessDashboardLayout'

// Business pages
import BusinessDashboardPage from '../pages/business/BusinessDashboardPage'
import BusinessProductsPage from '../pages/business/BusinessProductsPage'
import BusinessOrdersPage from '../pages/business/BusinessOrdersPage'
import BusinessDeliveryPage from '../pages/business/BusinessDeliveryPage'
import BusinessPaymentsPage from '../pages/business/BusinessPaymentsPage'
import BusinessProfilePage from '../pages/business/BusinessProfilePage'
import BusinessNotificationsPage from '../pages/business/BusinessNotificationsPage'

// Delivery pages
import DeliveryDashboardPage from '../pages/delivery/DeliveryDashboardPage'

// Admin pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public website */}
        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<HomePage />}
          />

        </Route>

        {/* Authentication */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Customer application */}

        <Route
          path="/customer"
          element={<CustomerDashboardLayout />}
        >

          <Route
            index
            element={
              <Navigate
                to="/customer/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<CustomerDashboardPage />}
          />

          <Route
            path="businesses"
            element={<CustomerBusinessesPage />}
          />

          {/* Individual business storefront */}
          <Route
            path="businesses/:businessId"
            element={<CustomerBusinessStorefrontPage />}
          />

          <Route
            path="favorites"
            element={<CustomerFavoritesPage />}
          />

          <Route
            path="orders"
            element={<CustomerOrdersPage />}
          />

          <Route
            path="profile"
            element={<CustomerProfilePage />}
          />

        </Route>

        {/* Business application */}

        <Route
          path="/business"
          element={<BusinessDashboardLayout />}
        >

          <Route
            index
            element={
              <Navigate
                to="/business/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<BusinessDashboardPage />}
          />

          <Route
            path="products"
            element={<BusinessProductsPage />}
          />

          <Route
            path="orders"
            element={<BusinessOrdersPage />}
          />

          <Route
            path="delivery"
            element={<BusinessDeliveryPage />}
          />

          <Route
            path="payments"
            element={<BusinessPaymentsPage />}
          />

          <Route
            path="profile"
            element={<BusinessProfilePage />}
          />

          <Route
            path="notifications"
            element={<BusinessNotificationsPage />}
          />

        </Route>

        {/* Delivery application */}

        <Route
          path="/delivery"
        >

          <Route
            index
            element={
              <Navigate
                to="/delivery/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<DeliveryDashboardPage />}
          />

        </Route>

        {/* Admin application */}

        <Route
          path="/admin"
        >

          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<AdminDashboardPage />}
          />

        </Route>

        {/* Unknown routes */}

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

