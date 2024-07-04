import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Modal, Page } from "@dzangolab/react-ui";
import React, { useState } from "react";

import { Section } from "../../../components/Demo";

export const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [t] = useTranslation("ui");

  return (
    <Page title={t("modal.title")}>
      <Button
        label={t("modal.showButton")}
        onClick={() => setIsOpen(true)}
      ></Button>
      <Modal
        title={t("modal.header")}
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <p style={{ lineHeight: 1.6 }}>{t("modal.content")}</p>
      </Modal>
    </Page>
  );
};
