import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Modal, Page } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <Page
      title={t("modal.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("modal.usage.withoutHeader")}>
        <Button
          label={t("modal.showButton")}
          onClick={() => setIsOpen(true)}
        ></Button>
        <Modal onHide={() => setIsOpen(false)} visible={isOpen}>
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
          onHide={() => setIsOpen2(false)}
          visible={isOpen2}
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
          onHide={() => setIsOpen3(false)}
          visible={isOpen3}
        >
          <p style={{ lineHeight: 1.6 }}>{t("modal.content")}</p>
        </Modal>
      </Section>
    </Page>
  );
};
