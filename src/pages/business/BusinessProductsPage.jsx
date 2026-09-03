import { useState } from 'react'
import {
Package,
Plus,
Search,
SlidersHorizontal,
RefreshCw,
Pencil,
Trash2,
Eye,
Wrench,
AlertTriangle,
} from 'lucide-react'

import AddProductForm from '../../components/business/AddProductForm'
import { useLanguage } from '../../i18n/LanguageContext'

function BusinessProductsPage() {
const { language } = useLanguage()

const text = {
en: {
productsServices: 'Products & Services',
pageDescription:
'Manage the products and services available in your store',
addProductService: 'Add Product or Service',


  catalogueManagement: 'Catalogue Management',
  catalogueDescription:
    'Add, update, and manage the products and services offered by your business.',
  searchPlaceholder: 'Search products or services...',
  filter: 'Filter',

  noProductsFound: 'No products or services found',
  noProductsYet: 'No products or services yet',
  searchDescription:
    'Try changing your search term to find a product or service.',
  emptyDescription:
    'Your catalogue will appear here after you add products or services to your store.',
  addFirstItem: 'Add Your First Item',
  clearSearch: 'Clear Search',

  item: 'Item',
  type: 'Type',
  category: 'Category',
  price: 'Price',
  stockBilling: 'Stock / Billing',
  status: 'Status',
  actions: 'Actions',

  service: 'Service',
  product: 'Product',
  perHour: 'Per Hour',
  perService: 'Per Service',
  perUnit: 'Per Unit',

  noStockTracking: 'No stock tracking',
  hourlyService: 'Hourly service',
  alertAt: 'Alert at',
  piece: 'piece',
  pieces: 'pieces',

  active: 'Active',
  outOfStock: 'Out of Stock',
  lowStock: 'Low Stock',
  inStock: 'In Stock',
  restockSoon: 'Restock soon',

  view: 'View',
  edit: 'Edit',
  delete: 'Delete',

  totalCatalogue: 'Total Catalogue',
  productsServices: 'Products and services',
  physicalProducts: 'Physical Products',
  inventoryItems: 'Items with inventory',
  services: 'Services',
  servicesOffered: 'Services offered',
  inventoryAlerts: 'Inventory Alerts',
  outOfStockCount: 'out of stock',
  lowStockCount: 'low stock',

  deleteConfirmation:
    'Are you sure you want to delete this item?',
  viewItem: 'View',
  editItem: 'Edit',
  deleteItem: 'Delete',
},

sw: {
  productsServices: 'Bidhaa na Huduma',
  pageDescription:
    'Simamia bidhaa na huduma zinazopatikana kwenye duka lako',
  addProductService: 'Ongeza Bidhaa au Huduma',

  catalogueManagement: 'Usimamizi wa Orodha ya Bidhaa',
  catalogueDescription:
    'Ongeza, sasisha, na simamia bidhaa na huduma zinazotolewa na biashara yako.',
  searchPlaceholder: 'Tafuta bidhaa au huduma...',
  filter: 'Chuja',

  noProductsFound: 'Hakuna bidhaa au huduma zilizopatikana',
  noProductsYet: 'Bado hakuna bidhaa au huduma',
  searchDescription:
    'Jaribu kubadilisha neno la utafutaji ili kupata bidhaa au huduma.',
  emptyDescription:
    'Orodha ya bidhaa zako itaonekana hapa baada ya kuongeza bidhaa au huduma kwenye duka lako.',
  addFirstItem: 'Ongeza Kipengele Chako cha Kwanza',
  clearSearch: 'Futa Utafutaji',

  item: 'Kipengele',
  type: 'Aina',
  category: 'Kategoria',
  price: 'Bei',
  stockBilling: 'Stock / Malipo',
  status: 'Hali',
  actions: 'Vitendo',

  service: 'Huduma',
  product: 'Bidhaa',
  perHour: 'Kwa Saa',
  perService: 'Kwa Huduma',
  perUnit: 'Kwa Kipande',

  noStockTracking: 'Hakuna ufuatiliaji wa stock',
  hourlyService: 'Huduma ya saa',
  alertAt: 'Tahadhari ikiwa',

  piece: 'kipande',
  pieces: 'vipande',

  active: 'Inatumika',
  outOfStock: 'Imeisha',
  lowStock: 'Stock Ndogo',
  inStock: 'Ipo',
  restockSoon: 'Ongeza stock hivi karibuni',

  view: 'Angalia',
  edit: 'Hariri',
  delete: 'Futa',

  totalCatalogue: 'Jumla ya Orodha',
  productsServices: 'Bidhaa na huduma',
  physicalProducts: 'Bidhaa za Kawaida',
  inventoryItems: 'Bidhaa zenye stock',
  services: 'Huduma',
  servicesOffered: 'Huduma zinazotolewa',
  inventoryAlerts: 'Tahadhari za Stock',
  outOfStockCount: 'zimeisha',
  lowStockCount: 'zina stock ndogo',

  deleteConfirmation:
    'Una uhakika unataka kufuta kipengele hiki?',
  viewItem: 'Angalia',
  editItem: 'Hariri',
  deleteItem: 'Futa',
},


}

const currentText = language === 'sw' ? text.sw : text.en

const [products, setProducts] = useState([])
const [searchTerm, setSearchTerm] = useState('')
const [isAddProductOpen, setIsAddProductOpen] = useState(false)

// Search products and services
const filteredProducts = products.filter((product) => {
const search = searchTerm.toLowerCase().trim()


if (!search) {
  return true
}

return (
  product.name?.toLowerCase().includes(search) ||
  product.category?.toLowerCase().includes(search) ||
  product.itemType?.toLowerCase().includes(search) ||
  product.description?.toLowerCase().includes(search)
)


})

// Catalogue statistics
const activeItems = products.filter(
(product) => product.status === 'Active'
)

const outOfStockProducts = products.filter(
(product) =>
product.itemType === 'product' &&
Number(product.stock) === 0
)

const lowStockProducts = products.filter(
(product) =>
product.itemType === 'product' &&
Number(product.stock) > 0 &&
product.lowStockThreshold !== null &&
product.lowStockThreshold !== undefined &&
Number(product.stock) <= Number(product.lowStockThreshold)
)

const serviceItems = products.filter(
(product) => product.itemType === 'service'
)

const physicalProducts = products.filter(
(product) => product.itemType !== 'service'
)

// Add product or service
const handleOpenAddProduct = () => {
setIsAddProductOpen(true)
}

const handleCloseAddProduct = () => {
setIsAddProductOpen(false)
}

const handleProductAdded = (newProduct) => {
setProducts((previousProducts) => [
...previousProducts,
newProduct,
])


setIsAddProductOpen(false)


}

// Delete product or service
const handleDeleteProduct = (productId) => {
const confirmed = window.confirm(
currentText.deleteConfirmation
)


if (!confirmed) {
  return
}

setProducts((previousProducts) =>
  previousProducts.filter(
    (product) => product.id !== productId
  )
)


}

// Clear search
const handleClearSearch = () => {
setSearchTerm('')
}

// Display helpers
const formatPrice = (price) => {
return Number(price || 0).toLocaleString()
}

const getPricingLabel = (product) => {
if (product.itemType === 'service') {
if (product.pricingType === 'per_hour') {
return currentText.perHour
}


  return currentText.perService
}

return currentText.perUnit


}

const getStockStatus = (product) => {
if (product.itemType === 'service') {
return currentText.service
}


const stock = Number(product.stock || 0)

if (stock === 0) {
  return currentText.outOfStock
}

if (
  product.lowStockThreshold !== null &&
  product.lowStockThreshold !== undefined &&
  product.lowStockThreshold !== '' &&
  stock <= Number(product.lowStockThreshold)
) {
  return currentText.lowStock
}

return currentText.inStock


}

const getStatusClasses = (product) => {
if (product.itemType === 'service') {
return 'bg-blue-50 text-blue-700'
}


const stockStatus = getStockStatus(product)

if (stockStatus === currentText.outOfStock) {
  return 'bg-red-50 text-red-700'
}

if (stockStatus === currentText.lowStock) {
  return 'bg-amber-50 text-amber-700'
}

return 'bg-green-50 text-green-700'


}

return ( <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8"> <div className="mx-auto max-w-7xl">

    {/* Page header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#326460] text-white shadow-sm">
          <Package size={22} />
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-[#1B1C1C] sm:text-2xl">
            {currentText.productsServices}
          </h1>

          <p className="mt-0.5 text-sm text-gray-500">
            {currentText.pageDescription}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleOpenAddProduct}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#28534f] focus:outline-none focus:ring-2 focus:ring-[#326460]/30 sm:w-auto"
      >
        <Plus size={19} />
        {currentText.addProductService}
      </button>
    </div>

    {/* Product management */}
    <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Section header */}
      <div className="border-b border-gray-200 p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#1B1C1C] sm:text-lg">
              {currentText.catalogueManagement}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {currentText.catalogueDescription}
            </p>
          </div>

          {/* Search and filter */}
          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <div className="relative min-w-0 flex-1 sm:w-64">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder={currentText.searchPlaceholder}
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#326460] focus:bg-white focus:ring-2 focus:ring-[#326460]/10"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#326460]"
            >
              <SlidersHorizontal size={17} />
              {currentText.filter}
            </button>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 ? (
        <div className="px-5 py-14 text-center sm:px-8 sm:py-20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#326460]/10 text-[#326460]">
            {searchTerm ? (
              <Search size={30} />
            ) : (
              <Package size={30} />
            )}
          </div>

          <h3 className="mt-5 text-lg font-semibold text-[#1B1C1C]">
            {searchTerm
              ? currentText.noProductsFound
              : currentText.noProductsYet}
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            {searchTerm
              ? currentText.searchDescription
              : currentText.emptyDescription}
          </p>

          {!searchTerm && (
            <button
              type="button"
              onClick={handleOpenAddProduct}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#28534f] focus:outline-none focus:ring-2 focus:ring-[#326460]/30"
            >
              <Plus size={18} />
              {currentText.addFirstItem}
            </button>
          )}

          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <RefreshCw size={17} />
              {currentText.clearSearch}
            </button>
          )}
        </div>
      ) : (

        /* Product table */
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {currentText.item}
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {currentText.type}
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {currentText.category}
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {currentText.price}
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {currentText.stockBilling}
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {currentText.status}
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {currentText.actions}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => {
                const isService =
                  product.itemType === 'service'

                const stockStatus =
                  getStockStatus(product)

                return (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50/70"
                  >
                    {/* Item */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                            isService
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-[#326460]/10 text-[#326460]'
                          }`}
                        >
                          {isService ? (
                            <Wrench size={20} />
                          ) : (
                            <Package size={20} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-52 truncate text-sm font-semibold text-[#1B1C1C]">
                            {product.name}
                          </p>

                          <p className="mt-0.5 max-w-60 truncate text-xs text-gray-500">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          isService
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-[#326460]/10 text-[#326460]'
                        }`}
                      >
                        {isService
                          ? currentText.service
                          : currentText.product}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-[#1B1C1C]">
                        TZS {formatPrice(product.price)}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        {getPricingLabel(product)}
                      </p>
                    </td>

                    {/* Stock and billing */}
                    <td className="px-6 py-4">
                      {isService ? (
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {currentText.noStockTracking}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {product.pricingType === 'per_hour'
                              ? currentText.hourlyService
                              : currentText.perService}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {product.stock}{' '}
                            {product.unit || currentText.piece}
                            {Number(product.stock) === 1
                              ? ''
                              : product.unit === 'piece'
                                ? currentText.pieces
                                : ''}
                          </p>

                          {product.lowStockThreshold !== null &&
                            product.lowStockThreshold !== undefined &&
                            product.lowStockThreshold !== '' && (
                              <p className="mt-0.5 text-xs text-gray-400">
                                {currentText.alertAt}{' '}
                                {product.lowStockThreshold}
                              </p>
                            )}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-start gap-1">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                            product
                          )}`}
                        >
                          {isService
                            ? currentText.active
                            : stockStatus}
                        </span>

                        {!isService &&
                          stockStatus === currentText.lowStock && (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                              <AlertTriangle size={13} />
                              {currentText.restockSoon}
                            </span>
                          )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#326460]"
                          aria-label={`${currentText.viewItem} ${product.name}`}
                          title={currentText.view}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#326460]"
                          aria-label={`${currentText.editItem} ${product.name}`}
                          title={currentText.edit}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteProduct(product.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                          aria-label={`${currentText.deleteItem} ${product.name}`}
                          title={currentText.delete}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>

    {/* Catalogue statistics */}
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* Total catalogue */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          {currentText.totalCatalogue}
        </p>

        <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
          {products.length}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {currentText.productsServices}
        </p>
      </div>

      {/* Physical products */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          {currentText.physicalProducts}
        </p>

        <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
          {physicalProducts.length}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {currentText.inventoryItems}
        </p>
      </div>

      {/* Services */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          {currentText.services}
        </p>

        <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
          {serviceItems.length}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {currentText.servicesOffered}
        </p>
      </div>

      {/* Inventory alerts */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          {currentText.inventoryAlerts}
        </p>

        <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
          {outOfStockProducts.length +
            lowStockProducts.length}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {outOfStockProducts.length}{' '}
          {currentText.outOfStockCount} ·{' '}
          {lowStockProducts.length}{' '}
          {currentText.lowStockCount}
        </p>
      </div>
    </div>

    {/* Add product modal */}
    <AddProductForm
      isOpen={isAddProductOpen}
      onClose={handleCloseAddProduct}
      onProductAdded={handleProductAdded}
    />
  </div>
</div>

)
}

export default BusinessProductsPage
