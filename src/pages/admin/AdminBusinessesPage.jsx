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
import { useLanguage } from '../../i18n/LanguageContext'

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
const { language } = useLanguage()

const text =
language === 'sw'
? {
marketplace: 'Soko',
pageTitle: 'Usimamizi wa Biashara',
pageDescription:
'Simamia biashara za ndani zilizosajiliwa kwenye JamiiMarket.',


      addBusiness: 'Ongeza Biashara',
      totalBusinesses: 'Jumla ya Biashara',
      activeBusinesses: 'Biashara Zinazofanya Kazi',
      inactiveBusinesses: 'Biashara Zisizofanya Kazi',
      deliveryAvailable: 'Usafirishaji Unapatikana',

      searchBusinesses: 'Tafuta biashara...',
      allStatuses: 'Hali Zote',
      active: 'Inafanya Kazi',
      inactive: 'Haifanyi Kazi',
      allCategories: 'Kategoria Zote',

      registeredBusinesses: 'Biashara Zilizosajiliwa',
      business: 'biashara',
      businesses: 'biashara',
      found: 'zimepatikana',

      businessColumn: 'Biashara',
      owner: 'Mmiliki',
      category: 'Kategoria',
      contact: 'Mawasiliano',
      status: 'Hali',
      actions: 'Vitendo',

      noAddress: 'Hakuna anwani',
      view: 'Angalia',
      edit: 'Hariri',
      delete: 'Futa',

      addBusinessTitle: 'Ongeza Biashara',
      editBusinessTitle: 'Hariri Biashara',
      businessName: 'Jina la Biashara',
      ownerName: 'Jina la Mmiliki',
      email: 'Barua Pepe',
      phone: 'Simu',
      selectCategory: 'Chagua kategoria',
      openingHours: 'Muda wa Kufungua',
      businessAddress: 'Anwani ya Biashara',
      description: 'Maelezo',
      availableServices: 'Huduma Zinazopatikana',

      enterBusinessName: 'Ingiza jina la biashara',
      enterOwnerName: 'Ingiza jina la mmiliki',
      businessEmail: 'business@example.com',
      enterPhone: 'Ingiza namba ya simu',
      openingHoursPlaceholder: 'mf. Jumatatu-Jumamosi 08:00-20:00',
      enterBusinessLocation: 'Ingiza eneo la biashara',
      describeBusiness: 'Eleza kuhusu biashara...',

      ownDelivery: 'Usafirishaji Unapatikana',
      ownDeliveryDescription:
        'Biashara hii inaweza kutoa huduma yake ya usafirishaji.',

      pickup: 'Kuchukua Oda Kunapatikana',
      pickupDescription:
        'Wateja wanaweza kuchukua oda zao kwenye biashara.',

      statusLabel: 'Hali',
      cancel: 'Ghairi',
      saveChanges: 'Hifadhi Mabadiliko',

      businessDetails: 'Maelezo ya Biashara',
      notProvided: 'Haijawekwa',
      noDescription: 'Hakuna maelezo yaliyowekwa.',
      noDeliveryPickup:
        'Hakuna chaguo la usafirishaji au kuchukua oda lililowekwa.',
      close: 'Funga',

      deleteBusiness: 'Futa Biashara',
      deleteQuestion: 'Futa',
      deleteWarning:
        'Hii itaondoa biashara kwenye taarifa za sasa za frontend.',
      deleteBusinessButton: 'Futa Biashara',

      noBusinessesFound: 'Hakuna Biashara Zilizopatikana',
      noBusinessesDescription:
        'Kwa sasa hakuna biashara kwenye orodha ya taarifa za frontend. Ongeza biashara ili kuanza kujaribu sehemu ya usimamizi.',
    }
  : {
      marketplace: 'Marketplace',
      pageTitle: 'Business Management',
      pageDescription:
        'Manage local businesses registered on JamiiMarket.',

      addBusiness: 'Add Business',
      totalBusinesses: 'Total Businesses',
      activeBusinesses: 'Active Businesses',
      inactiveBusinesses: 'Inactive Businesses',
      deliveryAvailable: 'Delivery Available',

      searchBusinesses: 'Search businesses...',
      allStatuses: 'All Statuses',
      active: 'Active',
      inactive: 'Inactive',
      allCategories: 'All Categories',

      registeredBusinesses: 'Registered Businesses',
      business: 'business',
      businesses: 'businesses',
      found: 'found',

      businessColumn: 'Business',
      owner: 'Owner',
      category: 'Category',
      contact: 'Contact',
      status: 'Status',
      actions: 'Actions',

      noAddress: 'No address',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',

      addBusinessTitle: 'Add Business',
      editBusinessTitle: 'Edit Business',
      businessName: 'Business Name',
      ownerName: 'Owner Name',
      email: 'Email',
      phone: 'Phone',
      selectCategory: 'Select category',
      openingHours: 'Opening Hours',
      businessAddress: 'Business Address',
      description: 'Description',
      availableServices: 'Available Services',

      enterBusinessName: 'Enter business name',
      enterOwnerName: 'Enter owner name',
      businessEmail: 'business@example.com',
      enterPhone: 'Enter phone number',
      openingHoursPlaceholder: 'e.g. Mon-Sat 08:00-20:00',
      enterBusinessLocation: 'Enter business location',
      describeBusiness: 'Describe the business...',

      ownDelivery: 'Delivery Available',
      ownDeliveryDescription:
        'This business can provide its own delivery.',

      pickup: 'Pickup Available',
      pickupDescription:
        'Customers can collect orders from the business.',

      statusLabel: 'Status',
      cancel: 'Cancel',
      saveChanges: 'Save Changes',

      businessDetails: 'Business Details',
      notProvided: 'Not provided',
      noDescription: 'No description provided.',
      noDeliveryPickup:
        'No delivery or pickup option configured.',
      close: 'Close',

      deleteBusiness: 'Delete Business',
      deleteQuestion: 'Delete',
      deleteWarning:
        'This removes the business from the current frontend state.',
      deleteBusinessButton: 'Delete Business',

      noBusinessesFound: 'No Businesses Found',
      noBusinessesDescription:
        'There are currently no businesses in the frontend data list. Add a business to begin testing the management interface.',
    }


const categoryLabels =
language === 'sw'
? {
Groceries: 'Vyakula na Mahitaji ya Nyumbani',
'Food & Restaurants': 'Chakula na Migahawa',
'Fashion & Clothing': 'Mitindo na Mavazi',
'Beauty & Personal Care': 'Urembo na Huduma Binafsi',
Electronics: 'Vifaa vya Elektroniki',
'Phones & Accessories': 'Simu na Vifaa Vyake',
'Home & Furniture': 'Nyumbani na Samani',
'Health & Wellness': 'Afya na Ustawi',
'Books & Education': 'Vitabu na Elimu',
'Crafts & Handmade': 'Ufundi na Bidhaa za Mikono',
Agriculture: 'Kilimo',
'Fish & Seafood': 'Samaki na Vyakula vya Baharini',
'Construction & Hardware': 'Ujenzi na Vifaa vya Ujenzi',
Automotive: 'Magari na Vifaa Vyake',
'Technology & Digital Services':
'Teknolojia na Huduma za Kidijitali',
'Professional Services': 'Huduma za Kitaalamu',
'Cleaning Services': 'Huduma za Usafi',
'Transport & Delivery': 'Usafiri na Usafirishaji',
Accommodation: 'Malazi',
'Events & Entertainment': 'Matukio na Burudani',
Other: 'Nyingine',
}
: {}

const getCategoryLabel = (category) =>
categoryLabels[category] || category

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
const handleCheckboxChange = (event) => {
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

return ( <section className="space-y-6">
{/* Page heading */} <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"> <div> <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
{text.marketplace} </p>

      <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
        {text.pageTitle}
      </h1>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        {text.pageDescription}
      </p>
    </div>

    <button
      type="button"
      onClick={openAddModal}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <Plus className="h-5 w-5" />
      {text.addBusiness}
    </button>
  </div>

  {/* Statistics */}
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard
      icon={
        <Building2 className="h-5 w-5" />
      }
      title={text.totalBusinesses}
      value={statistics.total}
    />

    <StatCard
      icon={
        <CheckCircle2 className="h-5 w-5" />
      }
      title={text.activeBusinesses}
      value={statistics.active}
    />

    <StatCard
      icon={
        <Building2 className="h-5 w-5" />
      }
      title={text.inactiveBusinesses}
      value={statistics.inactive}
    />

    <StatCard
      icon={
        <Truck className="h-5 w-5" />
      }
      title={text.deliveryAvailable}
      value={statistics.delivery}
    />
  </div>

  {/* Search and filters */}
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className="grid gap-3 lg:grid-cols-[1fr_200px_240px]">
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
          placeholder={
            text.searchBusinesses
          }
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

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
          {text.allStatuses}
        </option>

        <option value="active">
          {text.active}
        </option>

        <option value="inactive">
          {text.inactive}
        </option>
      </select>

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
          {text.allCategories}
        </option>

        {BUSINESS_CATEGORIES.map(
          (category) => (
            <option
              key={category}
              value={category}
            >
              {getCategoryLabel(category)}
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
        {text.registeredBusinesses}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {filteredBusinesses.length}{' '}
        {filteredBusinesses.length === 1
          ? text.business
          : text.businesses}{' '}
        {text.found}
      </p>
    </div>

    {filteredBusinesses.length === 0 ? (
      <EmptyState
        onAddBusiness={openAddModal}
        text={text}
      />
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-[950px] w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {text.businessColumn}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {text.owner}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {text.category}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {text.contact}
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                {text.status}
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                {text.actions}
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
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {business.businessName}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />

                        <span className="max-w-48 truncate">
                          {business.address ||
                            text.noAddress}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-slate-400" />

                      <span className="text-sm text-slate-700">
                        {business.ownerName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                      {getCategoryLabel(
                        business.category
                      )}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-700">
                      {business.phone}
                    </p>

                    {business.email && (
                      <p className="mt-1 max-w-48 truncate text-xs text-slate-500">
                        {business.email}
                      </p>
                    )}
                  </td>

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
                        ? text.active
                        : text.inactive}
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <ActionButton
                        label={text.view}
                        onClick={() =>
                          openViewModal(
                            business
                          )
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </ActionButton>

                      <ActionButton
                        label={text.edit}
                        onClick={() =>
                          openEditModal(
                            business
                          )
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </ActionButton>

                      <ActionButton
                        label={text.delete}
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

  {/* Add or edit business modal */}
  {(modal === 'add' ||
    modal === 'edit') && (
    <Modal
      title={
        modal === 'add'
          ? text.addBusinessTitle
          : text.editBusinessTitle
      }
      onClose={closeModal}
      closeLabel={text.close}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label={text.businessName}
            required
          >
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              placeholder={
                text.enterBusinessName
              }
              required
              className="input-field"
            />
          </FormField>

          <FormField
            label={text.ownerName}
            required
          >
            <input
              type="text"
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              placeholder={
                text.enterOwnerName
              }
              required
              className="input-field"
            />
          </FormField>

          <FormField label={text.email}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={text.businessEmail}
              className="input-field"
            />
          </FormField>

          <FormField
            label={text.phone}
            required
          >
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={text.enterPhone}
              required
              className="input-field"
            />
          </FormField>

          <FormField
            label={text.category}
            required
          >
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">
                {text.selectCategory}
              </option>

              {BUSINESS_CATEGORIES.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {getCategoryLabel(category)}
                  </option>
                )
              )}
            </select>
          </FormField>

          <FormField
            label={text.openingHours}
          >
            <input
              type="text"
              name="openingHours"
              value={form.openingHours}
              onChange={handleChange}
              placeholder={
                text.openingHoursPlaceholder
              }
              className="input-field"
            />
          </FormField>
        </div>

        <FormField
          label={text.businessAddress}
        >
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder={
              text.enterBusinessLocation
            }
            className="input-field"
          />
        </FormField>

        <FormField label={text.description}>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder={text.describeBusiness}
            className="input-field resize-none"
          />
        </FormField>

        {/* Delivery and pickup */}
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-800">
            {text.availableServices}
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
                  {text.ownDelivery}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {text.ownDeliveryDescription}
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
                  {text.pickup}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {text.pickupDescription}
                </p>
              </div>
            </label>
          </div>
        </div>

        <FormField label={text.statusLabel}>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="active">
              {text.active}
            </option>

            <option value="inactive">
              {text.inactive}
            </option>
          </select>
        </FormField>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {text.cancel}
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />

            {modal === 'add'
              ? text.addBusiness
              : text.saveChanges}
          </button>
        </div>
      </form>
    </Modal>
  )}

  {/* View business modal */}
  {modal === 'view' &&
    selectedBusiness && (
      <Modal
        title={text.businessDetails}
        onClose={closeModal}
        closeLabel={text.close}
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
                  {getCategoryLabel(
                    selectedBusiness.category
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              label={text.owner}
              value={
                selectedBusiness.ownerName
              }
            />

            <DetailItem
              label={text.phone}
              value={
                selectedBusiness.phone
              }
            />

            <DetailItem
              label={text.email}
              value={
                selectedBusiness.email ||
                text.notProvided
              }
            />

            <DetailItem
              label={text.status}
              value={
                selectedBusiness.status ===
                'active'
                  ? text.active
                  : text.inactive
              }
            />

            <DetailItem
              label={text.businessAddress}
              value={
                selectedBusiness.address ||
                text.notProvided
              }
            />

            <DetailItem
              label={text.openingHours}
              value={
                selectedBusiness.openingHours ||
                text.notProvided
              }
            />
          </div>

          <DetailItem
            label={text.description}
            value={
              selectedBusiness.description ||
              text.noDescription
            }
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {text.availableServices}
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {selectedBusiness.deliveryAvailable && (
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {text.ownDelivery}
                </span>
              )}

              {selectedBusiness.pickupAvailable && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {text.pickup}
                </span>
              )}

              {!selectedBusiness.deliveryAvailable &&
                !selectedBusiness.pickupAvailable && (
                  <span className="text-sm text-slate-500">
                    {text.noDeliveryPickup}
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
              {text.close}
            </button>
          </div>
        </div>
      </Modal>
    )}

  {/* Delete confirmation */}
  {modal === 'delete' &&
    selectedBusiness && (
      <Modal
        title={text.deleteBusiness}
        onClose={closeModal}
        closeLabel={text.close}
      >
        <div className="space-y-5">
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <div className="flex gap-3">
              <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

              <div>
                <p className="font-semibold text-red-900">
                  {text.deleteQuestion}{' '}
                  {
                    selectedBusiness.businessName
                  }
                  ?
                </p>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  {text.deleteWarning}
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
              {text.cancel}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              {text.deleteBusinessButton}
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
return ( <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"> <div className="flex items-center justify-between gap-4"> <div> <p className="text-sm font-medium text-slate-500">
{title} </p>


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
text,
}) {
return ( <div className="p-10 text-center sm:p-14"> <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"> <Building2 className="h-8 w-8" /> </div>


  <h3 className="mt-5 text-lg font-semibold text-slate-800">
    {text.noBusinessesFound}
  </h3>

  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
    {text.noBusinessesDescription}
  </p>

  <button
    type="button"
    onClick={onAddBusiness}
    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
  >
    <Plus className="h-5 w-5" />
    {text.addBusiness}
  </button>
</div>


)
}

// Modal wrapper
function Modal({
title,
onClose,
children,
closeLabel,
}) {
return ( <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"> <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"> <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"> <h2 className="text-lg font-bold text-slate-900">
{title} </h2>


      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label={closeLabel}
      >
        <X className="h-5 w-5" />
      </button>
    </div>

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
return ( <div> <label className="mb-2 block text-sm font-semibold text-slate-700">
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
return ( <div> <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
{label} </p>


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
{children} </button>
)
}

export default AdminBusinessesPage
