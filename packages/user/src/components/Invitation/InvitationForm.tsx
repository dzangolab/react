import {
  Provider,
  emailSchema,
  AdditionalFormFields,
} from "@dzangolab/react-form";
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
  InvitationExpiryDateField,
} from "@/types";

interface Properties {
  additionalInvitationFields?: AdditionalFormFields;
  apps?: InvitationAppOption[];
  expiryDateField?: InvitationExpiryDateField;
  onCancel?: () => void;
  onSubmitted?: (response: AddInvitationResponse) => void; // afterSubmit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareData?: (rawFormData: any) => any;
  roles?: InvitationRoleOption[];
}

export const InvitationForm = ({
  additionalInvitationFields,
  apps,
  expiryDateField,
  onSubmitted,
  onCancel,
  prepareData,
  roles,
}: Properties) => {
  const { t } = useTranslation("invitations");

  const appConfig = useConfig();

  const [submitting, setSubmitting] = useState(false);

  const getDefaultValues = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let defaultValues: any = { email: "", role: undefined };

    let filteredRoles = roles;

    if (apps?.length === 1) {
      const app = apps[0];

      defaultValues.app = app;
      filteredRoles = app.supportedRoles;
    }

    if (expiryDateField?.display) {
      defaultValues.expiresAt = null;
    }

    if (filteredRoles?.length === 1) {
      defaultValues.role = filteredRoles[0];
    }

    if (additionalInvitationFields?.defaultValues) {
      defaultValues = {
        ...defaultValues,
        ...additionalInvitationFields.defaultValues,
      };
    }

    return defaultValues;
  }, [
    apps,
    roles,
    additionalInvitationFields?.defaultValues,
    expiryDateField?.display,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFormData = (data: any) => {
    const parsedData: {
      email: string;
      role: string;
      appId?: number;
      expiresAt?: Date;
    } = {
      email: data.email,
      role: data.role,
    };

    if (data.app) {
      parsedData.appId = data.app;
    }

    if (data.expiresAt) {
      parsedData.expiresAt = data.expiresAt;
    }

    return parsedData;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setSubmitting(true);

    const invitationData = prepareData ? prepareData(data) : getFormData(data);

    addInvitation(invitationData, appConfig?.apiBaseUrl || "")
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(t("messages.invite.error"));
        } else {
          toast.success(t("messages.invite.success"));

          if (onSubmitted) {
            onSubmitted(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.invite.error"));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let InvitationFormSchema: Zod.ZodObject<any> = zod.object({
    email: emailSchema({
      invalid: t("validation.messages.validEmail"),
      required: t("validation.messages.email"),
    }),
  });

  if (apps?.length || roles?.length) {
    const RoleFormSchema = zod.object({
      role: zod.string().min(1, { message: t("validation.messages.role") }),
    });

    InvitationFormSchema = InvitationFormSchema.merge(RoleFormSchema);
  }

  if (apps?.length) {
    const AppIdFormSchema = zod.object({
      app: zod.number({
        required_error: t("validation.messages.app"),
      }),
    });

    InvitationFormSchema = InvitationFormSchema.merge(AppIdFormSchema);
  }

  if (expiryDateField?.display) {
    const ExpiresAtFormSchema = zod.object({
      expiresAt: zod.date({
        required_error: t("validation.messages.expiresAt"),
      }),
    });

    InvitationFormSchema = InvitationFormSchema.merge(ExpiresAtFormSchema);
  }

  if (additionalInvitationFields?.schema) {
    InvitationFormSchema = InvitationFormSchema.merge(
      additionalInvitationFields.schema,
    );
  }

  return (
    <Provider
      onSubmit={onSubmit}
      defaultValues={getDefaultValues()}
      validationSchema={InvitationFormSchema}
    >
      <InvitationFormFields
        renderAdditionalFields={additionalInvitationFields?.renderFields}
        apps={apps}
        expiryDateField={expiryDateField}
        loading={submitting}
        onCancel={onCancel}
        roles={roles}
      />
    </Provider>
  );
};
