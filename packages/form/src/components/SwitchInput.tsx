import { InputSwitch } from "primereact/inputswitch";
import { classNames } from "primereact/utils";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const SwitchInput = () => {
  const defaultValues = {
    checked: false,
  };

  const {
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  return (
    <Controller
      name="checked"
      control={control}
      render={({ field, fieldState }) => (
        <>
          <label
            htmlFor={field.name}
            className={classNames({ "p-error": errors.checked })}
          ></label>
          <InputSwitch
            inputId={field.name}
            checked={field.value}
            inputRef={field.ref}
            className={classNames({ "p-invalid": fieldState.error })}
            onChange={(event) => field.onChange(event.value)}
          />
        </>
      )}
    />
  );
};
