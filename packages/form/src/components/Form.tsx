import { zodResolver } from "@hookform/resolvers/zod";
import React, { Children, createElement } from "react";
import { UseFormProps, useForm, FormProvider } from "react-hook-form";
import { ZodEffects, ZodObject } from "zod";

interface IForm extends UseFormProps {
  className?: string;
  children: any;
  validationSchema?: ZodObject<any> | ZodEffects<any>;
  html5Validation?: boolean;
  onSubmit: (data: any) => void;
  onError?: (data: any) => void;
  viewMode?: boolean;
}

export const Form: React.FC<IForm> = ({
  className = "",
  children,
  onSubmit,
  onError,
  validationSchema,
  html5Validation = false,
  viewMode = false,
  ...useFormOptions
}) => {
  const methods = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    ...useFormOptions,
  });

  if (viewMode) {
    return (
      <FormProvider {...methods}>
        <div className={`details ${className}`}>
          {Children.map(children, (child) => {
            if (!child) {
              return null;
            }

            return child.props.name
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    viewMode,
                  },
                })
              : child;
          })}
        </div>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        noValidate={!html5Validation} // enable/disable default html5 validations
      >
        {children}
      </form>
    </FormProvider>
  );
};
