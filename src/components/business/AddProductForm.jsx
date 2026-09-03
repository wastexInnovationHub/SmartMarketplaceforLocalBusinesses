import { useEffect, useState } from 'react'
import {
X,
Package,
Save,
ShoppingBag,
BriefcaseBusiness,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

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
const { language } = useLanguage()

const text = language === 'sw'
? {
addProductOrService: 'Ongeza Bidhaa au Huduma',
addCatalogueItem:
'Ongeza kipengele kwenye orodha ya biashara yako.',
closeForm: 'Funga fomu ya kuongeza bidhaa',


    whatAreYouSelling: 'Unauza nini?',

    physicalProduct: 'Bidhaa ya Kawaida',
    physicalProductDescription:
      'Chakula, nguo, vifaa vya elektroniki, n.k.',

    service: 'Huduma',
    serviceDescription:
      'Matengenezo, saluni, usafi, n.k.',

    productName: 'Jina la Bidhaa',
    serviceName: 'Jina la Huduma',

    productNamePlaceholder: 'mf. Mchele Bora',
    serviceNamePlaceholder: 'mf. Kunyoa Nywele',

    description: 'Maelezo',
    productDescriptionPlaceholder:
      'Eleza bidhaa, ubora, vipengele, au hali yake...',
    serviceDescriptionPlaceholder:
      'Eleza huduma hii inahusisha nini...',

    category: 'Kategoria',
    selectCategory: 'Chagua kategoria',

    soldBy: 'Inauzwa kwa',
    availableStock: 'Stock Iliyopo',
    stockPlaceholder: 'mf. 50',

    lowStockAlertAt: 'Tahadhari ya Stock Chini Ianze',
    lowStockDescription:
      'Unaweza kupokea arifa ya stock inapofikia kiasi hiki.',

    pricingType: 'Aina ya Bei',
    pricingDescription:
      'Chagua kama wateja watalipa kwa huduma moja au kwa saa.',

    priceTzs: 'Bei (TZS)',
    pricePerUnitTzs: 'Bei kwa Kipande (TZS)',
    pricePlaceholder: '0',

    productPriceExample:
      'Mfano: TSh 3,000 kwa kg.',
    perServicePriceDescription:
      'Bei inayolipwa kwa huduma moja.',
    perHourPriceDescription:
      'Bei inayolipwa kwa saa moja.',

    serviceImage: 'Picha ya Huduma',
    productImage: 'Picha ya Bidhaa',
    imageUploadLater:
      'Upakiaji wa picha utaunganishwa baadaye',
    noPlaceholderImage:
      'Hakuna picha ya mfano inayohifadhiwa kama data ya bidhaa.',

    deliveryHandledAtCheckout:
      'Usafirishaji unashughulikiwa wakati wa checkout',
    deliveryInformation:
      'Wateja watachagua chaguo la usafirishaji au kuchukua bidhaa linalopatikana wakati wa kuweka oda. Kuunda bidhaa hakuamui njia ya usafirishaji.',

    cancel: 'Ghairi',
    save: 'Hifadhi',
    saveService: 'Hifadhi Huduma',
    saveProduct: 'Hifadhi Bidhaa',

    piece: 'Kipande',
    kilogram: 'Kilogramu (kg)',
    gram: 'Gramu (g)',
    litre: 'Lita (L)',
    millilitre: 'Mililita (ml)',
    metre: 'Mita (m)',
    pack: 'Pakiti',
    box: 'Sanduku',

    perService: 'Kwa Huduma',
    perHour: 'Kwa Saa',

    requiredName: 'Jina la {item} linahitajika.',
    requiredDescription: 'Maelezo ya {item} yanahitajika.',
    selectCategoryError: 'Tafadhali chagua kategoria.',
    priceGreaterThanZero: 'Bei lazima iwe zaidi ya 0.',
    stockNegative: 'Stock haiwezi kuwa chini ya sifuri.',
    thresholdNegative:
      'Kiasi cha tahadhari ya stock hakiwezi kuwa chini ya sifuri.',
    thresholdGreaterThanStock:
      'Kiasi cha tahadhari ya stock hakiwezi kuwa kikubwa kuliko stock iliyopo.',
  }
: {
    addProductOrService: 'Add Product or Service',
    addCatalogueItem:
      'Add an item to your business catalogue.',
    closeForm: 'Close add product form',

    whatAreYouSelling: 'What are you selling?',

    physicalProduct: 'Physical Product',
    physicalProductDescription:
      'Food, clothes, electronics, etc.',

    service: 'Service',
    serviceDescription:
      'Repairs, salons, cleaning, etc.',

    productName: 'Product Name',
    serviceName: 'Service Name',

    productNamePlaceholder: 'e.g. Premium Rice',
    serviceNamePlaceholder: 'e.g. Haircut',

    description: 'Description',
    productDescriptionPlaceholder:
      'Describe the product, quality, features, or condition...',
    serviceDescriptionPlaceholder:
      'Describe what the service includes...',

    category: 'Category',
    selectCategory: 'Select a category',

    soldBy: 'Sold By',
    availableStock: 'Available Stock',
    stockPlaceholder: 'e.g. 50',

    lowStockAlertAt: 'Low Stock Alert At',
    lowStockDescription:
      'You can receive a low-stock notification when inventory reaches this amount.',

    pricingType: 'Pricing Type',
    pricingDescription:
      'Choose whether customers are charged per service or per hour.',

    priceTzs: 'Price (TZS)',
    pricePerUnitTzs: 'Price per Unit (TZS)',
    pricePlaceholder: '0',

    productPriceExample:
      'Example: TSh 3,000 per kg.',
    perServicePriceDescription:
      'Price charged for one service.',
    perHourPriceDescription:
      'Price charged for one hour.',

    serviceImage: 'Service Image',
    productImage: 'Product Image',
    imageUploadLater:
      'Image upload will be connected later',
    noPlaceholderImage:
      'No placeholder image is stored as catalogue data.',

    deliveryHandledAtCheckout:
      'Delivery is handled at checkout',
    deliveryInformation:
      'Customers will choose the available delivery or pickup option when placing an order. Product creation does not determine the delivery method.',

    cancel: 'Cancel',
    save: 'Save',
    saveService: 'Save Service',
    saveProduct: 'Save Product',

    piece: 'Piece',
    kilogram: 'Kilogram (kg)',
    gram: 'Gram (g)',
    litre: 'Litre (L)',
    millilitre: 'Millilitre (ml)',
    metre: 'Metre (m)',
    pack: 'Pack',
    box: 'Box',

    perService: 'Per Service',
    perHour: 'Per Hour',

    requiredName: '{item} name is required.',
    requiredDescription: '{item} description is required.',
    selectCategoryError: 'Please select a category.',
    priceGreaterThanZero: 'Price must be greater than 0.',
    stockNegative: 'Stock cannot be negative.',
    thresholdNegative:
      'Low-stock threshold cannot be negative.',
    thresholdGreaterThanStock:
      'Low-stock threshold cannot be greater than available stock.',
  }


const categoryLabels = {
Groceries: language === 'sw' ? 'Vyakula vya Nyumbani' : 'Groceries',
'Food & Restaurants':
language === 'sw' ? 'Chakula na Migahawa' : 'Food & Restaurants',
'Fashion & Clothing':
language === 'sw' ? 'Mitindo na Mavazi' : 'Fashion & Clothing',
'Beauty & Personal Care':
language === 'sw'
? 'Urembo na Huduma Binafsi'
: 'Beauty & Personal Care',
Electronics:
language === 'sw' ? 'Vifaa vya Elektroniki' : 'Electronics',
'Phones & Accessories':
language === 'sw'
? 'Simu na Vifaa Vyake'
: 'Phones & Accessories',
'Home & Furniture':
language === 'sw' ? 'Nyumbani na Samani' : 'Home & Furniture',
'Health & Wellness':
language === 'sw' ? 'Afya na Ustawi' : 'Health & Wellness',
'Books & Education':
language === 'sw' ? 'Vitabu na Elimu' : 'Books & Education',
'Crafts & Handmade':
language === 'sw' ? 'Ufundi na Bidhaa za Mikono' : 'Crafts & Handmade',
Agriculture:
language === 'sw' ? 'Kilimo' : 'Agriculture',
'Fish & Seafood':
language === 'sw' ? 'Samaki na Vyakula vya Baharini' : 'Fish & Seafood',
'Construction & Hardware':
language === 'sw'
? 'Ujenzi na Vifaa vya Ujenzi'
: 'Construction & Hardware',
Automotive:
language === 'sw' ? 'Magari na Vifaa' : 'Automotive',
'Technology & Digital Services':
language === 'sw'
? 'Teknolojia na Huduma za Kidijitali'
: 'Technology & Digital Services',
'Professional Services':
language === 'sw'
? 'Huduma za Kitaalamu'
: 'Professional Services',
'Cleaning Services':
language === 'sw'
? 'Huduma za Usafi'
: 'Cleaning Services',
'Transport & Delivery':
language === 'sw'
? 'Usafirishaji na Uwasilishaji'
: 'Transport & Delivery',
Accommodation:
language === 'sw' ? 'Malazi' : 'Accommodation',
'Events & Entertainment':
language === 'sw'
? 'Matukio na Burudani'
: 'Events & Entertainment',
Other:
language === 'sw' ? 'Nyingine' : 'Other',
}

const unitLabels = {
piece: text.piece,
kg: text.kilogram,
g: text.gram,
litre: text.litre,
ml: text.millilitre,
metre: text.metre,
pack: text.pack,
box: text.box,
}

const pricingLabels = {
per_service: text.perService,
per_hour: text.perHour,
}

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
stock:
type === 'service'
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


const itemName = isService
  ? text.service.toLowerCase()
  : text.productName.toLowerCase()

const itemDescription = isService
  ? text.service.toLowerCase()
  : text.productName.toLowerCase()

if (!form.name.trim()) {
  newErrors.name = text.requiredName.replace(
    '{item}',
    isService
      ? text.service
      : language === 'sw'
        ? 'bidhaa'
        : 'product',
  )
}

if (!form.description.trim()) {
  newErrors.description = text.requiredDescription.replace(
    '{item}',
    isService
      ? text.service
      : language === 'sw'
        ? 'bidhaa'
        : 'product',
  )
}

if (!form.category) {
  newErrors.category = text.selectCategoryError
}

if (
  form.price === '' ||
  Number.isNaN(Number(form.price)) ||
  Number(form.price) <= 0
) {
  newErrors.price = text.priceGreaterThanZero
}

if (!isService) {
  if (
    form.stock === '' ||
    Number.isNaN(Number(form.stock)) ||
    Number(form.stock) < 0
  ) {
    newErrors.stock = text.stockNegative
  }

  if (
    form.lowStockThreshold !== '' &&
    (
      Number.isNaN(Number(form.lowStockThreshold)) ||
      Number(form.lowStockThreshold) < 0
    )
  ) {
    newErrors.lowStockThreshold =
      text.thresholdNegative
  }

  if (
    form.stock !== '' &&
    form.lowStockThreshold !== '' &&
    Number(form.lowStockThreshold) > Number(form.stock)
  ) {
    newErrors.lowStockThreshold =
      text.thresholdGreaterThanStock
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

return ( <div
   className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
   role="dialog"
   aria-modal="true"
   aria-labelledby="add-product-title"
 > <div className="flex max-h-[95dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-2xl">

```
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
            {text.addProductOrService}
          </h2>

          <p className="text-xs text-gray-500">
            {text.addCatalogueItem}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-[#1B1C1C] focus:outline-none focus:ring-2 focus:ring-[#326460]/20"
        aria-label={text.closeForm}
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
            {text.whatAreYouSelling}
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
                  {text.physicalProduct}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {text.physicalProductDescription}
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
                  {text.service}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {text.serviceDescription}
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
              ? text.serviceName
              : text.productName}
          </label>

          <input
            id="product-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder={
              isService
                ? text.serviceNamePlaceholder
                : text.productNamePlaceholder
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
            {text.description}
          </label>

          <textarea
            id="product-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder={
              isService
                ? text.serviceDescriptionPlaceholder
                : text.productDescriptionPlaceholder
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
            {text.category}
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
              {text.selectCategory}
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {categoryLabels[category]}
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
                {text.soldBy}
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
                    {unitLabels[unit.value]}
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
                {text.availableStock}
              </label>

              <input
                id="product-stock"
                name="stock"
                type="number"
                min="0"
                step="0.01"
                value={form.stock}
                onChange={handleChange}
                placeholder={text.stockPlaceholder}
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
              {text.lowStockAlertAt}
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
              {text.lowStockDescription}
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
              {text.pricingType}
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
                  {pricingLabels[pricingType.value]}
                </option>
              ))}
            </select>

            <p className="mt-1.5 text-xs text-gray-500">
              {text.pricingDescription}
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
              ? text.priceTzs
              : text.pricePerUnitTzs}
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
              placeholder={text.pricePlaceholder}
              className={`w-full rounded-xl border py-3 pl-14 pr-4 text-sm outline-none transition focus:border-[#326460] focus:ring-2 focus:ring-[#326460]/10 ${
                errors.price
                  ? 'border-red-400'
                  : 'border-gray-200'
              }`}
            />
          </div>

          {!isService && (
            <p className="mt-1.5 text-xs text-gray-500">
              {text.productPriceExample}
            </p>
          )}

          {isService &&
            form.pricingType === 'per_service' && (
              <p className="mt-1.5 text-xs text-gray-500">
                {text.perServicePriceDescription}
              </p>
            )}

          {isService &&
            form.pricingType === 'per_hour' && (
              <p className="mt-1.5 text-xs text-gray-500">
                {text.perHourPriceDescription}
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
              ? text.serviceImage
              : text.productImage}
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
              {text.imageUploadLater}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {text.noPlaceholderImage}
            </p>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="rounded-xl border border-[#DCE9E6] bg-[#F3FAF8] p-4">
          <p className="text-sm font-semibold text-[#326460]">
            {text.deliveryHandledAtCheckout}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#455A58]">
            {text.deliveryInformation}
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
          {text.cancel}
        </button>

        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#326460] px-5 py-3 text-sm font-semibold !text-white shadow-sm transition hover:bg-[#28524F] focus:outline-none focus:ring-2 focus:ring-[#326460]/30 sm:w-auto"
        >
          <Save size={17} />

          {isService
            ? text.saveService
            : text.saveProduct}
        </button>

      </div>
    </form>
  </div>
</div>

)
}

export default AddProductForm
