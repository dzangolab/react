import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React from "react";
import * as zod from "zod";

import { InvitationFormFields } from "./InvitationFormFields";

import type { InvitationPayload } from "../../types";
import type { App, Role, useFormContext } from "@dzangolab/react-form";
import { useConfig } from "@/hooks";

interface Properties {
  handleSubmit: (data: InvitationPayload) => void;
  onCancel?: () => void;
  loading?: boolean;
  roles: Role[];
  apps: App[] | undefined;
  filterRoles?: (apps: App, role: Role[]) => Role[];
  additionalInvitationFields?: {
    fields: React.ComponentType<{
      useFormContext: typeof useFormContext;
    }>;
    additionalInvitationSchema: Zod.ZodObject<any>;
    defaultAdditionalValues: Record<string, any>;
  };
}

export const InvitationForm = ({
  handleSubmit,
  onCancel,
  loading,
  roles,
  apps,
  filterRoles,
  additionalInvitationFields,
}: Properties) => {
  const { t } = useTranslation("user");
  const {
    user: { invitations },
  } = useConfig();

  const AppIdFormSchema = zod.object({
    app: zod.z.object(
      {
        id: zod.z.number(),
        name: zod.z.string(),
        origin: zod.z.string(),
      },
      { required_error: t("validation.messages.app") }
    ),
  });

  let InvitationFormSchema: zod.AnyZodObject = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
    role: zod.z.object(
      {
        id: zod.z.number(),
        name: zod.z.string(),
      },
      { required_error: t("validation.messages.role") }
    ),
  });

  if (invitations?.modal.displayAppField) {
    InvitationFormSchema = InvitationFormSchema.merge(AppIdFormSchema);
  }

  if (additionalInvitationFields?.additionalInvitationSchema) {
    InvitationFormSchema = InvitationFormSchema.merge(
      additionalInvitationFields.additionalInvitationSchema
    );
  }

  return (
    <Provider
      onSubmit={(data: { email: string; role: Role; app: App }) => {
        handleSubmit({
          ...data,
          role: data.role.name,
          ...(invitations?.modal.displayAppField && { appId: data.app.id }),
        });
      }}
      defaultValues={{
        email: "",
        role: undefined,
        ...(invitations?.modal.displayAppField && { app: undefined }),
        ...(additionalInvitationFields?.defaultAdditionalValues &&
          additionalInvitationFields.defaultAdditionalValues),
      }}
      validationSchema={InvitationFormSchema}
    >
      <InvitationFormFields
        onCancel={onCancel}
        loading={loading}
        roles={roles}
        apps={apps}
        filterRoles={filterRoles}
        additionalFields={additionalInvitationFields?.fields}
      />
    </Provider>
  );
};
