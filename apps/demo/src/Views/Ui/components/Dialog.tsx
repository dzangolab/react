import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Dialog, Page } from "@dzangolab/react-ui";
import { useState } from "react";

export const DialogDemo = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const [t] = useTranslation("ui");

  return (
    <>
      <Page title={t("dialog.title")}>
        <Button
          label={t("dialog.buttonLabel")}
          onClick={() => setVisible(true)}
        />
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          title={t("dialog.header")}
        >
          <div>{t("dialog.content")}</div>
        </Dialog>
      </Page>
    </>
  );
};
