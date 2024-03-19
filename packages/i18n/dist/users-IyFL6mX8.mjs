const e = {
  actions: {
    invite: "Invite user",
    enable: "Enable user",
    disable: "Disable user"
  },
  title: "Users",
  defaultColumns: {
    actions: "Actions",
    email: "Email",
    roles: "Roles",
    name: "Name",
    signedUpOn: "Signed up on",
    status: "Status"
  },
  pagination: {
    pageControl: "Go to",
    rowsPerPage: "Rows"
  },
  searchPlaceholder: "Search"
}, s = {
  active: "Active",
  disabled: "Disabled",
  enabled: "Enabled",
  invited: "Invited"
}, a = {
  header: "Confirmation",
  enable: {
    message: "Are you sure you want to enable this user?"
  },
  disable: {
    message: "Are you sure you want to disable this user?"
  }
}, t = {
  enable: {
    success: "User enabled successfully",
    error: "Error enabling user"
  },
  disable: {
    success: "User disabled successfully",
    error: "Error disabling user"
  }
}, n = {
  table: e,
  status: s,
  confirmation: a,
  messages: t
};
export {
  a as confirmation,
  n as default,
  t as messages,
  s as status,
  e as table
};
//# sourceMappingURL=users-IyFL6mX8.mjs.map
