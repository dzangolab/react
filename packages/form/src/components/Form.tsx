import { zodResolver } from "@hookform/resolvers/zod";
import React, { Children, createElement } from "react";
import { UseFormProps, useForm } from "react-hook-form";
import { ZodEffects, ZodObject } from "zod";

interface IForm extends UseFormProps {
  className?: string;
  children: any;
  validationSchema?: ZodObject<any> | ZodEffects<any>;
  html5Validation?: boolean;
  onSubmit: (data: any) => void;
}

export const Form: React.FC<IForm> = ({
  className = "",
  children,
  onSubmit,
  validationSchema,
  html5Validation = false,
  mode,
  ...useFormOptions
}) => {
  const {
    register,
    handleSubmit,
    getFieldState,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    formState: { errors, isDirty, isValid, touchedFields, submitCount },
  } = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    mode: mode,
    ...useFormOptions,
  });

  return (
    <form
      className={`form ${className}`}
      onSubmit={handleSubmit(onSubmit)}
      noValidate={!html5Validation} // enable/disable default html5 validations
    >
      {Children.map(children, (child) => {
        return child.props.name
          ? createElement(child.type, {
              ...{
                ...child.props,
                register,
                getFieldState,
                submitCount,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};
