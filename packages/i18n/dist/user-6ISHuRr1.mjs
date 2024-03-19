const s = {
  form: {
    actions: {
      submit: "Change password"
    },
    oldPassword: {
      label: "Old password"
    },
    newPassword: {
      label: "New password"
    },
    confirmPassword: {
      label: "Confirm password is required"
    }
  },
  messages: {
    success: "Your password was successfully changed.",
    validation: {
      oldPassword: "Old password is required",
      newPassword: "New password is required",
      confirmPassword: "Confirm password",
      mustMatch: "Passwords must match"
    }
  },
  title: "Change password"
}, e = {
  links: {
    login: "Back to login"
  },
  messages: {
    success: "Email sent sucessfully",
    validation: {
      email: "Email is required"
    }
  },
  form: {
    actions: {
      submit: "Email me"
    },
    email: {
      label: "Your email",
      placeholder: ""
    }
  },
  title: "Forgot password"
}, i = {
  title: "Register first user",
  login: {
    messages: {
      error: "Automatic login failed. Redirecting to login page for manual login"
    }
  },
  signup: {
    messages: {
      error: "Error signing up first user",
      success: "Succefully added first user. Automatically logging in ..."
    }
  }
}, a = {
  form: {
    actions: {
      submit: "Log in"
    },
    email: {
      label: "Your email",
      placeholder: ""
    },
    password: {
      label: "Your password"
    }
  },
  instructions: "Enter your credentials to continue",
  links: {
    forgotPassword: "Forgot password",
    signup: "Sign up"
  },
  messages: {
    success: "Logged in successfully",
    validation: {
      email: "Email is required",
      password: "Password is required"
    }
  },
  social: {
    google: "Continue with Google"
  },
  title: "Log in"
}, r = {
  message: "Successfully logged out"
}, o = {
  form: {
    actions: {
      submit: "Create my account"
    },
    confirmation: {
      label: "Confirm password"
    },
    email: {
      label: "Your email",
      placeholder: ""
    },
    password: {
      label: "Your password"
    },
    confirmPassword: {
      label: "Confirm password"
    }
  },
  links: {
    forgotPassword: "Forgot password",
    login: "Log in"
  },
  messages: {
    success: "Signed up successfully.",
    validation: {
      email: "Email is required",
      password: "Password is required",
      confirmPassword: "Confirm password is required"
    }
  },
  title: "Sign up"
}, l = {
  signin: "Log in",
  signup: "Sign up"
}, n = {
  form: {
    actions: {
      submit: "Reset password"
    },
    newPassword: {
      label: "New password"
    },
    confirmPassword: {
      label: "Confirm password is required"
    }
  },
  messages: {
    success: "Reset password successfully",
    validation: {
      newPassword: "New password is required",
      confirmPassword: "Confirm password is required"
    }
  },
  title: "Reset password"
}, t = {
  profile: "Profile",
  logout: "Logout"
}, d = {
  messages: {
    email: "Email is required",
    validEmail: "Email must be a valid email",
    requiredField: "This field is required",
    passwordValidation: "Password must contain at least 8 characters, including a number, a lowercase and an uppercase",
    mustMatch: "Passwords must match"
  }
}, u = {
  messages: {
    alreadyVerified: "Email is already verified. Redirecting to home page in {{countdown}} seconds",
    error: "Something went wrong. Please try again",
    invalidToken: "The token is invalid",
    success: "Email verified successfully. Redirecting to home page in {{countdown}} seconds",
    unverified: "Please check your email for verification",
    unauthenticated: "User session expired. Please signin to continue"
  },
  button: {
    resendEmail: "Resend email",
    signin: "Signin"
  },
  title: "Email verification",
  toastMessages: {
    success: "Email verified successfully",
    alreadyVerified: "Email is already verified",
    invalidToken: "The token is invalid",
    error: "Something went wrong. Please try again",
    resendSuccess: "Email resent successfully",
    resendError: "Something went wrong. Please try again"
  }
}, c = {
  form: {
    email: {
      label: "Email",
      placeholder: ""
    },
    firstName: {
      label: "First name",
      placeholder: "Enter your first name"
    },
    lastName: {
      label: "Last name",
      placeholder: "Enter your last name"
    },
    validations: {
      firstName: {
        required: "First name is required"
      },
      lastName: {
        required: "Last name is required"
      }
    }
  },
  button: {
    update: "Update",
    cancel: "Cancel"
  },
  title: "Profile",
  toastMessages: {
    success: "Profile updated successfully",
    error: "Something went wrong. Please try again"
  }
}, m = {
  changePassword: s,
  forgotPassword: e,
  firstUser: i,
  login: a,
  logout: r,
  signup: o,
  menu: l,
  resetPassword: n,
  userMenu: t,
  validation: d,
  emailVerification: u,
  profile: c
};
export {
  s as changePassword,
  m as default,
  u as emailVerification,
  i as firstUser,
  e as forgotPassword,
  a as login,
  r as logout,
  l as menu,
  c as profile,
  n as resetPassword,
  o as signup,
  t as userMenu,
  d as validation
};
//# sourceMappingURL=user-6ISHuRr1.mjs.map
