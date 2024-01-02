import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { InvitationModal } from "@dzangolab/react-user";

import { Section } from "../../../components/Demo";

export const InvitationModalDemo = () => {
  const [t] = useTranslation("user");

  return (
    <Page title={t("invitationModal.title")}>
      <Section>
        <InvitationModal onSubmitted={() => {}} />
      </Section>
    </Page>
  );
};
