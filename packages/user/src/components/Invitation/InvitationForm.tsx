import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as zod from "zod";

import { addInvitation } from "@/api/invitation";
import { useConfig } from "@/hooks";

import { InvitationFormFields } from "./InvitationFormFields";
import { ROLE_LIST } from "../../constants";

import type { AddInvitationResponse, InvitationPayload } from "@/types";

interface Properties {
  onCancel?: () => void;
  onSubmitted?: (response: AddInvitationResponse) => void; // afterSubmit
  prepareData?: (data: InvitationPayload) => InvitationPayload;
}

export const InvitationForm = ({
  onSubmitted,
  onCancel,
  prepareData,
}: Properties) => {
  const { t } = useTranslation("user");

  const appConfig = useConfig();

  const [submitting, setSubmitting] = useState(false);

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

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    const invitationData = prepareData ? prepareData(data) : data;

    const response = await addInvitation(
      invitationData,
      appConfig?.apiBaseUrl || ""
    );

    if (response) {
      toast.success(t("invitation.messages.addSuccess"));
    }

    setSubmitting(false);

    if (onSubmitted) {
      onSubmitted(response);
    }
  };

  return (
    <Provider
      onSubmit={(data: { email: string; role: (typeof ROLE_LIST)[0] }) => {
        onSubmit({ ...data, role: data.role.name });
      }}
      defaultValues={{
        email: "",
        role: undefined,
      }}
      validationSchema={InvitationFormSchema}
    >
      <InvitationFormFields onCancel={onCancel} loading={submitting} />
    </Provider>
  );
};
