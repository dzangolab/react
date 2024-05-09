import {
  UseFormGetFieldState,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";

interface EmailErrorMessages {
  invalid?: string;
  required?: string;
}

interface PasswordErrorMessages {
  required?: string;
  weak?: string;
}

interface CustomInputProperties {
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  label?: string;
  name: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitcount?: number;
}

export type AdditionalFormSchema = Zod.ZodObject<any>;

export type AdditionalDefaultValues = Record<string, any>;

export type RenderAdditionalFormFields = (
  formContext: typeof useFormContext,
) => React.ReactNode;

interface AdditionalFormFields {
  defaultValues: AdditionalDefaultValues;
  schema: AdditionalFormSchema;
  renderFields: RenderAdditionalFormFields;
}

export type {
  AdditionalFormFields,
  CustomInputProperties,
  EmailErrorMessages,
  PasswordErrorMessages,
  UseFormRegister,
};

export type { IsEmailOptions, StrongPasswordOptions } from "./validator";
