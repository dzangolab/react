import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import { InvitationFormFields } from "./InvitationFormFields";
import { ROLE_LIST } from "../../constants";

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
    role: zod.z.object(
      {
        id: zod.z.number(),
        name: zod.z.union([zod.z.literal("ADMIN"), zod.z.literal("USER")]),
      },
      { required_error: t("validation.messages.role") }
    ),
  });

  return (
    <Provider
      onSubmit={(data: { email: string; role: (typeof ROLE_LIST)[0] }) => {
        handleSubmit({ ...data, role: data.role.name });
      }}
      defaultValues={{
        email: "",
        role: undefined,
      }}
      validationSchema={InvitationFormSchema}
    >
      <InvitationFormFields onCancel={onCancel} loading={loading} />
    </Provider>
  );
};
