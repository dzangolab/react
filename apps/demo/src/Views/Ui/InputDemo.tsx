import { useTranslation } from "@dzangolab/react-i18n";
import { Input } from "@dzangolab/react-ui";
import { ChangeEvent } from "react";

const InputDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <>
      <Input
        error={true}
        errorMessage={t("input.errorMessage")}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          console.log(event.target.value)
        }
        placeholder={t("input.placeholder")}
        label={t("input.label")}
      />
      <Input />
    </>
  );
};

export default InputDemo;
