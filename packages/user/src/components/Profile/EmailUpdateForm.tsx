import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import { z } from "zod";

import { EmailUpdateFormField } from "./EmailUpdateFormField";
import { UserType } from "../../types";

interface Properties {
  user: UserType | null;
}

export const EmailUpdateForm = ({ user }: Properties) => {
  const { t, i18n } = useTranslation("user");
  const [submitting, setSubmitting] = useState(false);

  const emailValidationSchema: z.AnyZodObject = z.object({
    email: z.string().min(1, t("profile.form.validations.email.required")),
  });

  const handleSubmit = (data: string) => {
    console.log("data", data);
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
      <EmailUpdateFormField submitting={submitting} />
    </Provider>
  );
};
