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

import { useLanguage } from '../../i18n/LanguageContext'

const initialAdmins = []

const adminStatuses = ['active', 'inactive']

const formatStatus = (status, language) => {
  if (!status) {
    return language === 'sw' ? 'Haijulikani' : 'Unknown'
  }

  if (language === 'sw') {
    return status === 'active' ? 'Hai' : 'Haifanyi Kazi'
  }

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
  const { language } = useLanguage()

  const text =
    language === 'sw'
      ? {
          systemAdministration: 'Usimamizi wa Mfumo',
          adminManagement: 'Usimamizi wa Admin',
          pageDescription:
            'Simamia akaunti za wasimamizi na udhibiti wanaoweza kufikia sehemu ya usimamizi ya JamiiMarket.',
          addAdministrator: 'Ongeza Msimamizi',

          totalAdministrators: 'Jumla ya Wasimamizi',
          registeredAdminAccounts: 'Akaunti za wasimamizi zilizosajiliwa',
          activeAdministrators: 'Wasimamizi Wanaofanya Kazi',
          currentlyEnabled: 'Waliowezeshwa kwa sasa',
          inactiveAdministrators: 'Wasimamizi Wasiotumika',
          currentlyDisabled: 'Waliozuiwa kwa sasa',

          administratorAccounts: 'Akaunti za Wasimamizi',
          manageAccess: 'Angalia na simamia ruhusa za wasimamizi.',
          searchAdministrators: 'Tafuta wasimamizi...',
          allStatuses: 'Hali Zote',
          active: 'Hai',
          inactive: 'Haifanyi Kazi',

          administrator: 'Msimamizi',
          administratorAccount: 'Akaunti ya msimamizi',
          contact: 'Mawasiliano',
          role: 'Jukumu',
          status: 'Hali',
          actions: 'Vitendo',

          emailUnavailable: 'Barua pepe haipatikani',
          phoneUnavailable: 'Namba ya simu haipatikani',

          viewAdministrator: 'Angalia msimamizi',
          editAdministrator: 'Hariri msimamizi',
          deleteAdministrator: 'Futa msimamizi',
          disable: 'Zima',
          activate: 'Washa',

          noAdministratorAccounts: 'Hakuna akaunti za wasimamizi',
          noAdministratorRecords:
            'Kwa sasa hakuna taarifa za wasimamizi. Akaunti halisi za wasimamizi zita loaded kutoka backend baada ya mfumo wa uthibitishaji na usimamizi wa majukumu kuunganishwa.',

          administratorSecurity: 'Usalama wa Msimamizi',
          securityDescription:
            'Uundaji wa wasimamizi, uthibitishaji usiohitaji nenosiri, JWT, ruhusa, kuzima akaunti, na udhibiti wa ufikiaji lazima vitekelezwe na backend. Udhibiti wa frontend pekee haupaswi kuchukuliwa kama usalama.',

          editAdministratorTitle: 'Hariri Msimamizi',
          administratorDetails: 'Maelezo ya Msimamizi',
          firstName: 'Jina la Kwanza',
          lastName: 'Jina la Mwisho',
          email: 'Barua Pepe',
          phone: 'Namba ya Simu',
          created: 'Imeundwa',
          updated: 'Imesasishwa',

          close: 'Funga',
          deleteAdministratorTitle: 'Futa Msimamizi',
          deleteConfirmation:
            'Una uhakika unataka kumuondoa msimamizi huyu kwenye orodha ya sasa ya frontend? Backend ya mfumo wa uzalishaji lazima idhibiti ruhusa za kufuta akaunti.',
          cancel: 'Ghairi',
          delete: 'Futa',

          authenticationNotice:
            'Taarifa za uthibitishaji na ruhusa za wasimamizi zitasimamiwa na backend. Fomu hii kwa sasa inasimamia hali ya frontend pekee.',
          saveChanges: 'Hifadhi Mabadiliko',
          notAvailable: 'Haipatikani',
          closeModal: 'Funga dirisha',

          addAdministratorTitle: 'Ongeza Msimamizi',
          administratorStatus: 'Hali',
        }
      : {
          systemAdministration: 'System Administration',
          adminManagement: 'Admin Management',
          pageDescription:
            'Manage administrator accounts and control who can access the JamiiMarket administration portal.',
          addAdministrator: 'Add Administrator',

          totalAdministrators: 'Total Administrators',
          registeredAdminAccounts: 'Registered admin accounts',
          activeAdministrators: 'Active Administrators',
          currentlyEnabled: 'Currently enabled',
          inactiveAdministrators: 'Inactive Administrators',
          currentlyDisabled: 'Currently disabled',

          administratorAccounts: 'Administrator Accounts',
          manageAccess: 'View and manage administrator access.',
          searchAdministrators: 'Search administrators...',
          allStatuses: 'All Statuses',
          active: 'Active',
          inactive: 'Inactive',

          administrator: 'Administrator',
          administratorAccount: 'Administrator account',
          contact: 'Contact',
          role: 'Role',
          status: 'Status',
          actions: 'Actions',

          emailUnavailable: 'Email unavailable',
          phoneUnavailable: 'Phone unavailable',

          viewAdministrator: 'View administrator',
          editAdministrator: 'Edit administrator',
          deleteAdministrator: 'Delete administrator',
          disable: 'Disable',
          activate: 'Activate',

          noAdministratorAccounts: 'No administrator accounts',
          noAdministratorRecords:
            'No administrator records are currently available. Real administrator accounts will be loaded from the backend when authentication and role management are connected.',

          administratorSecurity: 'Administrator security',
          securityDescription:
            'Administrator creation, passwordless authentication, JWT validation, permissions, account disabling, and access control must be enforced by the backend. Frontend controls alone must never be treated as security.',

          editAdministratorTitle: 'Edit Administrator',
          administratorDetails: 'Administrator Details',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          phone: 'Phone',
          created: 'Created',
          updated: 'Updated',

          close: 'Close',
          deleteAdministratorTitle: 'Delete Administrator',
          deleteConfirmation:
            'Are you sure you want to remove this administrator from the current frontend list? The production backend must enforce deletion permissions.',
          cancel: 'Cancel',
          delete: 'Delete',

          authenticationNotice:
            'Authentication credentials and administrator permissions will be handled by the backend. This form currently manages frontend state only.',
          saveChanges: 'Save Changes',
          notAvailable: 'Not available',
          closeModal: 'Close modal',

          addAdministratorTitle: 'Add Administrator',
          administratorStatus: 'Status',
        }

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
    (admin) => admin.status === 'active',
  ).length

  const inactiveAdmins = admins.filter(
    (admin) => admin.status === 'inactive',
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
          : admin,
      ),
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
          : admin,
      ),
    )
  }

  // Delete administrator from frontend state
  const handleDeleteAdmin = () => {
    if (!deletingAdmin) return

    setAdmins((currentAdmins) =>
      currentAdmins.filter(
        (admin) => admin.id !== deletingAdmin.id,
      ),
    )

    setDeletingAdmin(null)
  }

  return (
    <section className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            {text.systemAdministration}
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {text.adminManagement}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            {text.pageDescription}
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          {text.addAdministrator}
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={ShieldCheck}
          label={text.totalAdministrators}
          value={totalAdmins}
          description={text.registeredAdminAccounts}
        />

        <StatCard
          icon={CheckCircle}
          label={text.activeAdministrators}
          value={activeAdmins}
          description={text.currentlyEnabled}
        />

        <StatCard
          icon={UserCog}
          label={text.inactiveAdministrators}
          value={inactiveAdmins}
          description={text.currentlyDisabled}
        />
      </div>

      {/* Administrator management */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search and filters */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {text.administratorAccounts}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {text.manageAccess}
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
                  placeholder={text.searchAdministrators}
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
                <option value="all">{text.allStatuses}</option>

                {adminStatuses.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status, language)}
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
                    {text.administrator}
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.contact}
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.role}
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.status}
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {text.actions}
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAdmins.map((admin) => {
                  const fullName =
                    `${admin.firstName || ''} ${
                      admin.lastName || ''
                    }`.trim() || text.administrator

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
                              {text.administratorAccount}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-700">
                          {admin.email ||
                            text.emailUnavailable}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {admin.phone ||
                            text.phoneUnavailable}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          {text.administrator}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            admin.status,
                          )}`}
                        >
                          {formatStatus(
                            admin.status,
                            language,
                          )}
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
                            title={text.viewAdministrator}
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(admin)
                            }
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            title={text.editAdministrator}
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
                              ? text.disable
                              : text.activate}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeletingAdmin(admin)
                            }
                            className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"
                            title={text.deleteAdministrator}
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
              {text.noAdministratorAccounts}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {text.noAdministratorRecords}
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={17} />
              {text.addAdministrator}
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
              {text.administratorSecurity}
            </h3>

            <p className="mt-1 text-sm leading-6 text-red-800">
              {text.securityDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Add administrator modal */}
      {isAddModalOpen && (
        <AdminFormModal
          title={text.addAdministratorTitle}
          form={form}
          onChange={handleFormChange}
          onSubmit={handleAddAdmin}
          onClose={() => {
            setIsAddModalOpen(false)
            resetForm()
          }}
          submitLabel={text.addAdministrator}
          text={text}
          language={language}
        />
      )}

      {/* Edit administrator modal */}
      {editingAdmin && (
        <AdminFormModal
          title={text.editAdministratorTitle}
          form={form}
          onChange={handleFormChange}
          onSubmit={handleEditAdmin}
          onClose={() => {
            setEditingAdmin(null)
            resetForm()
          }}
          submitLabel={text.saveChanges}
          text={text}
          language={language}
        />
      )}

      {/* View administrator modal */}
      {selectedAdmin && (
        <Modal
          title={text.administratorDetails}
          onClose={() => setSelectedAdmin(null)}
          closeLabel={text.closeModal}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              label={text.firstName}
              value={selectedAdmin.firstName}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.lastName}
              value={selectedAdmin.lastName}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.email}
              value={selectedAdmin.email}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.phone}
              value={selectedAdmin.phone}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.role}
              value={text.administrator}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.status}
              value={formatStatus(
                selectedAdmin.status,
                language,
              )}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.created}
              value={selectedAdmin.createdAt}
              fallback={text.notAvailable}
            />

            <DetailItem
              label={text.updated}
              value={selectedAdmin.updatedAt}
              fallback={text.notAvailable}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => setSelectedAdmin(null)}
              className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {text.close}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete confirmation modal */}
      {deletingAdmin && (
        <Modal
          title={text.deleteAdministratorTitle}
          onClose={() => setDeletingAdmin(null)}
          closeLabel={text.closeModal}
        >
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm leading-6 text-red-800">
              {text.deleteConfirmation}
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeletingAdmin(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {text.cancel}
            </button>

            <button
              type="button"
              onClick={handleDeleteAdmin}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              <Trash2 size={16} />
              {text.delete}
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
  text,
  language,
}) {
  return (
    <Modal
      title={title}
      onClose={onClose}
      closeLabel={text.closeModal}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label={text.firstName}
            name="firstName"
            value={form.firstName}
            onChange={onChange}
            required
          />

          <FormField
            label={text.lastName}
            name="lastName"
            value={form.lastName}
            onChange={onChange}
            required
          />

          <FormField
            label={text.email}
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <FormField
            label={text.phone}
            name="phone"
            value={form.phone}
            onChange={onChange}
          />

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              {text.administratorStatus}
            </label>

            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {adminStatuses.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status, language)}
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
              {text.authenticationNotice}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {text.cancel}
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
function DetailItem({ label, value, fallback }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-900">
        {value || fallback}
      </p>
    </div>
  )
}

// Reusable modal
function Modal({ title, children, onClose, closeLabel }) {
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
            aria-label={closeLabel}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export default AdminManagementPage

