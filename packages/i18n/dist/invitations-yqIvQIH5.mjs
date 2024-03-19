const e = {
  header: "Confirmation (fr)",
  confirm: {
    resend: {
      message: "Are you sure you want to resend? (fr)"
    },
    revoke: {
      message: "Are you sure you want to revoke? (fr)"
    }
  }
}, r = {
  actions: {
    cancel: "Cancel (fr)",
    submit: "Invite user (fr)"
  },
  fields: {
    app: {
      label: "App (fr)",
      placeholder: "Select app (fr)"
    },
    email: {
      label: "Email (fr)",
      placeholder: ""
    },
    expiresAfter: {
      label: "Expires after (fr)",
      placeholder: "Enter number of days (fr)"
    },
    expiresAt: {
      label: "Expires at (fr)",
      placeholder: "Select a date (fr)"
    },
    role: {
      label: "Role (fr)",
      placeholder: "Select role (fr)"
    }
  }
}, i = {
  actions: {
    resend: "Resend (fr)",
    revoke: "Revoke (fr)"
  },
  title: "Invitation (fr)",
  messages: {
    acceptedInvitation: "Invitation already accepted (fr)",
    errorFetchingInvitation: "Invalid token. Please contact your administrator (fr)",
    errorAcceptingInvitation: "Error accepting invitation (fr)",
    invalidInvitation: "Invitation is no longer valid (fr)"
  }
}, t = {
  invite: {
    success: "Successfully invited user (fr)",
    error: "Error inviting user (fr)"
  },
  resend: {
    success: "Successfully resent invitation (fr)",
    error: "Error resending invitation (fr)"
  },
  revoke: {
    success: "Successfully revoked invitation (fr)",
    error: "Error revoking invitation (fr)"
  }
}, a = {
  button: {
    label: "Invite user (fr)"
  },
  dialog: {
    header: "Invite a user (fr)"
  }
}, o = {
  defaultColumns: {
    email: "Email (fr)",
    role: "Role (fr)",
    invitedBy: "Invited by (fr)",
    expiresAt: "Expires at (fr)",
    actions: "Actions (fr)",
    app: "App (fr)"
  },
  pagination: {
    pageControl: "Go to (fr)",
    rowsPerPage: "Rows (fr)"
  },
  searchPlaceholder: "",
  emptyMessage: "Table is empty (fr)",
  title: "Invitations (fr)"
}, n = {
  messages: {
    app: "App is required (fr)",
    email: "Email is required (fr)",
    expiresAt: "Expiry date is required (fr)",
    validEmail: "Email must be a valid email (fr)",
    requiredField: "This field is required (fr)",
    role: "Role is required (fr)"
  }
}, s = {
  confirmation: e,
  form: r,
  invitations: i,
  messages: t,
  modal: a,
  table: o,
  validation: n
};
export {
  e as confirmation,
  s as default,
  r as form,
  i as invitations,
  t as messages,
  a as modal,
  o as table,
  n as validation
};
//# sourceMappingURL=invitations-yqIvQIH5.mjs.map
