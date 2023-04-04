interface EmailErrorMessages {
  invalid?: string;
  required?: string;
}

interface PasswordErrorMessages {
  required?: string;
  weak?: string;
}

export type { EmailErrorMessages, PasswordErrorMessages };

export type { IsEmailOptions, StrongPasswordOptions } from "./validator";
