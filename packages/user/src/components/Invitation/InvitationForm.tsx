import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import { InvitationFormFields } from "./InvitationFormFields";

import type { InvitationPayload } from "../../types";

interface Properties {
  handleSubmit: (data: InvitationPayload) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const InvitationForm = ({
  handleSubmit,
  onCancel,
  loading,
}: Properties) => {
  const { t } = useTranslation("user");

  const InvitationFormSchema = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
  });

  return (
    <Provider
      onSubmit={handleSubmit}
      defaultValues={{
        email: "",
        roles: [],
      }}
      validationSchema={InvitationFormSchema}
    >
      <InvitationFormFields onCancel={onCancel} loading={loading} />
    </Provider>
  );
};
