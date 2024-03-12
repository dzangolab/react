import { SwitchInput } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";

type Properties = {
  filled: boolean;
};

export const FormInputModes = ({ filled }: Properties) => {
  const [t] = useTranslation("form");

  return (
    <>
      <span className="form-mode-title">{t("formInput.subTitle")}</span>
      <SwitchInput
        label={
          filled
            ? t("formInput.label.transparent")
            : t("formInput.label.filled")
        }
        name="filled"
      />
      <SwitchInput label={t("formInput.label.valid")} name="valid" />
      <SwitchInput label={t("formInput.label.invalid")} name="invalid" />
    </>
  );
};
