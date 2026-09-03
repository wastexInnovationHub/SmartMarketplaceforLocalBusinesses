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
import { useLanguage } from '../../i18n/LanguageContext'

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
const { language } = useLanguage()

const text = {
en: {
marketplaceManagement: 'Marketplace Management',
productsServices: 'Products & Services',
pageDescription:
'Manage marketplace products and services listed by local businesses.',
addListing: 'Add Listing',


  totalListings: 'Total Listings',
  products: 'Products',
  services: 'Services',
  activeListings: 'Active Listings',

  searchPlaceholder:
    'Search product, service, business...',
  allTypes: 'All Types',
  allCategories: 'All Categories',
  allStatuses: 'All Statuses',
  product: 'Product',
  service: 'Service',
  active: 'Active',
  inactive: 'Inactive',

  marketplaceListings: 'Marketplace Listings',
  listingShown: 'listing shown.',
  listingsShown: 'listings shown.',
  noProductsServices:
    'No products or services found',
  noProductsServicesDescription:
    'There are currently no marketplace listings, or no listings match your search and filters.',

  listing: 'Listing',
  business: 'Business',
  type: 'Type',
  category: 'Category',
  price: 'Price',
  status: 'Status',
  noDescription: 'No description',
  notProvided: 'Not provided',

  viewListing: 'View listing',
  editListing: 'Edit listing',
  deactivateListing: 'Deactivate listing',
  activateListing: 'Activate listing',
  deleteListing: 'Delete listing',

  editProductService: 'Edit Product or Service',
  addProductService: 'Add Product or Service',

  name: 'Name',
  businessName: 'Business Name',
  enterProductServiceName:
    'Enter product or service name',
  enterBusinessName: 'Enter business name',

  listingType: 'Listing Type',
  selectCategory: 'Select category',
  pricingType: 'Pricing Type',
  perService: 'Per Service',
  perHour: 'Per Hour',
  perItem: 'Per Item',

  priceTsh: 'Price (TSh)',
  enterPrice: 'Enter price',
  unit: 'Unit',
  stock: 'Stock',
  currentStock: 'Current stock',
  lowStockThreshold: 'Low Stock Threshold',
  alertThreshold: 'Alert threshold',

  description: 'Description',
  describeProductService:
    'Describe the product or service...',

  cancel: 'Cancel',
  saveChanges: 'Save Changes',
  createListing: 'Create Listing',

  listingDetails: 'Listing Details',
  pricingTypeLabel: 'Pricing Type',
  notApplicable: 'Not applicable',
  notSet: 'Not set',
  descriptionLabel: 'Description',
  noDescriptionProvided:
    'No description provided.',

  deleteListingTitle: 'Delete Listing',
  deleteThisListing: 'Delete this listing?',
  deleteWarning:
    'You are about to delete',
  deleteWarningEnd:
    'This action cannot be undone.',
  delete: 'Delete Listing',
},

sw: {
  marketplaceManagement: 'Usimamizi wa Soko',
  productsServices: 'Bidhaa na Huduma',
  pageDescription:
    'Simamia bidhaa na huduma za soko zinazowekwa na biashara za ndani.',
  addListing: 'Ongeza Orodha',

  totalListings: 'Jumla ya Orodha',
  products: 'Bidhaa',
  services: 'Huduma',
  activeListings: 'Orodha Zinazotumika',

  searchPlaceholder:
    'Tafuta bidhaa, huduma, biashara...',
  allTypes: 'Aina Zote',
  allCategories: 'Kategoria Zote',
  allStatuses: 'Hali Zote',
  product: 'Bidhaa',
  service: 'Huduma',
  active: 'Inatumika',
  inactive: 'Haitumiki',

  marketplaceListings: 'Orodha za Soko',
  listingShown: 'orodha imeonyeshwa.',
  listingsShown: 'orodha zimeonyeshwa.',
  noProductsServices:
    'Hakuna Bidhaa au Huduma Zilizopatikana',
  noProductsServicesDescription:
    'Kwa sasa hakuna bidhaa au huduma zilizowekwa kwenye soko, au hakuna zinazolingana na utafutaji na vichujio vyako.',

  listing: 'Orodha',
  business: 'Biashara',
  type: 'Aina',
  category: 'Kategoria',
  price: 'Bei',
  status: 'Hali',
  noDescription: 'Hakuna maelezo',
  notProvided: 'Haijatolewa',

  viewListing: 'Angalia orodha',
  editListing: 'Hariri orodha',
  deactivateListing: 'Zima orodha',
  activateListing: 'Washa orodha',
  deleteListing: 'Futa orodha',

  editProductService: 'Hariri Bidhaa au Huduma',
  addProductService: 'Ongeza Bidhaa au Huduma',

  name: 'Jina',
  businessName: 'Jina la Biashara',
  enterProductServiceName:
    'Ingiza jina la bidhaa au huduma',
  enterBusinessName: 'Ingiza jina la biashara',

  listingType: 'Aina ya Orodha',
  selectCategory: 'Chagua kategoria',
  pricingType: 'Aina ya Bei',
  perService: 'Kwa Huduma',
  perHour: 'Kwa Saa',
  perItem: 'Kwa Kipande',

  priceTsh: 'Bei (TSh)',
  enterPrice: 'Ingiza bei',
  unit: 'Kipimo',
  stock: 'Stock',
  currentStock: 'Stock iliyopo',
  lowStockThreshold: 'Kiwango cha Tahadhari ya Stock',
  alertThreshold: 'Kiwango cha tahadhari',

  description: 'Maelezo',
  describeProductService:
    'Eleza bidhaa au huduma...',

  cancel: 'Ghairi',
  saveChanges: 'Hifadhi Mabadiliko',
  createListing: 'Unda Orodha',

  listingDetails: 'Maelezo ya Orodha',
  pricingTypeLabel: 'Aina ya Bei',
  notApplicable: 'Haitumiki',
  notSet: 'Haijawekwa',
  descriptionLabel: 'Maelezo',
  noDescriptionProvided:
    'Hakuna maelezo yaliyotolewa.',

  deleteListingTitle: 'Futa Orodha',
  deleteThisListing: 'Ufute orodha hii?',
  deleteWarning:
    'Unakaribia kufuta',
  deleteWarningEnd:
    'Kitendo hiki hakiwezi kutenduliwa.',
  delete: 'Futa Orodha',
},


}

const currentText = language === 'sw' ? text.sw : text.en

const categoryLabels = {
en: Object.fromEntries(
categories.map((category) => [
category,
category,
]),
),
sw: {
Groceries: 'Vyakula na Mahitaji ya Nyumbani',
'Food & Restaurants': 'Chakula na Migahawa',
'Fashion & Clothing': 'Mitindo na Mavazi',
'Beauty & Personal Care':
'Urembo na Huduma Binafsi',
Electronics: 'Vifaa vya Elektroniki',
'Phones & Accessories':
'Simu na Vifaa Vyake',
'Home & Furniture': 'Nyumbani na Samani',
'Health & Wellness': 'Afya na Ustawi',
'Books & Education': 'Vitabu na Elimu',
'Crafts & Handmade': 'Ufundi na Bidhaa za Mikono',
Agriculture: 'Kilimo',
'Fish & Seafood': 'Samaki na Vyakula vya Baharini',
'Construction & Hardware':
'Ujenzi na Vifaa vya Ujenzi',
Automotive: 'Magari na Vifaa Vyake',
'Technology & Digital Services':
'Teknolojia na Huduma za Kidijitali',
'Professional Services':
'Huduma za Kitaalamu',
'Cleaning Services': 'Huduma za Usafi',
'Transport & Delivery':
'Usafiri na Usafirishaji',
Accommodation: 'Malazi',
'Events & Entertainment':
'Matukio na Burudani',
Other: 'Nyingine',
},
}

const unitLabels = {
en: {
piece: 'Piece',
kg: 'Kg',
g: 'G',
litre: 'Litre',
ml: 'Ml',
metre: 'Metre',
pack: 'Pack',
box: 'Box',
},
sw: {
piece: 'Kipande',
kg: 'Kg',
g: 'G',
litre: 'Lita',
ml: 'Ml',
metre: 'Mita',
pack: 'Pakiti',
box: 'Boksi',
},
}

const pricingLabels = {
en: {
per_item: 'Per Item',
per_service: 'Per Service',
per_hour: 'Per Hour',
},
sw: {
per_item: 'Kwa Kipande',
per_service: 'Kwa Huduma',
per_hour: 'Kwa Saa',
},
}

const getCategoryLabel = (category) =>
categoryLabels[language]?.[category] ||
category ||
currentText.notProvided

const getUnitLabel = (unit) =>
unitLabels[language]?.[unit] ||
unit ||
currentText.notProvided

const getPricingLabel = (pricingType) =>
pricingLabels[language]?.[pricingType] ||
pricingType ||
currentText.notProvided

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

return ( <div className="space-y-6">
{/* Page heading */} <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"> <div> <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600"> <Package className="h-4 w-4" />
{currentText.marketplaceManagement} </div>

```
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {currentText.productsServices}
      </h1>

      <p className="mt-1 max-w-2xl text-sm text-slate-500">
        {currentText.pageDescription}
      </p>
    </div>

    <button
      type="button"
      onClick={openAddModal}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
    >
      <Plus className="h-4 w-4" />
      {currentText.addListing}
    </button>
  </div>

  {/* Statistics */}
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard
      icon={Package}
      label={currentText.totalListings}
      value={totalListings}
    />

    <StatCard
      icon={ShoppingBag}
      label={currentText.products}
      value={totalProducts}
    />

    <StatCard
      icon={Wrench}
      label={currentText.services}
      value={totalServices}
    />

    <StatCard
      icon={CheckCircle2}
      label={currentText.activeListings}
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
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder={currentText.searchPlaceholder}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <select
        value={typeFilter}
        onChange={(event) =>
          setTypeFilter(event.target.value)
        }
        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      >
        <option value="all">
          {currentText.allTypes}
        </option>

        <option value="product">
          {currentText.products}
        </option>

        <option value="service">
          {currentText.services}
        </option>
      </select>

      <select
        value={categoryFilter}
        onChange={(event) =>
          setCategoryFilter(event.target.value)
        }
        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
      >
        <option value="all">
          {currentText.allCategories}
        </option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {getCategoryLabel(category)}
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
        <option value="all">
          {currentText.allStatuses}
        </option>

        <option value="active">
          {currentText.active}
        </option>

        <option value="inactive">
          {currentText.inactive}
        </option>
      </select>
    </div>
  </div>

  {/* Listings table */}
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 px-5 py-4">
      <h2 className="font-semibold text-slate-900">
        {currentText.marketplaceListings}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {filteredListings.length}{' '}
        {filteredListings.length === 1
          ? currentText.listingShown
          : currentText.listingsShown}
      </p>
    </div>

    {filteredListings.length === 0 ? (
      <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
          <Package className="h-8 w-8 text-indigo-500" />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-900">
          {currentText.noProductsServices}
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {currentText.noProductsServicesDescription}
        </p>

        <button
          type="button"
          onClick={openAddModal}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          {currentText.addListing}
        </button>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">
                {currentText.listing}
              </th>

              <th className="px-5 py-4">
                {currentText.business}
              </th>

              <th className="px-5 py-4">
                {currentText.type}
              </th>

              <th className="px-5 py-4">
                {currentText.category}
              </th>

              <th className="px-5 py-4">
                {currentText.price}
              </th>

              <th className="px-5 py-4">
                {currentText.status}
              </th>

              <th className="px-5 py-4 text-right">
                {currentText.actions || 'Actions'}
              </th>
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
                          currentText.noDescription}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {listing.businessName ||
                    currentText.notProvided}
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
                      ? currentText.service
                      : currentText.product}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  {getCategoryLabel(
                    listing.category,
                  )}
                </td>

                <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                  {listing.price
                    ? `TSh ${listing.price}`
                    : currentText.notProvided}
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
                      ? currentText.active
                      : currentText.inactive}
                  </button>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <ActionButton
                      title={currentText.viewListing}
                      onClick={() =>
                        openDetailsModal(listing)
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </ActionButton>

                    <ActionButton
                      title={currentText.editListing}
                      onClick={() =>
                        openEditModal(listing)
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </ActionButton>

                    <ActionButton
                      title={
                        listing.status === 'active'
                          ? currentText.deactivateListing
                          : currentText.activateListing
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
                      title={currentText.deleteListing}
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
          ? currentText.editProductService
          : currentText.addProductService
      }
      onClose={() => setShowFormModal(false)}
      wide
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            label={currentText.name}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={
              currentText.enterProductServiceName
            }
            required
          />

          <FormField
            label={currentText.businessName}
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder={
              currentText.enterBusinessName
            }
            required
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {currentText.listingType}
            </label>

            <select
              name="itemType"
              value={form.itemType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="product">
                {currentText.product}
              </option>

              <option value="service">
                {currentText.service}
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {currentText.category}
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                {currentText.selectCategory}
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {getCategoryLabel(category)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {currentText.pricingType}
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
                    {currentText.perService}
                  </option>

                  <option value="per_hour">
                    {currentText.perHour}
                  </option>
                </>
              ) : (
                <option value="per_item">
                  {currentText.perItem}
                </option>
              )}
            </select>
          </div>

          <FormField
            label={currentText.priceTsh}
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder={currentText.enterPrice}
            required
          />

          {form.itemType === 'product' ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {currentText.unit}
                </label>

                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {productUnits.map((unit) => (
                    <option
                      key={unit}
                      value={unit}
                    >
                      {getUnitLabel(unit)}
                    </option>
                  ))}
                </select>
              </div>

              <FormField
                label={currentText.stock}
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder={currentText.currentStock}
              />

              <FormField
                label={currentText.lowStockThreshold}
                name="lowStockThreshold"
                type="number"
                value={form.lowStockThreshold}
                onChange={handleChange}
                placeholder={
                  currentText.alertThreshold
                }
              />
            </>
          ) : null}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {currentText.status}
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="active">
                {currentText.active}
              </option>

              <option value="inactive">
                {currentText.inactive}
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              {currentText.description}
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder={
                currentText.describeProductService
              }
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              setShowFormModal(false)
            }
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {currentText.cancel}
          </button>

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            {editingListing
              ? currentText.saveChanges
              : currentText.createListing}
          </button>
        </div>
      </form>
    </Modal>
  )}

  {/* Listing details modal */}
  {showDetailsModal && selectedListing && (
    <Modal
      title={currentText.listingDetails}
      onClose={() =>
        setShowDetailsModal(false)
      }
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
                ? currentText.service
                : currentText.product}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailItem
            label={currentText.business}
            value={
              selectedListing.businessName ||
              currentText.notProvided
            }
          />

          <DetailItem
            label={currentText.category}
            value={
              getCategoryLabel(
                selectedListing.category,
              )
            }
          />

          <DetailItem
            label={currentText.price}
            value={
              selectedListing.price
                ? `TSh ${selectedListing.price}`
                : currentText.notProvided
            }
          />

          <DetailItem
            label={currentText.pricingTypeLabel}
            value={
              getPricingLabel(
                selectedListing.pricingType,
              )
            }
          />

          <DetailItem
            label={currentText.unit}
            value={
              selectedListing.itemType === 'product'
                ? getUnitLabel(
                    selectedListing.unit,
                  )
                : currentText.notApplicable
            }
          />

          <DetailItem
            label={currentText.stock}
            value={
              selectedListing.itemType === 'product'
                ? selectedListing.stock ||
                  '0'
                : currentText.notApplicable
            }
          />

          <DetailItem
            label={currentText.lowStockThreshold}
            value={
              selectedListing.itemType === 'product'
                ? selectedListing.lowStockThreshold ||
                  currentText.notSet
                : currentText.notApplicable
            }
          />

          <DetailItem
            label={currentText.status}
            value={
              selectedListing.status === 'active'
                ? currentText.active
                : currentText.inactive
            }
          />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            {currentText.descriptionLabel}
          </p>

          <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            {selectedListing.description ||
              currentText.noDescriptionProvided}
          </p>
        </div>
      </div>
    </Modal>
  )}

  {/* Delete confirmation modal */}
  {showDeleteModal && listingToDelete && (
    <Modal
      title={currentText.deleteListingTitle}
      onClose={() =>
        setShowDeleteModal(false)
      }
    >
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <Trash2 className="h-6 w-6 text-red-600" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-900">
          {currentText.deleteThisListing}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {currentText.deleteWarning}{' '}
          <span className="font-semibold text-slate-700">
            {listingToDelete.name}
          </span>
          . {currentText.deleteWarningEnd}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() =>
              setShowDeleteModal(false)
            }
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {currentText.cancel}
          </button>

          <button
            type="button"
            onClick={confirmDelete}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            {currentText.delete}
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
return ( <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"> <div className="flex items-center justify-between"> <div> <p className="text-sm font-medium text-slate-500">
{label} </p>

```
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
{children} </button>
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
return ( <div> <label className="mb-2 block text-sm font-medium text-slate-700">
{label} </label>


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
return ( <div className="rounded-xl border border-slate-200 p-4"> <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
{label} </p>


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
return ( <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
<div
className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${
          wide ? 'max-w-3xl' : 'max-w-xl'
        }`}
> <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4"> <h2 className="text-lg font-bold text-slate-900">
{title} </h2>


      <button
        type="button"
        onClick={onClose}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        aria-label="Close modal"
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
