# JamiiMarket - Smart Marketplace for Local Businesses

JamiiMarket is a web-based smart marketplace designed to connect customers with local businesses. The platform allows customers to discover businesses, view products and services, place orders, and interact with delivery services.

The system provides separate interfaces for customers, businesses, delivery personnel, and administrators.

## Project Team

| No. | Role                  | Name              |
| --- | --------------------- | ----------------- |
| 1   | Frontend Developer    | Khadija Ali Saidi |
| 2   | Backend Developer     | To Be Added       |
| 3   | AI Integration        | To Be Added       |
| 4   | Tester and Researcher | To Be Added       |

## Main Objectives

* Connect customers with local businesses through one marketplace.
* Allow businesses to manage their products and services.
* Allow customers to browse products and place orders.
* Support delivery management.
* Provide administrators with platform management tools.
* Support English and Kiswahili.
* Provide a foundation for future AI-powered marketplace features.
* Maintain an honest interface without displaying fake statistics or fake transactions.

## User Roles

### Customer

Customers can:

* Create an account and log in.
* Browse local businesses.
* View business storefronts.
* View products and services.
* Add products to favorites.
* Place orders.
* View order history.
* Manage their profile.

### Business

Businesses can:

* Manage their business profile.
* Add and manage products.
* Manage services.
* Receive customer orders.
* Confirm and prepare orders.
* Manage delivery requests.
* View payment information.
* Manage notifications and settings.

### Delivery

Delivery personnel can:

* View available deliveries.
* Accept delivery requests.
* View assigned deliveries.
* Collect orders from businesses.
* Deliver orders to customers.
* Update delivery status.
* View delivery history.
* View earnings.

### Administrator

Administrators can:

* Manage users.
* Manage businesses.
* Manage products.
* Monitor orders.
* Monitor deliveries.
* View payment information.
* Manage administrators.
* View system activity.
* Manage administrator profile.
* Configure system settings.

## Application Flow

Customer flow:

Customer → Browse Businesses → Select Business → View Product → Cart → Checkout → Place Order → Order Tracking → Completion

Business flow:

Business → Receive Order → Confirm Order → Prepare Order → Customer Pickup or Delivery → Complete Order

Delivery flow:

Delivery Personnel → Available Deliveries → Accept Delivery → Collect Order → Deliver Order → Confirm Delivery → Completed

Admin flow:

Administrator → Dashboard → Users / Businesses / Products / Orders / Deliveries / Payments / Administration / Activity / Settings

## Payment Model

The initial version of JamiiMarket focuses on allowing customers to pay businesses directly.

The initial payment option is:

Pay at Business

Online payment integration can be added in a future version.

The platform can later generate revenue through:

* Business subscriptions.
* Premium business tools.
* Sponsored business listings.
* Online transaction fees.
* Delivery or service fees where applicable.

No revenue figures should be displayed unless they are provided by real backend data.

## Project Structure

```text
SmartMarketplaceforLocalBusinesses/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── business/
│   │   ├── customer/
│   │   ├── delivery/
│   │   ├── marketplace/
│   │   └── common/
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   ├── customer/
│   │   │   └── CustomerDashboardLayout.jsx
│   │   ├── business/
│   │   │   └── BusinessDashboardLayout.jsx
│   │   ├── delivery/
│   │   │   └── DeliveryDashboardLayout.jsx
│   │   └── admin/
│   │       └── AdminDashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── landing/
│   │   │   └── HomePage.jsx
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── customer/
│   │   ├── business/
│   │   ├── delivery/
│   │   └── admin/
│   │
│   ├── services/
│   │   └── api/
│   │       ├── apiClient.js
│   │       ├── authApi.js
│   │       ├── customerApi.js
│   │       ├── businessApi.js
│   │       ├── productApi.js
│   │       ├── orderApi.js
│   │       ├── deliveryApi.js
│   │       ├── paymentApi.js
│   │       └── adminApi.js
│   │
│   ├── i18n/
│   │   ├── LanguageContext.jsx
│   │   └── translations.js
│   │
│   ├── utils/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── formatters.js
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleRoute.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Frontend Architecture

The frontend is organized into:

* Pages - application screens.
* Components - reusable UI elements.
* Layouts - dashboard and public page structures.
* Routes - application navigation.
* Services - communication with the backend.
* Utils - reusable helper functions.
* i18n - English and Kiswahili language support.

The general architecture is:

Frontend Page → Component → API Service → Backend API → Database

## Main Routes

### Public

* `/`
* `/login`
* `/register`

### Customer

* `/customer/dashboard`
* `/customer/businesses`
* `/customer/businesses/:businessId`
* `/customer/favorites`
* `/customer/orders`
* `/customer/profile`

### Business

* `/business/dashboard`
* `/business/products`
* `/business/orders`
* `/business/delivery`
* `/business/payments`
* `/business/profile`
* `/business/notifications`
* `/business/settings`

### Delivery

* `/delivery/dashboard`
* `/delivery/available`
* `/delivery/my-deliveries`
* `/delivery/active`
* `/delivery/history`
* `/delivery/earnings`
* `/delivery/notifications`
* `/delivery/profile`

### Admin

* `/admin/dashboard`
* `/admin/users`
* `/admin/businesses`
* `/admin/products`
* `/admin/orders`
* `/admin/deliveries`
* `/admin/payments`
* `/admin/management`
* `/admin/activity`
* `/admin/profile`
* `/admin/settings`

## Planned Customer Features

The following features are planned for future development:

* Shopping cart.
* Checkout.
* Order details.
* Customer notifications.
* Customer settings.
* Online payments.
* Order tracking.
* Product reviews.
* Business ratings.
* Advanced search.

## Internationalization

JamiiMarket supports:

* English
* Kiswahili

Language management is handled through the internationalization system in:

`src/i18n/`

## Data Integrity

JamiiMarket follows an important development principle:

**Do not display fake information as real information.**

Dashboard statistics such as:

* Total users.
* Total businesses.
* Total products.
* Total orders.
* Revenue.
* Payments.
* Deliveries.
* Activity records.

must come from real backend/database data.

When data is unavailable, the application should display an appropriate empty state instead of invented numbers.

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* Tailwind CSS
* Lucide React

### Backend

The backend will provide:

* Authentication.
* User management.
* Business management.
* Product management.
* Order management.
* Delivery management.
* Payment services.
* Admin services.
* Database integration.

### Database

The system will use a relational database for storing application data.

## Future Development

Future versions of JamiiMarket may include:

* Online payment gateways.
* AI-powered recommendations.
* AI marketplace assistant.
* Business analytics.
* Advanced search.
* Product recommendations.
* Customer reviews and ratings.
* Real-time notifications.
* Business subscriptions.
* Sponsored listings.
* Advanced delivery tracking.
* Mobile application.

## Development Principle

JamiiMarket is being developed progressively.

The frontend is designed so that backend services can be integrated without requiring major changes to the user interface architecture.

The final system will connect:

Frontend → Backend → Database

while maintaining role-based access for:

Customer → Business → Delivery → Administrator

## Project Status

The project is currently under active development.

Current development focuses on:

* Frontend structure.
* User interfaces.
* Dashboard layouts.
* Marketplace pages.
* Admin management.
* English/Kiswahili support.
* Application routing.

Backend integration and advanced marketplace functionality will be implemented progressively.
