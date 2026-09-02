import { useMemo, useState } from 'react'
import {
  Building2,
  CheckCircle2,
  Eye,
  MapPin,
  Pencil,
  Plus,
  Search,
  Store,
  Trash2,
  User,
  XCircle,
} from 'lucide-react'

// Empty by design until businesses come from the backend.
const initialBusinesses = []

const businessCategories = [
  'Groceries',
  'Food & Restaurants',
  'Fashion & Clothing',
  'Beauty & Personal Care',
  'Electronics',
  'Phones & Accessories',
  'Home & Furniture',
  'Health & Wellness',
  'Books & Education',
  'Crafts & Handmade',
  'Agriculture',
  'Fish & Seafood',
  'Construction & Hardware',
  'Automotive',
  'Technology & Digital Services',
  'Professional Services',
  'Cleaning Services',
  'Transport & Delivery',
  'Accommodation',
  'Events & Entertainment',
  'Other',
]

const emptyForm = {
  businessName: '',
  ownerName: '',
  email: '',
  phone: '',
  category: '',
  address: '',
  description: '',
  openingHours: '',
  deliveryAvailable: false,
  pickupAvailable: false,
  status: 'active',
}

// Business Management page
function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState(initialBusinesses)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [editingBusiness, setEditingBusiness] = useState(null)
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [businessToDelete, setBusinessToDelete] = useState(null)

  const [form, setForm] = useState(emptyForm)

  // Filter businesses based on search and selected filters
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const searchValue = search.trim().toLowerCase()

      const matchesSearch =
        !searchValue ||
        business.businessName?.toLowerCase().includes(searchValue) ||
        business.ownerName?.toLowerCase().includes(searchValue) ||
        business.email?.toLowerCase().includes(searchValue) ||
        business.phone?.toLowerCase().includes(searchValue)

      const matchesStatus =
        statusFilter === 'all' ||
        business.status === statusFilter

      const matchesCategory =
        categoryFilter === 'all' ||
        business.category === categoryFilter

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [businesses, search, statusFilter, categoryFilter])

  // Open the add business modal
  const openAddModal = () => {
    setEditingBusiness(null)
    setForm(emptyForm)
    setShowFormModal(true)
  }

  // Open the edit business modal
  const openEditModal = (business) => {
    setEditingBusiness(business)

    setForm({
      businessName: business.businessName || '',
      ownerName: business.ownerName || '',
      email: business.email || '',
      phone: business.phone || '',
      category: business.category || '',
      address: business.address || '',
      description: business.description || '',
      openingHours: business.openingHours || '',
      deliveryAvailable: Boolean(business.deliveryAvailable),
      pickupAvailable: Boolean(business.pickupAvailable),
      status: business.status || 'active',
    })

    setShowFormModal(true)
  }

  // Open the business details modal
  const openDetailsModal = (business) => {
    setSelectedBusiness(business)
    setShowDetailsModal(true)
  }

  // Open the delete confirmation modal
  const openDeleteModal = (business) => {
    setBusinessToDelete(business)
    setShowDeleteModal(true)
  }

  // Update form fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Create or update a business
  const handleSubmit = (event) => {
    event.preventDefault()

    if (editingBusiness) {
      setBusinesses((currentBusinesses) =>
        currentBusinesses.map((business) =>
          business.id === editingBusiness.id
            ? {
                ...business,
                ...form,
              }
            : business,
        ),
      )
    } else {
      const newBusiness = {
        id: Date.now(),
        ...form,
        createdAt: new Date().toISOString(),
      }

      setBusinesses((currentBusinesses) => [
        newBusiness,
        ...currentBusinesses,
      ])
    }

    setShowFormModal(false)
    setEditingBusiness(null)
    setForm(emptyForm)
  }

  // Toggle business active/inactive status
  const toggleStatus = (business) => {
    setBusinesses((currentBusinesses) =>
      currentBusinesses.map((item) =>
        item.id === business.id
          ? {
              ...item,
              status:
                item.status === 'active'
                  ? 'inactive'
                  : 'active',
            }
          : item,
      ),
    )
  }

  // Delete a business
  const confirmDelete = () => {
    if (!businessToDelete) {
      return
    }

    setBusinesses((currentBusinesses) =>
      currentBusinesses.filter(
        (business) => business.id !== businessToDelete.id,
      ),
    )

    setBusinessToDelete(null)
    setShowDeleteModal(false)
  }

  // Business statistics
  const totalBusinesses = businesses.length
  const activeBusinesses = businesses.filter(
    (business) => business.status === 'active',
  ).length
  const inactiveBusinesses = businesses.filter(
    (business) => business.status === 'inactive',
  ).length

  const deliveryBusinesses = businesses.filter(
    (business) => business.deliveryAvailable,
  ).length

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
            <Building2 className="h-4 w-4" />
            Marketplace Management
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Business Management
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Manage local businesses, storefront information,
            availability, and marketplace access.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Business
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Building2}
          label="Total Businesses"
          value={totalBusinesses}
        />

        <StatCard
          icon={CheckCircle2}
          label="Active Businesses"
          value={activeBusinesses}
        />

        <StatCard
          icon={XCircle}
          label="Inactive Businesses"
          value={inactiveBusinesses}
        />

        <StatCard
          icon={Store}
          label="Delivery Available"
          value={deliveryBusinesses}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative md:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search business, owner, email..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Categories</option>

            {businessCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Business table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Registered Businesses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredBusinesses.length} business
            {filteredBusinesses.length === 1 ? '' : 'es'} shown.
          </p>
        </div>

        {filteredBusinesses.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <Building2 className="h-8 w-8 text-indigo-500" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              No businesses found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are currently no businesses available in the
              admin portal, or no businesses match your search and
              filters.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add Business
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Business</th>
                  <th className="px-5 py-4">Owner</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredBusinesses.map((business) => (
                  <tr
                    key={business.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          <Building2 className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {business.businessName}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {business.address || 'No address'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {business.ownerName || 'Not provided'}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {business.category || 'Not provided'}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">
                        {business.phone || 'No phone'}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {business.email || 'No email'}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(business)}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          business.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {business.status === 'active'
                          ? 'Active'
                          : 'Inactive'}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <ActionButton
                          title="View business"
                          onClick={() =>
                            openDetailsModal(business)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </ActionButton>

                        <ActionButton
                          title="Edit business"
                          onClick={() =>
                            openEditModal(business)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </ActionButton>

                        <ActionButton
                          title={
                            business.status === 'active'
                              ? 'Deactivate business'
                              : 'Activate business'
                          }
                          onClick={() =>
                            toggleStatus(business)
                          }
                        >
                          {business.status === 'active' ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </ActionButton>

                        <ActionButton
                          title="Delete business"
                          onClick={() =>
                            openDeleteModal(business)
                          }
                          danger
                        >
                          <Trash2 className="h-4 w-4" />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit business modal */}
      {showFormModal && (
        <Modal
          title={
            editingBusiness
              ? 'Edit Business'
              : 'Add Business'
          }
          onClose={() => setShowFormModal(false)}
          wide
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                label="Business Name"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Enter business name"
                required
              />

              <FormField
                label="Owner Name"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
              />

              <FormField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="business@example.com"
              />

              <FormField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">
                    Select category
                  </option>

                  {businessCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <FormField
                label="Opening Hours"
                name="openingHours"
                value={form.openingHours}
                onChange={handleChange}
                placeholder="Example: Mon-Sat, 8:00 AM - 8:00 PM"
              />

              <div className="md:col-span-2">
                <FormField
                  label="Business Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter business location/address"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the business..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-800">
                Business Services
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                  <input
                    type="checkbox"
                    name="deliveryAvailable"
                    checked={form.deliveryAvailable}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <span className="text-sm text-slate-700">
                    Business offers delivery
                  </span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                  <input
                    type="checkbox"
                    name="pickupAvailable"
                    checked={form.pickupAvailable}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <span className="text-sm text-slate-700">
                    Customer pickup available
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowFormModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {editingBusiness
                  ? 'Save Changes'
                  : 'Create Business'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Business details modal */}
      {showDetailsModal && selectedBusiness && (
        <Modal
          title="Business Details"
          onClose={() => setShowDetailsModal(false)}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Building2 className="h-7 w-7" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {selectedBusiness.businessName}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedBusiness.category || 'Category not provided'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem
                icon={User}
                label="Owner"
                value={
                  selectedBusiness.ownerName ||
                  'Not provided'
                }
              />

              <DetailItem
                icon={MapPin}
                label="Address"
                value={
                  selectedBusiness.address ||
                  'Not provided'
                }
              />

              <DetailItem
                label="Email"
                value={
                  selectedBusiness.email ||
                  'Not provided'
                }
              />

              <DetailItem
                label="Phone"
                value={
                  selectedBusiness.phone ||
                  'Not provided'
                }
              />

              <DetailItem
                label="Opening Hours"
                value={
                  selectedBusiness.openingHours ||
                  'Not provided'
                }
              />

              <DetailItem
                label="Status"
                value={
                  selectedBusiness.status === 'active'
                    ? 'Active'
                    : 'Inactive'
                }
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Description
              </p>

              <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {selectedBusiness.description ||
                  'No business description provided.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ServiceStatus
                label="Business Delivery"
                enabled={
                  selectedBusiness.deliveryAvailable
                }
              />

              <ServiceStatus
                label="Customer Pickup"
                enabled={
                  selectedBusiness.pickupAvailable
                }
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && businessToDelete && (
        <Modal
          title="Delete Business"
          onClose={() => setShowDeleteModal(false)}
        >
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Delete this business?
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You are about to delete{' '}
              <span className="font-semibold text-slate-700">
                {businessToDelete.businessName}
              </span>
              . This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Business
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// Statistics card
function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

// Reusable action button
function ActionButton({
  children,
  title,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
        danger
          ? 'border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600'
          : 'border-slate-200 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
      }`}
    >
      {children}
    </button>
  )
}

// Reusable form field
function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  )
}

// Reusable details item
function DetailItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </div>

      <p className="mt-2 text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  )
}

// Business service availability indicator
function ServiceStatus({ label, enabled }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      {enabled ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Available
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
          <XCircle className="h-3.5 w-3.5" />
          Not available
        </span>
      )}
    </div>
  )
}

// Reusable modal
function Modal({
  title,
  children,
  onClose,
  wide = false,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div
        className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${
          wide ? 'max-w-3xl' : 'max-w-xl'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminBusinessesPage

