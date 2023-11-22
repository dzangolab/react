import { useTranslation } from "@dzangolab/react-i18n";
import { Checkbox } from "@dzangolab/react-ui";

const CheckboxDemo = () => {
  const { t } = useTranslation("ui");
  return (
    <Checkbox
      onChange={() => console.log("Hello")}
      label={t("checkbox.label")}
    />
  );
};

export default CheckboxDemo;
