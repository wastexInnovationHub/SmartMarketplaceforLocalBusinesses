import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  Eye,
  Package,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Wrench,
  X,
  XCircle,
} from 'lucide-react'

// Empty until products and services come from the backend.
const initialListings = []

const categories = [
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

const productUnits = [
  'piece',
  'kg',
  'g',
  'litre',
  'ml',
  'metre',
  'pack',
  'box',
]

const emptyForm = {
  name: '',
  businessName: '',
  description: '',
  category: '',
  itemType: 'product',
  unit: 'piece',
  price: '',
  pricingType: 'per_item',
  stock: '',
  lowStockThreshold: '',
  status: 'active',
}

// Admin Products & Services Management page
function AdminProductsPage() {
  const [listings, setListings] = useState(initialListings)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const [showFormModal, setShowFormModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [editingListing, setEditingListing] = useState(null)
  const [selectedListing, setSelectedListing] = useState(null)
  const [listingToDelete, setListingToDelete] = useState(null)

  const [form, setForm] = useState(emptyForm)

  // Filter listings using the search and selected filters
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const searchValue = search.trim().toLowerCase()

      const matchesSearch =
        !searchValue ||
        listing.name?.toLowerCase().includes(searchValue) ||
        listing.businessName?.toLowerCase().includes(searchValue) ||
        listing.category?.toLowerCase().includes(searchValue)

      const matchesType =
        typeFilter === 'all' ||
        listing.itemType === typeFilter

      const matchesCategory =
        categoryFilter === 'all' ||
        listing.category === categoryFilter

      const matchesStatus =
        statusFilter === 'all' ||
        listing.status === statusFilter

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesStatus
      )
    })
  }, [
    listings,
    search,
    typeFilter,
    categoryFilter,
    statusFilter,
  ])

  // Open the add listing modal
  const openAddModal = () => {
    setEditingListing(null)
    setForm(emptyForm)
    setShowFormModal(true)
  }

  // Open the edit listing modal
  const openEditModal = (listing) => {
    setEditingListing(listing)

    setForm({
      name: listing.name || '',
      businessName: listing.businessName || '',
      description: listing.description || '',
      category: listing.category || '',
      itemType: listing.itemType || 'product',
      unit: listing.unit || 'piece',
      price: listing.price || '',
      pricingType: listing.pricingType || 'per_item',
      stock: listing.stock ?? '',
      lowStockThreshold: listing.lowStockThreshold ?? '',
      status: listing.status || 'active',
    })

    setShowFormModal(true)
  }

  // Open listing details
  const openDetailsModal = (listing) => {
    setSelectedListing(listing)
    setShowDetailsModal(true)
  }

  // Open delete confirmation
  const openDeleteModal = (listing) => {
    setListingToDelete(listing)
    setShowDeleteModal(true)
  }

  // Update form values
  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  // Create or update a listing
  const handleSubmit = (event) => {
    event.preventDefault()

    if (editingListing) {
      setListings((currentListings) =>
        currentListings.map((listing) =>
          listing.id === editingListing.id
            ? {
                ...listing,
                ...form,
              }
            : listing,
        ),
      )
    } else {
      const newListing = {
        id: Date.now(),
        ...form,
        createdAt: new Date().toISOString(),
      }

      setListings((currentListings) => [
        newListing,
        ...currentListings,
      ])
    }

    setShowFormModal(false)
    setEditingListing(null)
    setForm(emptyForm)
  }

  // Activate or deactivate a listing
  const toggleStatus = (listing) => {
    setListings((currentListings) =>
      currentListings.map((item) =>
        item.id === listing.id
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

  // Delete a listing
  const confirmDelete = () => {
    if (!listingToDelete) {
      return
    }

    setListings((currentListings) =>
      currentListings.filter(
        (listing) => listing.id !== listingToDelete.id,
      ),
    )

    setListingToDelete(null)
    setShowDeleteModal(false)
  }

  // Listing statistics
  const totalListings = listings.length

  const totalProducts = listings.filter(
    (listing) => listing.itemType === 'product',
  ).length

  const totalServices = listings.filter(
    (listing) => listing.itemType === 'service',
  ).length

  const activeListings = listings.filter(
    (listing) => listing.status === 'active',
  ).length

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
            <Package className="h-4 w-4" />
            Marketplace Management
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Products & Services
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Manage marketplace products and services listed by
            local businesses.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Listing
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Package}
          label="Total Listings"
          value={totalListings}
        />

        <StatCard
          icon={ShoppingBag}
          label="Products"
          value={totalProducts}
        />

        <StatCard
          icon={Wrench}
          label="Services"
          value={totalServices}
        />

        <StatCard
          icon={CheckCircle2}
          label="Active Listings"
          value={activeListings}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product, service, business..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Types</option>
            <option value="product">Products</option>
            <option value="service">Services</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Listings table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">
            Marketplace Listings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredListings.length} listing
            {filteredListings.length === 1 ? '' : 's'} shown.
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <Package className="h-8 w-8 text-indigo-500" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              No products or services found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are currently no marketplace listings, or
              no listings match your search and filters.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add Listing
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">Listing</th>
                  <th className="px-5 py-4">Business</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredListings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                          {listing.itemType === 'service' ? (
                            <Wrench className="h-5 w-5" />
                          ) : (
                            <Package className="h-5 w-5" />
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {listing.name}
                          </p>

                          <p className="mt-0.5 max-w-xs truncate text-xs text-slate-500">
                            {listing.description ||
                              'No description'}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {listing.businessName ||
                        'Not provided'}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          listing.itemType === 'service'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {listing.itemType === 'service'
                          ? 'Service'
                          : 'Product'}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {listing.category || 'Not provided'}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {listing.price
                        ? `TSh ${listing.price}`
                        : 'Not provided'}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          toggleStatus(listing)
                        }
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          listing.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {listing.status === 'active'
                          ? 'Active'
                          : 'Inactive'}
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <ActionButton
                          title="View listing"
                          onClick={() =>
                            openDetailsModal(listing)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </ActionButton>

                        <ActionButton
                          title="Edit listing"
                          onClick={() =>
                            openEditModal(listing)
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </ActionButton>

                        <ActionButton
                          title={
                            listing.status === 'active'
                              ? 'Deactivate listing'
                              : 'Activate listing'
                          }
                          onClick={() =>
                            toggleStatus(listing)
                          }
                        >
                          {listing.status === 'active' ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </ActionButton>

                        <ActionButton
                          title="Delete listing"
                          onClick={() =>
                            openDeleteModal(listing)
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

      {/* Add/Edit listing modal */}
      {showFormModal && (
        <Modal
          title={
            editingListing
              ? 'Edit Product or Service'
              : 'Add Product or Service'
          }
          onClose={() => setShowFormModal(false)}
          wide
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product or service name"
                required
              />

              <FormField
                label="Business Name"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Enter business name"
                required
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Listing Type
                </label>

                <select
                  name="itemType"
                  value={form.itemType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                </select>
              </div>

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

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Pricing Type
                </label>

                <select
                  name="pricingType"
                  value={form.pricingType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {form.itemType === 'service' ? (
                    <>
                      <option value="per_service">
                        Per Service
                      </option>
                      <option value="per_hour">
                        Per Hour
                      </option>
                    </>
                  ) : (
                    <option value="per_item">
                      Per Item
                    </option>
                  )}
                </select>
              </div>

              <FormField
                label="Price (TSh)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />

              {form.itemType === 'product' ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Unit
                    </label>

                    <select
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      {productUnits.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  <FormField
                    label="Stock"
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Current stock"
                  />

                  <FormField
                    label="Low Stock Threshold"
                    name="lowStockThreshold"
                    type="number"
                    value={form.lowStockThreshold}
                    onChange={handleChange}
                    placeholder="Alert threshold"
                  />
                </>
              ) : null}

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

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the product or service..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
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
                {editingListing
                  ? 'Save Changes'
                  : 'Create Listing'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Listing details modal */}
      {showDetailsModal && selectedListing && (
        <Modal
          title="Listing Details"
          onClose={() => setShowDetailsModal(false)}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                {selectedListing.itemType === 'service' ? (
                  <Wrench className="h-7 w-7" />
                ) : (
                  <Package className="h-7 w-7" />
                )}
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {selectedListing.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedListing.itemType === 'service'
                    ? 'Service'
                    : 'Product'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DetailItem
                label="Business"
                value={
                  selectedListing.businessName ||
                  'Not provided'
                }
              />

              <DetailItem
                label="Category"
                value={
                  selectedListing.category ||
                  'Not provided'
                }
              />

              <DetailItem
                label="Price"
                value={
                  selectedListing.price
                    ? `TSh ${selectedListing.price}`
                    : 'Not provided'
                }
              />

              <DetailItem
                label="Pricing Type"
                value={
                  selectedListing.pricingType ||
                  'Not provided'
                }
              />

              <DetailItem
                label="Unit"
                value={
                  selectedListing.itemType === 'product'
                    ? selectedListing.unit ||
                      'Not provided'
                    : 'Not applicable'
                }
              />

              <DetailItem
                label="Stock"
                value={
                  selectedListing.itemType === 'product'
                    ? selectedListing.stock || '0'
                    : 'Not applicable'
                }
              />

              <DetailItem
                label="Low Stock Threshold"
                value={
                  selectedListing.itemType === 'product'
                    ? selectedListing.lowStockThreshold ||
                      'Not set'
                    : 'Not applicable'
                }
              />

              <DetailItem
                label="Status"
                value={
                  selectedListing.status === 'active'
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
                {selectedListing.description ||
                  'No description provided.'}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && listingToDelete && (
        <Modal
          title="Delete Listing"
          onClose={() => setShowDeleteModal(false)}
        >
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Delete this listing?
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You are about to delete{' '}
              <span className="font-semibold text-slate-700">
                {listingToDelete.name}
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
                Delete Listing
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
function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-800">
        {value}
      </p>
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

export default AdminProductsPage

