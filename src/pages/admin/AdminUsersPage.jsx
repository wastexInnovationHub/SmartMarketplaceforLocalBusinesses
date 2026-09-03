import { useEffect, useMemo, useState } from 'react'
import {
  Edit3,
  MoreVertical,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  UserX,
  X,
} from 'lucide-react'

import { useLanguage } from '../../i18n/LanguageContext'

function AdminUsersPage() {
  const { language } = useLanguage()

  const text = {
    en: {
      users: 'Users',
      userManagement: 'User Management',
      description:
        'Manage customers, business owners, delivery riders and administrators registered on JamiiMarket.',

      addUser: 'Add User',
      totalUsers: 'Total Users',
      customers: 'Customers',
      businessOwners: 'Business Owners',
      deliveryRiders: 'Delivery Riders',

      searchPlaceholder:
        'Search by name, email or phone...',

      allRoles: 'All Roles',
      allStatus: 'All Status',
      active: 'Active',
      inactive: 'Inactive',

      administrators: 'Administrators',

      registeredUsers: 'Registered Users',
      userFound: 'user found',
      usersFound: 'users found',

      noUsersAvailable: 'No users available',
      noUsersDescription:
        'No marketplace users are currently available. Users will appear here when they are loaded from the backend or added through this interface.',

      phone: 'Phone',
      role: 'Role',
      status: 'Status',
      actions: 'Actions',

      customer: 'Customer',
      businessOwner: 'Business Owner',
      deliveryRider: 'Delivery Rider',
      administrator: 'Administrator',

      notProvided: 'Not provided',

      editUser: 'Edit User',
      viewDetails: 'View details',
      deleteUser: 'Delete user',
      activateUser: 'Activate user',
      deactivateUser: 'Deactivate user',

      updateUserInformation:
        'Update the user information.',
      createMarketplaceUser:
        'Create a marketplace user account.',

      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phoneNumber: 'Phone Number',

      cancel: 'Cancel',
      saveChanges: 'Save Changes',
      createUser: 'Create User',

      userDetails: 'User Details',
      userId: 'User ID',

      deleteUserQuestion: 'Delete User?',
      deleteConfirmation:
        'Are you sure you want to delete',
      deleteWarning:
        '? This action cannot be undone.',

      delete: 'Delete',

      requiredFields:
        'Please provide first name, last name and email.',
    },

    sw: {
      users: 'Watumiaji',
      userManagement: 'Usimamizi wa Watumiaji',
      description:
        'Simamia wateja, wamiliki wa biashara, waendesha mizigo na wasimamizi waliosajiliwa kwenye JamiiMarket.',

      addUser: 'Ongeza Mtumiaji',
      totalUsers: 'Watumiaji Wote',
      customers: 'Wateja',
      businessOwners: 'Wamiliki wa Biashara',
      deliveryRiders: 'Waendesha Mizigo',

      searchPlaceholder:
        'Tafuta kwa jina, barua pepe au simu...',

      allRoles: 'Majukumu Yote',
      allStatus: 'Hali Zote',
      active: 'Hai',
      inactive: 'Haifanyi Kazi',

      administrators: 'Wasimamizi',

      registeredUsers: 'Watumiaji Waliosajiliwa',
      userFound: 'mtumiaji amepatikana',
      usersFound: 'watumiaji wamepatikana',

      noUsersAvailable: 'Hakuna Watumiaji',
      noUsersDescription:
        'Hakuna watumiaji wa soko wanaopatikana kwa sasa. Watumiaji wataonekana hapa watakapopakiwa kutoka backend au kuongezwa kupitia sehemu hii.',

      phone: 'Simu',
      role: 'Jukumu',
      status: 'Hali',
      actions: 'Vitendo',

      customer: 'Mteja',
      businessOwner: 'Mmiliki wa Biashara',
      deliveryRider: 'Mwendesha Mizigo',
      administrator: 'Msimamizi',

      notProvided: 'Haijatolewa',

      editUser: 'Hariri Mtumiaji',
      viewDetails: 'Angalia Maelezo',
      deleteUser: 'Futa Mtumiaji',
      activateUser: 'Washa Mtumiaji',
      deactivateUser: 'Zima Mtumiaji',

      updateUserInformation:
        'Sasisha taarifa za mtumiaji.',
      createMarketplaceUser:
        'Unda akaunti ya mtumiaji wa soko.',

      firstName: 'Jina la Kwanza',
      lastName: 'Jina la Mwisho',
      email: 'Barua Pepe',
      phoneNumber: 'Namba ya Simu',

      cancel: 'Ghairi',
      saveChanges: 'Hifadhi Mabadiliko',
      createUser: 'Unda Mtumiaji',

      userDetails: 'Maelezo ya Mtumiaji',
      userId: 'Kitambulisho cha Mtumiaji',

      deleteUserQuestion: 'Futa Mtumiaji?',
      deleteConfirmation:
        'Una uhakika unataka kumfuta',
      deleteWarning:
        '? Kitendo hiki hakiwezi kutenduliwa.',

      delete: 'Futa',

      requiredFields:
        'Tafadhali jaza jina la kwanza, jina la mwisho na barua pepe.',
    },
  }

  const currentText =
    text[language === 'sw' ? 'sw' : 'en']

  // Users will eventually come from the backend.
  // Only users manually created in this interface are stored locally for now.
  const [users, setUsers] = useState([])

  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const [selectedUser, setSelectedUser] = useState(null)
  const [deleteUser, setDeleteUser] = useState(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'customer',
    status: 'active',
  })

  // Load locally created users
  useEffect(() => {
    const storedUsers = localStorage.getItem(
      'jamiiMarketAdminUsers'
    )

    if (!storedUsers) {
      return
    }

    try {
      const parsedUsers = JSON.parse(storedUsers)

      if (Array.isArray(parsedUsers)) {
        setUsers(parsedUsers)
      }
    } catch {
      console.error('Unable to load administrator users.')
    }
  }, [])

  // Save locally created users
  useEffect(() => {
    localStorage.setItem(
      'jamiiMarketAdminUsers',
      JSON.stringify(users)
    )
  }, [users])

  // Filter users
  const filteredUsers = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase()

    return users.filter((user) => {
      const fullName =
        `${user.firstName || ''} ${user.lastName || ''}`
          .trim()
          .toLowerCase()

      const matchesSearch =
        !normalizedSearch ||
        fullName.includes(normalizedSearch) ||
        user.email
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        user.phone
          ?.toLowerCase()
          .includes(normalizedSearch)

      const matchesRole =
        roleFilter === 'all' ||
        user.role === roleFilter

      const matchesStatus =
        statusFilter === 'all' ||
        user.status === statusFilter

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      )
    })
  }, [
    users,
    searchTerm,
    roleFilter,
    statusFilter,
  ])

  // Open add user form
  const openAddForm = () => {
    setEditingUser(null)

    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'customer',
      status: 'active',
    })

    setShowForm(true)
  }

  // Open edit user form
  const openEditForm = (user) => {
    setEditingUser(user)

    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'customer',
      status: user.status || 'active',
    })

    setShowForm(true)
  }

  // Close user form
  const closeForm = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  // Update form
  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  // Save user
  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim()
    ) {
      window.alert(currentText.requiredFields)
      return
    }

    if (editingUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...form,
                firstName:
                  form.firstName.trim(),
                lastName:
                  form.lastName.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
              }
            : user
        )
      )
    } else {
      const newUser = {
        id: Date.now(),
        ...form,
        firstName:
          form.firstName.trim(),
        lastName:
          form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        createdAt: new Date().toISOString(),
      }

      setUsers((current) => [
        newUser,
        ...current,
      ])
    }

    closeForm()
  }

  // Delete user
  const confirmDelete = () => {
    if (!deleteUser) {
      return
    }

    setUsers((current) =>
      current.filter(
        (user) => user.id !== deleteUser.id
      )
    )

    setDeleteUser(null)
    setSelectedUser(null)
  }

  // Toggle user status
  const toggleUserStatus = (user) => {
    setUsers((current) =>
      current.map((item) =>
        item.id === user.id
          ? {
              ...item,
              status:
                item.status === 'active'
                  ? 'inactive'
                  : 'active',
            }
          : item
      )
    )

    if (
      selectedUser &&
      selectedUser.id === user.id
    ) {
      setSelectedUser({
        ...user,
        status:
          user.status === 'active'
            ? 'inactive'
            : 'active',
      })
    }
  }

  // Format role
  const formatRole = (role) => {
    const roles = {
      customer: currentText.customer,
      business: currentText.businessOwner,
      delivery: currentText.deliveryRider,
      admin: currentText.administrator,
    }

    return roles[role] || role
  }

  // Format status
  const formatStatus = (status) => {
    return status === 'active'
      ? currentText.active
      : currentText.inactive
  }

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                {currentText.users}
              </p>

              <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                {currentText.userManagement}
              </h1>
            </div>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {currentText.description}
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5" />
          {currentText.addUser}
        </button>
      </div>

      {/* Statistics */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={currentText.totalUsers}
          value={users.length}
        />

        <StatCard
          title={currentText.customers}
          value={
            users.filter(
              (user) => user.role === 'customer'
            ).length
          }
        />

        <StatCard
          title={currentText.businessOwners}
          value={
            users.filter(
              (user) => user.role === 'business'
            ).length
          }
        />

        <StatCard
          title={currentText.deliveryRiders}
          value={
            users.filter(
              (user) => user.role === 'delivery'
            ).length
          }
        />
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_180px]">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder={
                currentText.searchPlaceholder
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">
              {currentText.allRoles}
            </option>

            <option value="customer">
              {currentText.customers}
            </option>

            <option value="business">
              {currentText.businessOwners}
            </option>

            <option value="delivery">
              {currentText.deliveryRiders}
            </option>

            <option value="admin">
              {currentText.administrators}
            </option>
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">
              {currentText.allStatus}
            </option>

            <option value="active">
              {currentText.active}
            </option>

            <option value="inactive">
              {currentText.inactive}
            </option>
          </select>
        </div>
      </section>

      {/* Users table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-slate-900">
            {currentText.registeredUsers}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredUsers.length}{' '}
            {filteredUsers.length === 1
              ? currentText.userFound
              : currentText.usersFound}
          </p>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <UsersIcon />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-800">
              {currentText.noUsersAvailable}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {currentText.noUsersDescription}
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              {currentText.addUser}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {currentText.users}
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {currentText.phone}
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {currentText.role}
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {currentText.status}
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {currentText.actions}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => {
                  const initials =
                    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`
                      .toUpperCase() || 'U'

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedUser(user)
                          }
                          className="flex items-center gap-3 text-left"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                            {initials}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {user.firstName}{' '}
                              {user.lastName}
                            </p>

                            <p className="text-sm text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </button>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {user.phone ||
                          currentText.notProvided}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                          {formatRole(user.role)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {formatStatus(
                            user.status
                          )}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              openEditForm(user)
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                            title={
                              currentText.editUser
                            }
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toggleUserStatus(user)
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                            title={
                              user.status === 'active'
                                ? currentText.deactivateUser
                                : currentText.activateUser
                            }
                          >
                            {user.status === 'active' ? (
                              <UserX className="h-4 w-4" />
                            ) : (
                              <UserCheck className="h-4 w-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteUser(user)
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            title={
                              currentText.deleteUser
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedUser(user)
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            title={
                              currentText.viewDetails
                            }
                          >
                            <MoreVertical className="h-4 w-4" />
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

      {/* Add / Edit User modal */}
      {showForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingUser
                    ? currentText.editUser
                    : currentText.addUser}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingUser
                    ? currentText.updateUserInformation
                    : currentText.createMarketplaceUser}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  id="firstName"
                  name="firstName"
                  label={currentText.firstName}
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />

                <FormInput
                  id="lastName"
                  name="lastName"
                  label={currentText.lastName}
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <FormInput
                id="email"
                name="email"
                type="email"
                label={currentText.email}
                value={form.email}
                onChange={handleChange}
                required
              />

              <FormInput
                id="phone"
                name="phone"
                type="tel"
                label={currentText.phoneNumber}
                value={form.phone}
                onChange={handleChange}
                placeholder="+255..."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormSelect
                  id="role"
                  name="role"
                  label={currentText.role}
                  value={form.role}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'customer',
                      label: currentText.customer,
                    },
                    {
                      value: 'business',
                      label:
                        currentText.businessOwner,
                    },
                    {
                      value: 'delivery',
                      label:
                        currentText.deliveryRider,
                    },
                    {
                      value: 'admin',
                      label:
                        currentText.administrator,
                    },
                  ]}
                />

                <FormSelect
                  id="status"
                  name="status"
                  label={currentText.status}
                  value={form.status}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'active',
                      label: currentText.active,
                    },
                    {
                      value: 'inactive',
                      label: currentText.inactive,
                    },
                  ]}
                />
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {currentText.cancel}
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {editingUser
                    ? currentText.saveChanges
                    : currentText.createUser}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User details modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <h2 className="text-xl font-bold text-slate-900">
                {currentText.userDetails}
              </h2>

              <button
                type="button"
                onClick={() =>
                  setSelectedUser(null)
                }
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close user details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                  {`${selectedUser.firstName?.[0] || ''}${selectedUser.lastName?.[0] || ''}`
                    .toUpperCase()}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {selectedUser.firstName}{' '}
                    {selectedUser.lastName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <DetailItem
                  label={currentText.phone}
                  value={
                    selectedUser.phone ||
                    currentText.notProvided
                  }
                />

                <DetailItem
                  label={currentText.role}
                  value={formatRole(
                    selectedUser.role
                  )}
                />

                <DetailItem
                  label={currentText.status}
                  value={formatStatus(
                    selectedUser.status
                  )}
                />

                <DetailItem
                  label={currentText.userId}
                  value={String(
                    selectedUser.id
                  )}
                />
              </div>

              <div className="flex gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUser(null)
                    openEditForm(selectedUser)
                  }}
                  className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {currentText.editUser}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedUser(null)
                    setDeleteUser(selectedUser)
                  }}
                  className="flex-1 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  {currentText.deleteUser}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteUser && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              {currentText.deleteUserQuestion}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {currentText.deleteConfirmation}{' '}
              <span className="font-semibold text-slate-700">
                {deleteUser.firstName}{' '}
                {deleteUser.lastName}
              </span>
              {currentText.deleteWarning}
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setDeleteUser(null)
                }
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {currentText.cancel}
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                {currentText.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// Statistics card
function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  )
}

// Empty-state icon
function UsersIcon() {
  return (
    <UserPlus className="h-8 w-8 text-slate-400" />
  )
}

// Reusable form input
function FormInput({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  )
}

// Reusable form select
function FormSelect({
  id,
  name,
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// Reusable detail item
function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  )
}

export default AdminUsersPage