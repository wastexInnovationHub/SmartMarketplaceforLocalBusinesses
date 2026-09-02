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

function BusinessProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  // ======================================================
  // SEARCH
  // ======================================================

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

  // ======================================================
  // STATISTICS
  // ======================================================

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

  // ======================================================
  // ADD PRODUCT / SERVICE
  // ======================================================

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

  // ======================================================
  // DELETE
  // ======================================================

  const handleDeleteProduct = (productId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
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

  // ======================================================
  // SEARCH
  // ======================================================

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  // ======================================================
  // DISPLAY HELPERS
  // ======================================================

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString()
  }

  const getPricingLabel = (product) => {
    if (product.itemType === 'service') {
      if (product.pricingType === 'per_hour') {
        return 'Per Hour'
      }

      return 'Per Service'
    }

    return 'Per Unit'
  }

  const getStockStatus = (product) => {
    if (product.itemType === 'service') {
      return 'Service'
    }

    const stock = Number(product.stock || 0)

    if (stock === 0) {
      return 'Out of Stock'
    }

    if (
      product.lowStockThreshold !== null &&
      product.lowStockThreshold !== undefined &&
      product.lowStockThreshold !== '' &&
      stock <= Number(product.lowStockThreshold)
    ) {
      return 'Low Stock'
    }

    return 'In Stock'
  }

  const getStatusClasses = (product) => {
    if (product.itemType === 'service') {
      return 'bg-blue-50 text-blue-700'
    }

    const stockStatus = getStockStatus(product)

    if (stockStatus === 'Out of Stock') {
      return 'bg-red-50 text-red-700'
    }

    if (stockStatus === 'Low Stock') {
      return 'bg-amber-50 text-amber-700'
    }

    return 'bg-green-50 text-green-700'
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] bg-[#F3FAF8] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#326460] text-white shadow-sm">
              <Package size={22} />
            </div>

            <div className="min-w-0">

              <h1 className="truncate text-xl font-bold text-[#1B1C1C] sm:text-2xl">
                Products & Services
              </h1>

              <p className="mt-0.5 text-sm text-gray-500">
                Manage the products and services available in your store
              </p>

            </div>

          </div>

          {/* Add Product */}
          <button
            type="button"
            onClick={handleOpenAddProduct}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#28534f] focus:outline-none focus:ring-2 focus:ring-[#326460]/30 sm:w-auto"
          >
            <Plus size={19} />
            Add Product or Service
          </button>

        </div>

        {/* ==================================================
            PRODUCT MANAGEMENT
        ================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Section header */}
          <div className="border-b border-gray-200 p-4 sm:p-5 lg:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <h2 className="text-base font-semibold text-[#1B1C1C] sm:text-lg">
                  Catalogue Management
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add, update, and manage the products and services offered by your business.
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
                    placeholder="Search products or services..."
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#326460] focus:bg-white focus:ring-2 focus:ring-[#326460]/10"
                  />

                </div>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-[#326460]"
                >
                  <SlidersHorizontal size={17} />
                  Filter
                </button>

              </div>

            </div>

          </div>

          {/* ==================================================
              EMPTY STATE
          ================================================== */}

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
                  ? 'No products or services found'
                  : 'No products or services yet'}

              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">

                {searchTerm
                  ? 'Try changing your search term to find a product or service.'
                  : 'Your catalogue will appear here after you add products or services to your store.'}

              </p>

              {!searchTerm && (
                <button
                  type="button"
                  onClick={handleOpenAddProduct}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#28534f] focus:outline-none focus:ring-2 focus:ring-[#326460]/30"
                >
                  <Plus size={18} />
                  Add Your First Item
                </button>
              )}

              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  <RefreshCw size={17} />
                  Clear Search
                </button>
              )}

            </div>

          ) : (

            /* ==================================================
               PRODUCT TABLE
            ================================================== */

            <div className="overflow-x-auto">

              <table className="min-w-[1100px] w-full">

                <thead>

                  <tr className="border-b border-gray-200 bg-gray-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Item
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Stock / Billing
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Actions
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

                        {/* ==================================================
                            ITEM
                        ================================================== */}

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

                        {/* ==================================================
                            TYPE
                        ================================================== */}

                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              isService
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-[#326460]/10 text-[#326460]'
                            }`}
                          >
                            {isService ? 'Service' : 'Product'}
                          </span>

                        </td>

                        {/* ==================================================
                            CATEGORY
                        ================================================== */}

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.category}
                        </td>

                        {/* ==================================================
                            PRICE
                        ================================================== */}

                        <td className="px-6 py-4">

                          <p className="text-sm font-semibold text-[#1B1C1C]">
                            TZS {formatPrice(product.price)}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {getPricingLabel(product)}
                          </p>

                        </td>

                        {/* ==================================================
                            STOCK / BILLING
                        ================================================== */}

                        <td className="px-6 py-4">

                          {isService ? (

                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                No stock tracking
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                {product.pricingType === 'per_hour'
                                  ? 'Hourly service'
                                  : 'Per service'}
                              </p>
                            </div>

                          ) : (

                            <div>

                              <p className="text-sm font-medium text-gray-700">
                                {product.stock}{' '}
                                {product.unit || 'piece'}
                                {Number(product.stock) === 1
                                  ? ''
                                  : product.unit === 'piece'
                                    ? 's'
                                    : ''}
                              </p>

                              {product.lowStockThreshold !== null &&
                                product.lowStockThreshold !== undefined &&
                                product.lowStockThreshold !== '' && (
                                  <p className="mt-0.5 text-xs text-gray-400">
                                    Alert at {product.lowStockThreshold}
                                  </p>
                                )}

                            </div>

                          )}

                        </td>

                        {/* ==================================================
                            STATUS
                        ================================================== */}

                        <td className="px-6 py-4">

                          <div className="flex flex-col items-start gap-1">

                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                product
                              )}`}
                            >
                              {isService
                                ? 'Active'
                                : stockStatus}
                            </span>

                            {!isService &&
                              stockStatus === 'Low Stock' && (
                                <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                                  <AlertTriangle size={13} />
                                  Restock soon
                                </span>
                              )}

                          </div>

                        </td>

                        {/* ==================================================
                            ACTIONS
                        ================================================== */}

                        <td className="px-6 py-4">

                          <div className="flex items-center justify-end gap-2">

                            <button
                              type="button"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#326460]"
                              aria-label={`View ${product.name}`}
                              title="View"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#326460]"
                              aria-label={`Edit ${product.name}`}
                              title="Edit"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteProduct(product.id)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                              aria-label={`Delete ${product.name}`}
                              title="Delete"
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

        {/* ==================================================
            CATALOGUE STATISTICS
        ================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              Total Catalogue
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
              {products.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Products and services
            </p>

          </div>

          {/* Products */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              Physical Products
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
              {physicalProducts.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Items with inventory
            </p>

          </div>

          {/* Services */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              Services
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
              {serviceItems.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Services offered
            </p>

          </div>

          {/* Stock alerts */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <p className="text-sm font-medium text-gray-500">
              Inventory Alerts
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1B1C1C]">
              {outOfStockProducts.length + lowStockProducts.length}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {outOfStockProducts.length} out of stock ·{' '}
              {lowStockProducts.length} low stock
            </p>

          </div>

        </div>

        {/* ==================================================
            ADD PRODUCT MODAL
        ================================================== */}

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

