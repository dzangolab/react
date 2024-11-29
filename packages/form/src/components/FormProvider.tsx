import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";
import { ZodEffects, ZodObject } from "zod";

import { FormSubmitOptions } from "..";

interface IForm extends UseFormProps {
  className?: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: ZodObject<any> | ZodEffects<any>;
  html5Validation?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any, options?: FormSubmitOptions) => any;
}

export const Provider: React.FC<IForm> = ({
  className = "",
  children,
  onSubmit,
  validationSchema,
  html5Validation = false,
  ...useFormOptions
}) => {
  const methods = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    ...useFormOptions,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnSubmit = async (data: any) => {
    try {
      const formSubmitOptions = {
        clearErrors: methods.clearErrors,
        reset: methods.reset,
        resetField: methods.resetField,
        setError: methods.setError,
      };

      await onSubmit(data, formSubmitOptions);
    } catch (error) {
      const { name, message } = error as Error;

      methods.setError(name, { message });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(handleOnSubmit)}
        noValidate={!html5Validation} // enable/disable default html5 validations
      >
        {children}
      </form>
    </FormProvider>
  );
};
