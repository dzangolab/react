import { useTranslation } from "@dzangolab/react-i18n";
import { Page } from "@dzangolab/react-ui";
import { InvitationForm } from "@dzangolab/react-user";

import { Section } from "../../../../components/Demo";
import { apps, roles } from "../data";

export const InvitationFormDemo = () => {
  const [t] = useTranslation("user");

  return (
    <Page title={t("invitationForm.title")}>
      <Section title={t("invitationForm.usage.withAppField")}>
        <InvitationForm
          onSubmitted={() => {}}
          onCancel={() => {}}
          apps={apps}
        />
      </Section>

      <Section title={t("invitationForm.usage.withRoleField")}>
        <InvitationForm
          onSubmitted={() => {}}
          onCancel={() => {}}
          roles={roles}
        />
      </Section>

      <Section title={t("invitationForm.usage.withCalendarExpiryDateField")}>
        <InvitationForm
          expiryDateField={{
            display: true,
            mode: "calendar",
          }}
          onSubmitted={() => {}}
          onCancel={() => {}}
          roles={roles}
        />
      </Section>

      <Section title={t("invitationForm.usage.withInputExpiryDateField")}>
        <InvitationForm
          expiryDateField={{
            display: true,
            mode: "input",
          }}
          onSubmitted={() => {}}
          onCancel={() => {}}
          roles={roles}
        />
      </Section>
    </Page>
  );
};
