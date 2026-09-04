import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

// Public layout
import PublicLayout from '../layouts/PublicLayout'

// Public pages
import HomePage from '../pages/landing/HomePage'

// Authentication pages
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'

// Legal pages
import PrivacyPolicyPage from '../pages/legal/PrivacyPolicyPage'
import TermsOfServicePage from '../pages/legal/TermsOfServicePage'

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
import BusinessSettingsPage from '../pages/business/BusinessSettingsPage'

// Delivery layout
import DeliveryDashboardLayout from '../layouts/delivery/DeliveryDashboardLayout'

// Delivery pages
import DeliveryDashboardPage from '../pages/delivery/DeliveryDashboardPage'
import AvailableDeliveriesPage from '../pages/delivery/AvailableDeliveriesPage'
import MyDeliveriesPage from '../pages/delivery/MyDeliveriesPage'
import ActiveDeliveryPage from '../pages/delivery/ActiveDeliveryPage'
import DeliveryHistoryPage from '../pages/delivery/DeliveryHistoryPage'
import DeliveryEarningsPage from '../pages/delivery/DeliveryEarningsPage'
import DeliveryNotificationsPage from '../pages/delivery/DeliveryNotificationsPage'
import DeliveryProfilePage from '../pages/delivery/DeliveryProfilePage'

// Admin layout
import AdminDashboardLayout from '../layouts/admin/AdminDashboardLayout'

// Admin pages
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import AdminUsersPage from '../pages/admin/AdminUsersPage'
import AdminBusinessesPage from '../pages/admin/AdminBusinessesPage'
import AdminProductsPage from '../pages/admin/AdminProductsPage'
import AdminOrdersPage from '../pages/admin/AdminOrdersPage'
import AdminDeliveriesPage from '../pages/admin/AdminDeliveriesPage'
import AdminPaymentsPage from '../pages/admin/AdminPaymentsPage'
import AdminManagementPage from '../pages/admin/AdminManagementPage'
import AdminActivityPage from '../pages/admin/AdminActivityPage'
import AdminProfilePage from '../pages/admin/AdminProfilePage'
import AdminSettingsPage from '../pages/admin/AdminSettingsPage'

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

        {/* Legal pages */}
        <Route
          path="/privacy"
          element={<PrivacyPolicyPage />}
        />

        <Route
          path="/terms"
          element={<TermsOfServicePage />}
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

          <Route
            path="settings"
            element={<BusinessSettingsPage />}
          />
        </Route>

        {/* Delivery application */}
        <Route
          path="/delivery"
          element={<DeliveryDashboardLayout />}
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

          <Route
            path="available"
            element={<AvailableDeliveriesPage />}
          />

          <Route
            path="my-deliveries"
            element={<MyDeliveriesPage />}
          />

          <Route
            path="active"
            element={<ActiveDeliveryPage />}
          />

          <Route
            path="history"
            element={<DeliveryHistoryPage />}
          />

          <Route
            path="earnings"
            element={<DeliveryEarningsPage />}
          />

          <Route
            path="notifications"
            element={<DeliveryNotificationsPage />}
          />

          <Route
            path="profile"
            element={<DeliveryProfilePage />}
          />
        </Route>

        {/* Admin application */}
        <Route
          path="/admin"
          element={<AdminDashboardLayout />}
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

          <Route
            path="users"
            element={<AdminUsersPage />}
          />

          <Route
            path="businesses"
            element={<AdminBusinessesPage />}
          />

          <Route
            path="products"
            element={<AdminProductsPage />}
          />

          <Route
            path="orders"
            element={<AdminOrdersPage />}
          />

          <Route
            path="deliveries"
            element={<AdminDeliveriesPage />}
          />

          <Route
            path="payments"
            element={<AdminPaymentsPage />}
          />

          <Route
            path="management"
            element={<AdminManagementPage />}
          />

          <Route
            path="activity"
            element={<AdminActivityPage />}
          />

          <Route
            path="profile"
            element={<AdminProfilePage />}
          />

          <Route
            path="settings"
            element={<AdminSettingsPage />}
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

