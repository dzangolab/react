import { FormActions, useFormContext } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

export const FormInputModes = ({
  filledInput,
  setFilledInput,
  setValidState,
  setInvalidState,
  isValid,
  setIsValid,
}: any) => {
  const [t] = useTranslation("form");

  const { clearErrors } = useFormContext();

  const handleToggleFilledInput = (event: any) => {
    event.preventDefault();
    setFilledInput(!filledInput);
  };

  const handleInputState = (event: any) => {
    clearErrors();
    setIsValid(!isValid);

    if (isValid) {
      setInvalidState(true);
    } else {
      event.preventDefault();
      setValidState(true);
    }
  };

  return (
    <>
      <span className="form-mode-title">{t("formInput.title")}</span>
      <FormActions
        actions={[
          {
            id: "filled",
            label: filledInput
              ? t("formInput.label.transparent")
              : t("formInput.label.filled"),
            onClick: handleToggleFilledInput,
          },
          {
            id: "inputState",
            label: isValid
              ? t("formInput.label.invalid")
              : t("formInput.label.valid"),
            onClick: handleInputState,
          },
        ]}
        alignment="left"
      />
    </>
  );
};
