import { useEffect, useState } from 'react'
import {
  X,
  Package,
  Save,
  ShoppingBag,
  BriefcaseBusiness,
} from 'lucide-react'

const initialForm = {
  name: '',
  description: '',
  category: '',
  itemType: 'product',
  unit: 'piece',
  price: '',
  pricingType: 'per_item',
  stock: '',
  lowStockThreshold: '',
}

const categories = [
  'Food & Groceries',
  'Clothing & Fashion',
  'Electronics',
  'Beauty & Personal Care',
  'Home & Living',
  'Health',
  'Agriculture',
  'Books & Stationery',
  'Services',
  'Other',
]

const productUnits = [
  { value: 'piece', label: 'Piece' },
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'g', label: 'Gram (g)' },
  { value: 'litre', label: 'Litre (L)' },
  { value: 'ml', label: 'Millilitre (ml)' },
  { value: 'metre', label: 'Metre (m)' },
  { value: 'pack', label: 'Pack' },
  { value: 'box', label: 'Box' },
]

const servicePricingTypes = [
  {
    value: 'per_service',
    label: 'Per Service',
  },
  {
    value: 'per_hour',
    label: 'Per Hour',
  },
]

function AddProductForm({
  isOpen,
  onClose,
  onProductAdded,
}) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isOpen) {
      setForm(initialForm)
      setErrors({})
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const isService = form.itemType === 'service'

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: '',
    }))
  }

  const handleTypeChange = (type) => {
    setForm((previousForm) => ({
      ...previousForm,
      itemType: type,
      unit: type === 'service' ? 'service' : 'piece',
      pricingType:
        type === 'service'
          ? 'per_service'
          : 'per_item',
      stock: type === 'service'
        ? ''
        : previousForm.stock,
      lowStockThreshold:
        type === 'service'
          ? ''
          : previousForm.lowStockThreshold,
    }))

    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.name.trim()) {
      newErrors.name =
        `${isService ? 'Service' : 'Product'} name is required.`
    }

    if (!form.description.trim()) {
      newErrors.description =
        `${isService ? 'Service' : 'Product'} description is required.`
    }

    if (!form.category) {
      newErrors.category =
        'Please select a category.'
    }

    if (
      form.price === '' ||
      Number.isNaN(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      newErrors.price =
        'Price must be greater than 0.'
    }

    if (!isService) {
      if (
        form.stock === '' ||
        Number.isNaN(Number(form.stock)) ||
        Number(form.stock) < 0
      ) {
        newErrors.stock =
          'Stock cannot be negative.'
      }

      if (
        form.lowStockThreshold !== '' &&
        (
          Number.isNaN(Number(form.lowStockThreshold)) ||
          Number(form.lowStockThreshold) < 0
        )
      ) {
        newErrors.lowStockThreshold =
          'Low-stock threshold cannot be negative.'
      }

      if (
        form.stock !== '' &&
        form.lowStockThreshold !== '' &&
        Number(form.lowStockThreshold) > Number(form.stock)
      ) {
        newErrors.lowStockThreshold =
          'Low-stock threshold cannot be greater than available stock.'
      }
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const stock = isService
      ? null
      : Number(form.stock)

    const lowStockThreshold = isService
      ? null
      : form.lowStockThreshold === ''
        ? null
        : Number(form.lowStockThreshold)

    const item = {
      id: Date.now(),

      name: form.name.trim(),

      description: form.description.trim(),

      category: form.category,

      itemType: form.itemType,

      unit: isService
        ? 'service'
        : form.unit,

      pricingType: isService
        ? form.pricingType
        : 'per_unit',

      price: Number(form.price),

      stock,

      lowStockThreshold,

      status: isService
        ? 'Active'
        : stock > 0
          ? 'Active'
          : 'Out of Stock',

      isActive: true,
    }

    onProductAdded(item)

    setForm(initialForm)
    setErrors({})
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-product-title"
    >
      <div className="flex max-h-[95dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7F2F0] text-[#326460]">
              {isService ? (
                <BriefcaseBusiness size={20} />
              ) : (
                <Package size={20} />
              )}
            </div>

            <div className="min-w-0">
              <h2
                id="add-product-title"
                className="truncate text-lg font-bold text-[#1B1C1C]"
              >
                Add Product or Service
              </h2>

              <p className="text-xs text-gray-500">
                Add an item to your business catalogue.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#326460]/20"
            aria-label="Close add product form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto"
        >
          <div className="space-y-5 p-5 sm:p-6">

            {/* Item Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#1B1C1C]">
                What are you selling?
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Product */}
                <button
                  type="button"
                  onClick={() => handleTypeChange('product')}
                  className={`flex min-h-20 items-center gap-3 rounded-xl border p-4 text-left transition ${
                    form.itemType === 'product'
                      ? 'border-[#326460] bg-[#E7F2F0] ring-2 ring-[#326460]/10'
                      : 'border-gray-200 bg-white hover:border-[#326460]/40'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#326460] shadow-sm">
                    <ShoppingBag size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#1B1C1C]">
                      Physical Product
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Food, clothes, electronics, etc.
                    </p>
                  </div>
                </button>

                {/* Service */}
                <button
                  type="button"
                  onClick={() => handleTypeChange('service')}
                  className={`flex min-h-20 items-center gap-3 rounded-xl border p-4 text-left transition ${
                    form.itemType === 'service'
                      ? 'border-[#326460] bg-[#E7F2F0] ring-2 ring-[#326460]/10'
                      : 'border-gray-200 bg-white hover:border-[#326460]/40'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#326460] shadow-sm">
                    <BriefcaseBusiness size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#1B1C1C]">
                      Service
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Repairs, salons, cleaning, etc.
                    </p>
                  </div>
                </button>

              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="product-name"
                className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
              >
                {isService
                  ? 'Service Name'
                  : 'Product Name'}
              </label>

              <input
                id="product-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder={
                  isService
                    ? 'e.g. Haircut'
                    : 'e.g. Premium Rice'
                }
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10 ${
                  errors.name
                    ? 'border-red-400'
                    : 'border-gray-200'
                }`}
              />

              {errors.name && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="product-description"
                className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
              >
                Description
              </label>

              <textarea
                id="product-description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder={
                  isService
                    ? 'Describe what the service includes...'
                    : 'Describe the product, quality, features, or condition...'
                }
                className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10 ${
                  errors.description
                    ? 'border-red-400'
                    : 'border-gray-200'
                }`}
              />

              {errors.description && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="product-category"
                className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
              >
                Category
              </label>

              <select
                id="product-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10 ${
                  errors.category
                    ? 'border-red-400'
                    : 'border-gray-200'
                }`}
              >
                <option value="">
                  Select a category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Product Unit + Stock */}
            {!isService && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Unit */}
                <div>
                  <label
                    htmlFor="product-unit"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    Sold By
                  </label>

                  <select
                    id="product-unit"
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                  >
                    {productUnits.map((unit) => (
                      <option
                        key={unit.value}
                        value={unit.value}
                      >
                        {unit.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock */}
                <div>
                  <label
                    htmlFor="product-stock"
                    className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                  >
                    Available Stock
                  </label>

                  <input
                    id="product-stock"
                    name="stock"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="e.g. 50"
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10 ${
                      errors.stock
                        ? 'border-red-400'
                        : 'border-gray-200'
                    }`}
                  />

                  {errors.stock && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.stock}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Low Stock Threshold */}
            {!isService && (
              <div>
                <label
                  htmlFor="low-stock-threshold"
                  className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                >
                  Low Stock Alert At
                </label>

                <input
                  id="low-stock-threshold"
                  name="lowStockThreshold"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.lowStockThreshold}
                  onChange={handleChange}
                  placeholder="e.g. 10"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10 ${
                    errors.lowStockThreshold
                      ? 'border-red-400'
                      : 'border-gray-200'
                  }`}
                />

                <p className="mt-1.5 text-xs text-gray-500">
                  You can receive a low-stock notification when
                  inventory reaches this amount.
                </p>

                {errors.lowStockThreshold && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.lowStockThreshold}
                  </p>
                )}
              </div>
            )}

            {/* Service Pricing */}
            {isService && (
              <div>
                <label
                  htmlFor="service-pricing-type"
                  className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
                >
                  Pricing Type
                </label>

                <select
                  id="service-pricing-type"
                  name="pricingType"
                  value={form.pricingType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10"
                >
                  {servicePricingTypes.map((pricingType) => (
                    <option
                      key={pricingType.value}
                      value={pricingType.value}
                    >
                      {pricingType.label}
                    </option>
                  ))}
                </select>

                <p className="mt-1.5 text-xs text-gray-500">
                  Choose whether customers are charged per service
                  or per hour.
                </p>
              </div>
            )}

            {/* Price */}
            <div>
              <label
                htmlFor="product-price"
                className="mb-2 block text-sm font-semibold text-[#1B1C1C]"
              >
                {isService
                  ? 'Price (TZS)'
                  : 'Price per Unit (TZS)'}
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                  TZS
                </span>

                <input
                  id="product-price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full rounded-xl border py-3 pl-14 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10 ${
                    errors.price
                      ? 'border-red-400'
                      : 'border-gray-200'
                  }`}
                />
              </div>

              {!isService && (
                <p className="mt-1.5 text-xs text-gray-500">
                  Example: TSh 3,000 per kg.
                </p>
              )}

              {isService && form.pricingType === 'per_service' && (
                <p className="mt-1.5 text-xs text-gray-500">
                  Price charged for one service.
                </p>
              )}

              {isService && form.pricingType === 'per_hour' && (
                <p className="mt-1.5 text-xs text-gray-500">
                  Price charged for one hour.
                </p>
              )}

              {errors.price && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.price}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <p className="mb-2 text-sm font-semibold text-[#1B1C1C]">
                {isService
                  ? 'Service Image'
                  : 'Product Image'}
              </p>

              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center">
                {isService ? (
                  <BriefcaseBusiness
                    size={28}
                    className="mx-auto text-gray-400"
                  />
                ) : (
                  <Package
                    size={28}
                    className="mx-auto text-gray-400"
                  />
                )}

                <p className="mt-2 text-sm font-medium text-gray-600">
                  Image upload will be connected later
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  No placeholder image is stored as catalogue data.
                </p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="rounded-xl border border-[#DCE9E6] bg-[#F3FAF8] p-4">
              <p className="text-sm font-semibold text-[#326460]">
                Delivery is handled at checkout
              </p>

              <p className="mt-1 text-xs leading-5 text-[#455A58]">
                Customers will choose the available delivery or
                pickup option when placing an order. Product
                creation does not determine the delivery method.
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-gray-200 bg-white p-4 sm:flex-row sm:justify-end sm:px-6">

            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#326460]/20 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold !text-white shadow-sm transition hover:bg-[#28524F] focus:outline-none focus:ring-2 focus:ring-[#326460]/30 sm:w-auto"
            >
              <Save size={17} />

              Save {isService
                ? 'Service'
                : 'Product'}
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductForm

