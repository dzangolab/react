const e = {
  header: "Confirmation",
  confirm: {
    resend: {
      message: "Are you sure you want to resend?"
    },
    revoke: {
      message: "Are you sure you want to revoke?"
    }
  }
}, i = {
  actions: {
    cancel: "Cancel",
    submit: "Invite user"
  },
  fields: {
    app: {
      label: "App",
      placeholder: "Select app"
    },
    email: {
      label: "Email",
      placeholder: ""
    },
    expiresAfter: {
      label: "Expires after",
      placeholder: "Enter number of days"
    },
    expiresAt: {
      label: "Expires at",
      placeholder: "Select a date"
    },
    role: {
      label: "Role",
      placeholder: "Select role"
    }
  }
}, t = {
  actions: {
    resend: "Resend",
    revoke: "Revoke"
  },
  title: "Invitation",
  messages: {
    acceptedInvitation: "Invitation already accepted",
    errorFetchingInvitation: "Invalid token. Please contact your administrator.",
    errorAcceptingInvitation: "Error accepting invitation.",
    invalidInvitation: "Invitation is no longer valid"
  }
}, a = {
  invite: {
    success: "Successfully invited user",
    error: "Error inviting user"
  },
  resend: {
    success: "Successfully resent invitation",
    error: "Error resending invitation"
  },
  revoke: {
    success: "Successfully revoked invitation",
    error: "Error revoking invitation"
  }
}, r = {
  button: {
    label: "Invite user"
  },
  dialog: {
    header: "Invite a user"
  }
}, o = {
  defaultColumns: {
    email: "Email",
    role: "Role",
    invitedBy: "Invited by",
    expiresAt: "Expires at",
    actions: "Actions",
    app: "App"
  },
  pagination: {
    pageControl: "Go to",
    rowsPerPage: "Rows"
  },
  searchPlaceholder: "",
  emptyMessage: "Table is empty",
  title: "Invitations"
}, n = {
  messages: {
    app: "App is required",
    email: "Email is required",
    expiresAt: "Expiry date is required",
    validEmail: "Email must be a valid email",
    requiredField: "This field is required",
    role: "Role is required"
  }
}, s = {
  confirmation: e,
  form: i,
  invitations: t,
  messages: a,
  modal: r,
  table: o,
  validation: n
};
export {
  e as confirmation,
  s as default,
  i as form,
  t as invitations,
  a as messages,
  r as modal,
  o as table,
  n as validation
};
//# sourceMappingURL=invitations-9M4JnNho.mjs.map
