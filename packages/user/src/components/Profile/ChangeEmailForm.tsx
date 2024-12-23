import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import { z } from "zod";

import { useConfig } from "@/hooks";
import { changeEmail } from "@/supertokens";

import { ChangeEmailFormField } from "./ChangeEmailFormField";
import { UserType } from "../../types";

interface Properties {
  user: UserType | null;
}

export const ChangeEmailForm = ({ user }: Properties) => {
  const { t, i18n } = useTranslation("user");
  const [submitting, setSubmitting] = useState(false);
  const config = useConfig();

  const emailValidationSchema = z.object({
    email: z.string().min(1, t("profile.form.validations.email.required")),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    console.log("data", data);
    const response = await changeEmail(data.email, config.apiBaseUrl);
    console.log("response", response);
  };

  const formValues = {
    email: user?.email || "",
  };

  return (
    <Provider
      validationSchema={emailValidationSchema}
      onSubmit={handleSubmit}
      values={formValues}
      validationTriggerKey={i18n.language}
    >
      <ChangeEmailFormField submitting={submitting} />
    </Provider>
  );
};
