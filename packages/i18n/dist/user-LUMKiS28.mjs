const s = {
  form: {
    actions: {
      submit: "Change password (fr)"
    },
    oldPassword: {
      label: "Old password (fr)"
    },
    newPassword: {
      label: "New password (fr)"
    },
    confirmPassword: {
      label: "Confirm password (fr)"
    }
  },
  messages: {
    success: "Your password was successfully changed. (fr)",
    validation: {
      oldPassword: "Old password is required (fr)",
      newPassword: "New password is required (fr)",
      confirmPassword: "Confirm password is required (fr)",
      mustMatch: "Passwords must match (fr)"
    }
  },
  title: "Change password (fr)"
}, e = {
  links: {
    login: "Back to login (fr)"
  },
  messages: {
    success: "Email sent sucessfully (fr)",
    validation: {
      email: "Email is required (fr)"
    }
  },
  form: {
    actions: {
      submit: "Email me (fr)"
    },
    email: {
      label: "Your email (fr)",
      placeholder: ""
    }
  },
  title: "Forgot password (fr)"
}, r = {
  title: "Register first user (fr)",
  login: {
    messages: {
      error: "Automatic login failed. Redirecting to login page for manual login (fr)"
    }
  },
  signup: {
    messages: {
      error: "Error signing up first user (fr)",
      success: "Succefully added first user. Automatically logging in ... (fr)"
    }
  }
}, i = {
  form: {
    actions: {
      submit: "Connexion"
    },
    email: {
      label: "Votre adresse mail",
      placeholder: ""
    },
    password: {
      label: "votre mot de passe"
    }
  },
  links: {
    forgotPassword: "Mot de passe oublié",
    signup: "Inscription"
  },
  messages: {
    success: "Logged in successfully.",
    validation: {
      email: "Email is required (fr)",
      password: "Password is required (fr)"
    }
  },
  social: {
    google: "Continue with Google"
  },
  title: "Connexion"
}, a = {
  message: "Successfully logged out (fr)"
}, o = {
  form: {
    actions: {
      submit: "Reset password (fr)"
    },
    newPassword: {
      label: "New password (fr)"
    },
    confirmPassword: {
      label: "Confirm password is required (fr)"
    }
  },
  messages: {
    success: "Reset password successfully (fr)",
    validation: {
      newPassword: "New password is required (fr)",
      confirmPassword: "Confirm password is required (fr)"
    }
  },
  title: "Reset password (fr)"
}, n = {
  form: {
    actions: {
      submit: "M'inscrire"
    },
    confirmation: {
      label: "Confirmez votre mot de passe"
    },
    email: {
      label: "Votre adresse e-mail",
      placeholder: ""
    },
    password: {
      label: "Votre mot de passe"
    },
    confirmPassword: {
      label: "Confirm password (fr)"
    }
  },
  links: {
    forgotPassword: "Mot de passe oublié",
    login: "Connexion"
  },
  messages: {
    success: "Signed up successfully.",
    validation: {
      email: "Email is required (fr)",
      password: "Password is required (fr)",
      confirmPassword: "ConfirmPassword is required (fr)"
    }
  },
  title: "Inscription"
}, l = {
  signin: "Connexion",
  signup: "Inscription"
}, t = {
  profile: "Profile (fr)",
  logout: "Logout (fr)"
}, d = {
  messages: {
    email: "Email is required (fr)",
    validEmail: "Email must be a valid email (fr)",
    requiredField: "This field is required (fr)",
    passwordValidation: "Password must contain at least 8 characters, including a number, a lowercase and an uppercase (fr)",
    mustMatch: "Passwords must match (fr)"
  }
}, f = {
  messages: {
    alreadyVerified: "Email is already verified. Redirecting to home page in {{countdown}} seconds (fr)",
    error: "Something went wrong. Please try again (fr)",
    invalidToken: "The token is invalid (fr)",
    success: "Email verified successfully. Redirecting to home page in {{countdown}} seconds (fr)",
    unverified: "Please check your email for verification (fr)",
    unauthenticated: "User session expired. Please signin to continue (fr)"
  },
  button: {
    resendEmail: "Resend email (fr)",
    signin: "Signin (fr)"
  },
  title: "Email verification (fr)",
  toastMessages: {
    success: "Email verified successfully (fr)",
    alreadyVerified: "Email is already verified (fr)",
    invalidToken: "The token is invalid (fr)",
    error: "Something went wrong. Please try again (fr)",
    resendSuccess: "Email resent successfully (fr)",
    resendError: "Something went wrong. Please try again (fr)"
  }
}, c = {
  form: {
    email: {
      label: "Email (fr)",
      placeholder: ""
    },
    firstName: {
      label: "First name (fr)",
      placeholder: "Enter your first name (fr)"
    },
    lastName: {
      label: "Last name (fr)",
      placeholder: "Enter your last name (fr)"
    },
    validations: {
      firstName: {
        required: "First name is required (fr)"
      },
      lastName: {
        required: "Last name is required (fr)"
      }
    }
  },
  button: {
    update: "Update (fr)",
    cancel: "Cancel (fr)"
  },
  title: "Profile (fr)",
  toastMessages: {
    success: "Profile updated successfully (fr)",
    error: "Something went wrong. Please try again (fr)"
  }
}, u = {
  changePassword: s,
  forgotPassword: e,
  firstUser: r,
  login: i,
  logout: a,
  resetPassword: o,
  signup: n,
  menu: l,
  userMenu: t,
  validation: d,
  emailVerification: f,
  profile: c
};
export {
  s as changePassword,
  u as default,
  f as emailVerification,
  r as firstUser,
  e as forgotPassword,
  i as login,
  a as logout,
  l as menu,
  c as profile,
  o as resetPassword,
  n as signup,
  t as userMenu,
  d as validation
};
//# sourceMappingURL=user-LUMKiS28.mjs.map
