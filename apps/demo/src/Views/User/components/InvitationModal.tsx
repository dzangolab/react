import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { Button } from "@dzangolab/react-ui";
import { InvitationModal } from "@dzangolab/react-user";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const InvitationModalDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("invitationModal.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <InvitationModal onSubmitted={() => {}} />
      </Section>
    </Page>
  );
};
