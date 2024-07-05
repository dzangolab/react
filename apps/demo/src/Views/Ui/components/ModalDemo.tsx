import { useTranslation } from "@dzangolab/react-i18n";
import { Button, Modal, Page } from "@dzangolab/react-ui";
import { useState } from "react";

import { Section } from "../../../components/Demo";

const Header = () => {
  const [t] = useTranslation("ui");

  return <h2>{t("modal.usage.headerAsFC")}</h2>;
};

export const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [isOpen3, setIsOpen3] = useState<boolean>(false);

  const [t] = useTranslation("ui");

  return (
    <Page title={t("modal.title")}>
      <Section title={t("modal.usage.withoutHeader")}>
        <Button
          label={t("modal.showButton")}
          onClick={() => setIsOpen(true)}
        ></Button>
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
          <p style={{ lineHeight: 1.6 }}>{t("modal.content")}</p>
        </Modal>
      </Section>
      <Section title={t("modal.usage.withHeader")}>
        <Button
          label={t("modal.showButton")}
          onClick={() => setIsOpen2(true)}
        ></Button>
        <Modal
          header={t("modal.header")}
          onClose={() => setIsOpen2(false)}
          isOpen={isOpen2}
        >
          <p style={{ lineHeight: 1.6 }}>{t("modal.content")}</p>
        </Modal>
      </Section>
      <Section title={t("modal.usage.headerAsFC")}>
        <Button
          label={t("modal.showButton")}
          onClick={() => setIsOpen3(true)}
        ></Button>
        <Modal
          header={<Header />}
          onClose={() => setIsOpen3(false)}
          isOpen={isOpen3}
        >
          <p style={{ lineHeight: 1.6 }}>{t("modal.content")}</p>
        </Modal>
      </Section>
    </Page>
  );
};
