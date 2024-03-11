import { FormActions, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

export const FormInputModes = ({
  filledInput,
  setFilledInput,
  validState,
  setValidState,
  invalidState,
  setInvalidState,
}: any) => {
  const [t] = useTranslation("form");

  const {
    register,
    getFieldState,
    formState: { errors, submitCount, isSubmitSuccessful },
    clearErrors,
  } = useFormContext();

  const handleReset = (event: any) => {
    event.preventDefault();
    clearErrors();
    setInvalidState(false);
    setValidState(false);
  };

  return (
    <FormActions
      actions={[
        {
          id: "filled",
          label: filledInput
            ? t("formInput.label.transparent")
            : t("formInput.label.filled"),
          onClick: (event) => {
            event.preventDefault();
            setFilledInput(!filledInput);
          },
        },
        {
          id: "valid",
          label: t("formInput.label.valid"),
          onClick: (event) => {
            event.preventDefault();
            setValidState(true);
          },
        },
        {
          id: "invalid",
          label: t("formInput.label.invalid"),
          onClick: () => {
            setInvalidState(true);
          },
        },
        {
          id: "reset",
          label: t("formInput.label.reset"),
          onClick: handleReset,
        },
      ]}
      alignment="center"
    />
  );
};
