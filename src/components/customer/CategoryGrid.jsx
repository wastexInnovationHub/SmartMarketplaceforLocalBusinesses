import {
  ShoppingBag,
  Utensils,
  Wrench,
  Brush,
} from 'lucide-react'

const categories = [
  {
    name: 'Retail',
    icon: ShoppingBag,
    iconClass: 'bg-[#B8EDE6]/30 text-[#326460]',
  },
  {
    name: 'Food',
    icon: Utensils,
    iconClass: 'bg-[#EFDEC0]/60 text-[#695D46]',
  },
  {
    name: 'Services',
    icon: Wrench,
    iconClass: 'bg-[#C0573E]/20 text-[#A03F28]',
  },
  {
    name: 'Crafts',
    icon: Brush,
    iconClass: 'bg-[#B8EDE6]/30 text-[#326460]',
  },
]

function CategoryGrid() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-[#1B1C1C]">
        Categories
      </h2>

      <div className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8">
        {categories.map((category) => {
          const Icon = category.icon

          return (
            <button
              key={category.name}
              type="button"
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-[#EFDEC0] bg-white p-3 transition hover:border-[#C0573E] hover:shadow-[0_4px_12px_rgba(192,87,62,0.08)]"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition ${category.iconClass}`}
              >
                <Icon size={22} />
              </div>

              <span className="text-center text-xs font-medium text-[#1B1C1C]">
                {category.name}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default CategoryGrid

