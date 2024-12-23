import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import { z } from "zod";

import { UpdateEmailFormFields } from "./UpdateEmailFormFields";
import { UserType } from "../../types";

interface Properties {
  user: UserType | null;
}

export const UpdateEmailForm = ({ user }: Properties) => {
  const { t, i18n } = useTranslation("user");
  const [submitting, setSubmitting] = useState(false);

  const emailValidationSchema = z.object({
    email: z.string().min(1, t("profile.accountInfo.messages.email")),
  });

  const handleSubmit = (data: string) => {
    // TODO update email on submit
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
      <UpdateEmailFormFields submitting={submitting} />
    </Provider>
  );
};
