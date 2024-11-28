import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";
import { ZodEffects, ZodObject } from "zod";

interface IForm extends UseFormProps {
  className?: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema?: ZodObject<any> | ZodEffects<any>;
  html5Validation?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => any;
  onSubmitReset?: boolean;
}

export const Provider: React.FC<IForm> = ({
  className = "",
  children,
  onSubmit,
  onSubmitReset,
  validationSchema,
  html5Validation = false,
  ...useFormOptions
}) => {
  const methods = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    ...useFormOptions,
  });

  useEffect(() => {
    if (onSubmitReset) {
      methods.reset();
    }
  }, [onSubmitReset]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnSubmit = async (data: any) => {
    try {
      await onSubmit(data);
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
