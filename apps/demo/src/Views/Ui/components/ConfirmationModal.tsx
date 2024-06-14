import { useTranslation } from "@dzangolab/react-i18n";
import { Button, ConfirmationModal, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

export const ConfirmationModalDemo = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [t] = useTranslation("ui");

  return (
    <Page title={t("confirmationModal.title")}>
      <Section>
        <Button
          onClick={() => setShowModal(true)}
          label={t("confirmationModal.buttonLabel")}
        ></Button>
        <ConfirmationModal
          visible={showModal}
          message={t("confirmationModal.message")}
          header={t("confirmationModal.header")}
          onHide={() => setShowModal(false)}
        />
      </Section>
    </Page>
  );
};
