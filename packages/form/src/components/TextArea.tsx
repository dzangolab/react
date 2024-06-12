import { ITextareaProperties } from "@dzangolab/react-ui";
import React from "react";
import {
  Controller,
  UseFormGetFieldState,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";

interface ITextArea extends ITextareaProperties {
  defaultValue?: string;
  label?: string;
  name: string;
  placeholder?: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
  /** @deprecated */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  /** @deprecated */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
}

export const TextArea: React.FC<ITextArea> = ({
  defaultValue = "",
  label = "",
  placeholder = "",
  name,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
}) => {
  const { control, getFieldState } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) return true;
    if (showValidState && !invalid) return false;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextArea
          name={field.name}
          label={label}
          placeholder={placeholder}
          defaultValue={field.value}
          errorMessage={error?.message}
          onChange={field.onChange}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          {...others}
        />
      )}
    />
  );
};
