import { useMemo, useState } from 'react'
import {
  CheckCircle,
  Eye,
  KeyRound,
  Mail,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCog,
  X,
  XCircle,
} from 'lucide-react'

const initialAdmins = []

const adminStatuses = ['active', 'inactive']

const formatStatus = (status) => {
  if (!status) return 'Unknown'

  return status.charAt(0).toUpperCase() + status.slice(1)
}

const getStatusClasses = (status) => {
  switch (status) {
    case 'active':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700'

    case 'inactive':
      return 'border-slate-200 bg-slate-50 text-slate-600'

    default:
      return 'border-slate-200 bg-slate-50 text-slate-700'
  }
}

function AdminManagementPage() {
  const [admins, setAdmins] = useState(initialAdmins)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [deletingAdmin, setDeletingAdmin] = useState(null)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'active',
  })

  const filteredAdmins = useMemo(() => {
    const searchValue = search.trim().toLowerCase()

    return admins.filter((admin) => {
      const fullName = `${admin.firstName || ''} ${
        admin.lastName || ''
      }`.trim()

      const matchesSearch =
        !searchValue ||
        fullName.toLowerCase().includes(searchValue) ||
        admin.email?.toLowerCase().includes(searchValue) ||
        admin.phone?.toLowerCase().includes(searchValue)

      const matchesStatus =
        statusFilter === 'all' ||
        admin.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [admins, search, statusFilter])

  const totalAdmins = admins.length

  const activeAdmins = admins.filter(
    (admin) => admin.status === 'active'
  ).length

  const inactiveAdmins = admins.filter(
    (admin) => admin.status === 'inactive'
  ).length

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      status: 'active',
    })
  }

  // Open the add administrator modal
  const openAddModal = () => {
    resetForm()
    setIsAddModalOpen(true)
  }

  // Open the edit administrator modal
  const openEditModal = (admin) => {
    setForm({
      firstName: admin.firstName || '',
      lastName: admin.lastName || '',
      email: admin.email || '',
      phone: admin.phone || '',
      status: admin.status || 'active',
    })

    setEditingAdmin(admin)
  }

  // Handle administrator form changes
  const handleFormChange = (event) => {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  // Add a new administrator to frontend state
  const handleAddAdmin = (event) => {
    event.preventDefault()

    const newAdmin = {
      id: Date.now(),
      ...form,
      role: 'admin',
      createdAt: new Date().toISOString(),
    }

    setAdmins((currentAdmins) => [
      ...currentAdmins,
      newAdmin,
    ])

    setIsAddModalOpen(false)
    resetForm()
  }

  // Update an administrator in frontend state
  const handleEditAdmin = (event) => {
    event.preventDefault()

    setAdmins((currentAdmins) =>
      currentAdmins.map((admin) =>
        admin.id === editingAdmin.id
          ? {
              ...admin,
              ...form,
              role: 'admin',
              updatedAt: new Date().toISOString(),
            }
          : admin
      )
    )

    setEditingAdmin(null)
    resetForm()
  }

  // Toggle administrator status
  const toggleAdminStatus = (adminId) => {
    setAdmins((currentAdmins) =>
      currentAdmins.map((admin) =>
        admin.id === adminId
          ? {
              ...admin,
              status:
                admin.status === 'active'
                  ? 'inactive'
                  : 'active',
            }
          : admin
      )
    )
  }

  // Delete administrator from frontend state
  const handleDeleteAdmin = () => {
    if (!deletingAdmin) return

    setAdmins((currentAdmins) =>
      currentAdmins.filter(
        (admin) => admin.id !== deletingAdmin.id
      )
    )

    setDeletingAdmin(null)
  }

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            System Administration
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Admin Management
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Manage administrator accounts and control who
            can access the JamiiMarket administration portal.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Administrator
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={ShieldCheck}
          label="Total Administrators"
          value={totalAdmins}
          description="Registered admin accounts"
        />

        <StatCard
          icon={CheckCircle}
          label="Active Administrators"
          value={activeAdmins}
          description="Currently enabled"
        />

        <StatCard
          icon={UserCog}
          label="Inactive Administrators"
          value={inactiveAdmins}
          description="Currently disabled"
        />
      </div>

      {/* Administrator management */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search and filters */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Administrator Accounts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage administrator access.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search administrators..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-64"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              >
                <option value="all">All Statuses</option>

                {adminStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Administrator table */}
        {filteredAdmins.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-[950px] w-full">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Administrator
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Role
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAdmins.map((admin) => {
                  const fullName =
                    `${admin.firstName || ''} ${
                      admin.lastName || ''
                    }`.trim() || 'Administrator'

                  return (
                    <tr
                      key={admin.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                            {fullName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {fullName}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Administrator account
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700">
                          {admin.email ||
                            'Email unavailable'}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {admin.phone ||
                            'Phone unavailable'}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          Administrator
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            admin.status
                          )}`}
                        >
                          {formatStatus(admin.status)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedAdmin(admin)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            title="View administrator"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(admin)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            title="Edit administrator"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toggleAdminStatus(admin.id)
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            {admin.status === 'active'
                              ? 'Disable'
                              : 'Activate'}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeletingAdmin(admin)
                            }
                            className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                            title="Delete administrator"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <ShieldCheck size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No administrator accounts
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              No administrator records are currently
              available. Real administrator accounts will be
              loaded from the backend when authentication and
              role management are connected.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={17} />
              Add Administrator
            </button>
          </div>
        )}
      </div>

      {/* Security notice */}
      <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
        <div className="flex gap-3">
          <KeyRound
            size={20}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <div>
            <h3 className="font-semibold text-red-900">
              Administrator security
            </h3>

            <p className="mt-1 text-sm leading-6 text-red-800">
              Administrator creation, passwordless
              authentication, JWT validation, permissions,
              account disabling, and access control must be
              enforced by the backend. Frontend controls alone
              must never be treated as security.
            </p>
          </div>
        </div>
      </div>

      {/* Add administrator modal */}
      {isAddModalOpen && (
        <AdminFormModal
          title="Add Administrator"
          form={form}
          onChange={handleFormChange}
          onSubmit={handleAddAdmin}
          onClose={() => {
            setIsAddModalOpen(false)
            resetForm()
          }}
          submitLabel="Add Administrator"
        />
      )}

      {/* Edit administrator modal */}
      {editingAdmin && (
        <AdminFormModal
          title="Edit Administrator"
          form={form}
          onChange={handleFormChange}
          onSubmit={handleEditAdmin}
          onClose={() => {
            setEditingAdmin(null)
            resetForm()
          }}
          submitLabel="Save Changes"
        />
      )}

      {/* View administrator modal */}
      {selectedAdmin && (
        <Modal
          title="Administrator Details"
          onClose={() => setSelectedAdmin(null)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              label="First Name"
              value={selectedAdmin.firstName}
            />

            <DetailItem
              label="Last Name"
              value={selectedAdmin.lastName}
            />

            <DetailItem
              label="Email"
              value={selectedAdmin.email}
            />

            <DetailItem
              label="Phone"
              value={selectedAdmin.phone}
            />

            <DetailItem
              label="Role"
              value="Administrator"
            />

            <DetailItem
              label="Status"
              value={formatStatus(
                selectedAdmin.status
              )}
            />

            <DetailItem
              label="Created"
              value={selectedAdmin.createdAt}
            />

            <DetailItem
              label="Updated"
              value={selectedAdmin.updatedAt}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setSelectedAdmin(null)}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Delete confirmation modal */}
      {deletingAdmin && (
        <Modal
          title="Delete Administrator"
          onClose={() => setDeletingAdmin(null)}
        >
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm leading-6 text-red-800">
              Are you sure you want to remove this
              administrator from the current frontend list?
              The production backend must enforce deletion
              permissions.
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeletingAdmin(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDeleteAdmin}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </Modal>
      )}
    </section>
  )
}

// Statistics card
function StatCard({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}

// Administrator form modal
function AdminFormModal({
  title,
  form,
  onChange,
  onSubmit,
  onClose,
  submitLabel,
}) {
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            required
          />

          <FormField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            required
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <FormField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
          />

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {adminStatuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
          <div className="flex gap-3">
            <Mail
              size={18}
              className="mt-0.5 shrink-0 text-indigo-600"
            />

            <p className="text-sm leading-6 text-indigo-800">
              Authentication credentials and administrator
              permissions will be handled by the backend.
              This form currently manages frontend state only.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <ShieldCheck size={17} />
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  )
}

// Form field
function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  )
}

// Detail item
function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-900">
        {value || 'Not available'}
      </p>
    </div>
  )
}

// Reusable modal
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminManagementPage

