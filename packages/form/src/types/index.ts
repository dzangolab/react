import { UseFormGetFieldState, UseFormRegister } from "react-hook-form";

interface EmailErrorMessages {
  invalid?: string;
  required?: string;
}

interface PasswordErrorMessages {
  required?: string;
  weak?: string;
}

interface CustomInputProperties {
  getFieldState?: UseFormGetFieldState<any>;
  label?: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  submitCount?: number;
}

export type {
  CustomInputProperties,
  EmailErrorMessages,
  PasswordErrorMessages,
  UseFormRegister,
};

export type { IsEmailOptions, StrongPasswordOptions } from "./validator";
