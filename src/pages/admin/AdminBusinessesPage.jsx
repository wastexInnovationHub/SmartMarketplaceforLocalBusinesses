import { useMemo, useState } from 'react'
import {
  Building2,
  CheckCircle2,
  Edit,
  Eye,
  MapPin,
  Plus,
  Search,
  Trash2,
  Truck,
  UserRound,
  X,
} from 'lucide-react'

// JamiiMarket business categories
const BUSINESS_CATEGORIES = [
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

// Empty business data until the backend is connected
const initialBusinesses = []

// Empty business form
const emptyBusiness = {
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

// Business management page
function AdminBusinessesPage() {
  const [businesses, setBusinesses] =
    useState(initialBusinesses)

  const [searchTerm, setSearchTerm] =
    useState('')

  const [statusFilter, setStatusFilter] =
    useState('all')

  const [categoryFilter, setCategoryFilter] =
    useState('all')

  const [modal, setModal] =
    useState(null)

  const [selectedBusiness, setSelectedBusiness] =
    useState(null)

  const [form, setForm] =
    useState(emptyBusiness)

  // Filter businesses
  const filteredBusinesses = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim()

    return businesses.filter((business) => {
      const matchesSearch =
        !search ||
        business.businessName
          ?.toLowerCase()
          .includes(search) ||
        business.ownerName
          ?.toLowerCase()
          .includes(search) ||
        business.email
          ?.toLowerCase()
          .includes(search) ||
        business.phone
          ?.toLowerCase()
          .includes(search) ||
        business.address
          ?.toLowerCase()
          .includes(search)

      const matchesStatus =
        statusFilter === 'all' ||
        business.status === statusFilter

      const matchesCategory =
        categoryFilter === 'all' ||
        business.category === categoryFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      )
    })
  }, [
    businesses,
    searchTerm,
    statusFilter,
    categoryFilter,
  ])

  // Calculate business statistics
  const statistics = useMemo(() => {
    const total = businesses.length

    const active = businesses.filter(
      (business) =>
        business.status === 'active'
    ).length

    const inactive = businesses.filter(
      (business) =>
        business.status === 'inactive'
    ).length

    const delivery = businesses.filter(
      (business) =>
        business.deliveryAvailable
    ).length

    return {
      total,
      active,
      inactive,
      delivery,
    }
  }, [businesses])

  // Open add business modal
  const openAddModal = () => {
    setForm({
      ...emptyBusiness,
    })

    setSelectedBusiness(null)
    setModal('add')
  }

  // Open edit business modal
  const openEditModal = (business) => {
    setForm({
      businessName:
        business.businessName || '',
      ownerName:
        business.ownerName || '',
      email:
        business.email || '',
      phone:
        business.phone || '',
      category:
        business.category || '',
      address:
        business.address || '',
      description:
        business.description || '',
      openingHours:
        business.openingHours || '',
      deliveryAvailable:
        Boolean(
          business.deliveryAvailable
        ),
      pickupAvailable:
        Boolean(
          business.pickupAvailable
        ),
      status:
        business.status || 'active',
    })

    setSelectedBusiness(business)
    setModal('edit')
  }

  // Open view business modal
  const openViewModal = (business) => {
    setSelectedBusiness(business)
    setModal('view')
  }

  // Open delete confirmation
  const openDeleteModal = (business) => {
    setSelectedBusiness(business)
    setModal('delete')
  }

  // Close modal
  const closeModal = () => {
    setModal(null)
    setSelectedBusiness(null)
    setForm({
      ...emptyBusiness,
    })
  }

  // Handle text and select fields
  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  // Handle checkbox fields
  const handleCheckboxChange = (
    event
  ) => {
    const {
      name,
      checked,
    } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: checked,
    }))
  }

  // Add or edit business
  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      !form.businessName.trim() ||
      !form.ownerName.trim() ||
      !form.phone.trim() ||
      !form.category
    ) {
      return
    }

    // Add new business
    if (modal === 'add') {
      const newBusiness = {
        ...form,
        id: Date.now(),
        createdAt:
          new Date().toISOString(),
      }

      setBusinesses(
        (currentBusinesses) => [
          ...currentBusinesses,
          newBusiness,
        ]
      )

      closeModal()
      return
    }

    // Update existing business
    if (
      modal === 'edit' &&
      selectedBusiness
    ) {
      setBusinesses(
        (currentBusinesses) =>
          currentBusinesses.map(
            (business) =>
              business.id ===
              selectedBusiness.id
                ? {
                    ...business,
                    ...form,
                    updatedAt:
                      new Date().toISOString(),
                  }
                : business
          )
      )

      closeModal()
    }
  }

  // Delete business
  const handleDelete = () => {
    if (!selectedBusiness) {
      return
    }

    setBusinesses(
      (currentBusinesses) =>
        currentBusinesses.filter(
          (business) =>
            business.id !==
            selectedBusiness.id
        )
    )

    closeModal()
  }

  // Toggle business status
  const toggleBusinessStatus = (
    business
  ) => {
    setBusinesses(
      (currentBusinesses) =>
        currentBusinesses.map(
          (currentBusiness) =>
            currentBusiness.id ===
            business.id
              ? {
                  ...currentBusiness,
                  status:
                    currentBusiness.status ===
                    'active'
                      ? 'inactive'
                      : 'active',
                }
              : currentBusiness
        )
    )
  }

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Marketplace
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Business Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage local businesses registered
            on JamiiMarket.
          </p>
        </div>

        {/* Add business */}
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="h-5 w-5" />
          Add Business
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={
            <Building2 className="h-5 w-5" />
          }
          title="Total Businesses"
          value={statistics.total}
        />

        <StatCard
          icon={
            <CheckCircle2 className="h-5 w-5" />
          }
          title="Active Businesses"
          value={statistics.active}
        />

        <StatCard
          icon={
            <Building2 className="h-5 w-5" />
          }
          title="Inactive Businesses"
          value={statistics.inactive}
        />

        <StatCard
          icon={
            <Truck className="h-5 w-5" />
          }
          title="Delivery Available"
          value={statistics.delivery}
        />
      </div>

      {/* Search and filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_200px_240px]">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search businesses..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">
              All Statuses
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">
              All Categories
            </option>

            {BUSINESS_CATEGORIES.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Business list */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-bold text-slate-900">
            Registered Businesses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredBusinesses.length}{' '}
            business
            {filteredBusinesses.length === 1
              ? ''
              : 'es'}{' '}
            found
          </p>
        </div>

        {filteredBusinesses.length ===
        0 ? (
          <EmptyState
            onAddBusiness={
              openAddModal
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[950px] w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Business
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Owner
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredBusinesses.map(
                  (business) => (
                    <tr
                      key={business.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Business */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {
                              business.businessName
                            }
                          </p>

                          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="h-3.5 w-3.5" />

                            <span className="max-w-48 truncate">
                              {business.address ||
                                'No address'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <UserRound className="h-4 w-4 text-slate-400" />

                          <span className="text-sm text-slate-700">
                            {
                              business.ownerName
                            }
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                          {
                            business.category
                          }
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700">
                          {business.phone}
                        </p>

                        {business.email && (
                          <p className="mt-1 max-w-48 truncate text-xs text-slate-500">
                            {
                              business.email
                            }
                          </p>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            toggleBusinessStatus(
                              business
                            )
                          }
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            business.status ===
                            'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {business.status ===
                          'active'
                            ? 'Active'
                            : 'Inactive'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <ActionButton
                            label="View"
                            onClick={() =>
                              openViewModal(
                                business
                              )
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </ActionButton>

                          <ActionButton
                            label="Edit"
                            onClick={() =>
                              openEditModal(
                                business
                              )
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </ActionButton>

                          <ActionButton
                            label="Delete"
                            danger
                            onClick={() =>
                              openDeleteModal(
                                business
                              )
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </ActionButton>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add business modal */}
      {(modal === 'add' ||
        modal === 'edit') && (
        <Modal
          title={
            modal === 'add'
              ? 'Add Business'
              : 'Edit Business'
          }
          onClose={closeModal}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Business name */}
              <FormField
                label="Business Name"
                required
              >
                <input
                  type="text"
                  name="businessName"
                  value={
                    form.businessName
                  }
                  onChange={handleChange}
                  placeholder="Enter business name"
                  required
                  className="input-field"
                />
              </FormField>

              {/* Owner */}
              <FormField
                label="Owner Name"
                required
              >
                <input
                  type="text"
                  name="ownerName"
                  value={
                    form.ownerName
                  }
                  onChange={handleChange}
                  placeholder="Enter owner name"
                  required
                  className="input-field"
                />
              </FormField>

              {/* Email */}
              <FormField label="Email">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="business@example.com"
                  className="input-field"
                />
              </FormField>

              {/* Phone */}
              <FormField
                label="Phone"
                required
              >
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="input-field"
                />
              </FormField>

              {/* Category */}
              <FormField
                label="Category"
                required
              >
                <select
                  name="category"
                  value={
                    form.category
                  }
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">
                    Select category
                  </option>

                  {BUSINESS_CATEGORIES.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </FormField>

              {/* Opening hours */}
              <FormField label="Opening Hours">
                <input
                  type="text"
                  name="openingHours"
                  value={
                    form.openingHours
                  }
                  onChange={handleChange}
                  placeholder="e.g. Mon-Sat 08:00-20:00"
                  className="input-field"
                />
              </FormField>
            </div>

            {/* Address */}
            <FormField label="Business Address">
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter business location"
                className="input-field"
              />
            </FormField>

            {/* Description */}
            <FormField label="Description">
              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={handleChange}
                rows={4}
                placeholder="Describe the business..."
                className="input-field resize-none"
              />
            </FormField>

            {/* Delivery and pickup */}
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-800">
                Available Services
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
                  <input
                    type="checkbox"
                    name="deliveryAvailable"
                    checked={
                      form.deliveryAvailable
                    }
                    onChange={
                      handleCheckboxChange
                    }
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Delivery Available
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      This business can provide
                      its own delivery.
                    </p>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
                  <input
                    type="checkbox"
                    name="pickupAvailable"
                    checked={
                      form.pickupAvailable
                    }
                    onChange={
                      handleCheckboxChange
                    }
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Pickup Available
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Customers can collect
                      orders from the business.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Status */}
            <FormField label="Status">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-field"
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </FormField>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />

                {modal === 'add'
                  ? 'Add Business'
                  : 'Save Changes'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View business modal */}
      {modal === 'view' &&
        selectedBusiness && (
          <Modal
            title="Business Details"
            onClose={closeModal}
          >
            <div className="space-y-5">
              <div className="rounded-2xl bg-indigo-50 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                    <Building2 className="h-7 w-7" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {
                        selectedBusiness.businessName
                      }
                    </h2>

                    <p className="mt-1 text-sm text-indigo-700">
                      {
                        selectedBusiness.category
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem
                  label="Owner"
                  value={
                    selectedBusiness.ownerName
                  }
                />

                <DetailItem
                  label="Phone"
                  value={
                    selectedBusiness.phone
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
                  label="Status"
                  value={
                    selectedBusiness.status ===
                    'active'
                      ? 'Active'
                      : 'Inactive'
                  }
                />

                <DetailItem
                  label="Address"
                  value={
                    selectedBusiness.address ||
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
              </div>

              <DetailItem
                label="Description"
                value={
                  selectedBusiness.description ||
                  'No description provided.'
                }
              />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Available Services
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedBusiness.deliveryAvailable && (
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      Delivery Available
                    </span>
                  )}

                  {selectedBusiness.pickupAvailable && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Pickup Available
                    </span>
                  )}

                  {!selectedBusiness.deliveryAvailable &&
                    !selectedBusiness.pickupAvailable && (
                      <span className="text-sm text-slate-500">
                        No delivery or pickup option
                        configured.
                      </span>
                    )}
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}

      {/* Delete confirmation */}
      {modal === 'delete' &&
        selectedBusiness && (
          <Modal
            title="Delete Business"
            onClose={closeModal}
          >
            <div className="space-y-5">
              <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="flex gap-3">
                  <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                  <div>
                    <p className="font-semibold text-red-900">
                      Delete{' '}
                      {
                        selectedBusiness.businessName
                      }
                      ?
                    </p>

                    <p className="mt-1 text-sm leading-6 text-red-700">
                      This removes the business from
                      the current frontend state.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Business
                </button>
              </div>
            </div>
          </Modal>
        )}
    </section>
  )
}

// Statistics card
function StatCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>
    </div>
  )
}

// Empty business state
function EmptyState({
  onAddBusiness,
}) {
  return (
    <div className="p-10 text-center sm:p-14">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Building2 className="h-8 w-8" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-800">
        No businesses found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        There are currently no businesses in the
        frontend data list. Add a business to
        begin testing the management interface.
      </p>

      <button
        type="button"
        onClick={onAddBusiness}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        <Plus className="h-5 w-5" />
        Add Business
      </button>
    </div>
  )
}

// Modal wrapper
function Modal({
  title,
  onClose,
  children,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="max-h-[calc(90vh-73px)] overflow-y-auto p-5 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Form field wrapper
function FormField({
  label,
  required = false,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  )
}

// Detail item
function DetailItem({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm leading-6 text-slate-700">
        {value}
      </p>
    </div>
  )
}

// Action button
function ActionButton({
  label,
  children,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`rounded-lg p-2 transition ${
        danger
          ? 'text-red-500 hover:bg-red-50 hover:text-red-700'
          : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
      }`}
    >
      {children}
    </button>
  )
}

export default AdminBusinessesPage

