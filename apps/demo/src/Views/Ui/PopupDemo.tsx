import { useTranslation } from "@dzangolab/react-i18n";
import { Popup } from "@dzangolab/react-ui";
import { Button } from "primereact/button";

const PopupDemo = () => {
  const { t } = useTranslation("ui");

  return (
    <Popup
      trigger={<Button icon={"pi pi-angle-double-down"}></Button>}
      content={<div style={{ padding: "1rem" }}>{t("popup.content")}</div>}
      position="right"
      offset={20}
    />
  );
};

export default PopupDemo;
