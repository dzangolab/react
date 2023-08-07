import { Provider, emailSchema } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import * as zod from "zod";

import { addInvitation } from "@/api/invitation";
import { useConfig } from "@/hooks";

import { InvitationFormFields } from "./InvitationFormFields";

import type {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
} from "@/types";

interface Properties {
  apps?: InvitationAppOption[];
  roles?: InvitationRoleOption[];
  onCancel?: () => void;
  onSubmitted?: (response: AddInvitationResponse) => void; // afterSubmit
  prepareData?: (rawFormData: any) => any;
}

export const InvitationForm = ({
  apps,
  roles,
  onSubmitted,
  onCancel,
  prepareData,
}: Properties) => {
  const { t } = useTranslation("user");

  const appConfig = useConfig();

  const [submitting, setSubmitting] = useState(false);

  const getDefaultValues = useCallback(() => {
    const defaultValues: any = { email: "", role: undefined };

    let filteredRoles = roles;

    if (apps?.length === 1) {
      const app = apps[0];

      defaultValues.app = app;
      filteredRoles = app.supportedRoles;
    }

    if (filteredRoles?.length === 1) {
      defaultValues.role = filteredRoles[0];
    }

    return defaultValues;
  }, [apps, roles]);

  const getFormData = (data: any) => {
    const parsedData: { email: string; role: string; appId?: number } = {
      email: data.email,
      role: data.role?.name,
    };

    if (data.app?.id) {
      parsedData.appId = data.app.id;
    }

    return parsedData;
  };

  const onSubmit = (data: any) => {
    setSubmitting(true);

    const invitationData = prepareData ? prepareData(data) : getFormData(data);

    addInvitation(invitationData, appConfig?.apiBaseUrl || "")
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(t("invitation.messages.invite.error"));
        } else {
          toast.success(t("invitation.messages.invite.success"));

          if (onSubmitted) {
            onSubmitted(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("invitation.messages.invite.error"));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  let InvitationFormSchema = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
    role: zod.z.object(
      {
        id: zod.z.number(),
        name: zod.z.string(),
      },
      { required_error: t("validation.messages.role") },
    ),
  });

  if (apps?.length) {
    const AppIdFormSchema = zod.object({
      app: zod.z.object(
        {
          id: zod.z.number(),
          name: zod.z.string(),
          origin: zod.z.string(),
        },
        { required_error: t("validation.messages.app") },
      ),
    });

    InvitationFormSchema = InvitationFormSchema.merge(AppIdFormSchema);
  }

  return (
    <Provider
      onSubmit={onSubmit}
      defaultValues={getDefaultValues()}
      validationSchema={InvitationFormSchema}
    >
      <InvitationFormFields
        apps={apps}
        loading={submitting}
        roles={roles}
        onCancel={onCancel}
      />
    </Provider>
  );
};
