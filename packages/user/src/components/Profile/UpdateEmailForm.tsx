import { Provider } from "@dzangolab/react-form";
import { useTranslation } from "@dzangolab/react-i18n";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { useConfig } from "@/hooks";
import { changeEmail } from "@/supertokens";

import { UpdateEmailFormFields } from "./UpdateEmailFormFields";
import { UserType } from "../../types";

interface Properties {
  user: UserType | null;
}

type UpdateEmailFormData = {
  email: string;
};

export const UpdateEmailForm = ({ user }: Properties) => {
  const { t, i18n } = useTranslation("user");
  const [loading, setLoading] = useState(false);
  const config = useConfig();

  const emailValidationSchema = z.object({
    email: z.string().min(1, t("profile.accountInfo.messages.email")),
  });

  const handleSubmit = async (data: UpdateEmailFormData) => {
    setLoading(true);
    try {
      const response = await changeEmail(data.email, config.apiBaseUrl);

      switch (response?.status) {
        case "OK":
          toast.success(t("profile.accountInfo.messages.success"));
          break;
        case "EMAIL_ALREADY_EXISTS_ERROR":
          toast.error(t("profile.accountInfo.messages.alreadyExist"));
          break;
        case "EMAIL_SAME_AS_CURRENT_ERROR":
          toast.error(t("profile.accountInfo.messages.duplicate"));
          break;
        case 422:
          toast.error(t("profile.accountInfo.messages.invalid"));
          break;
        case 403:
          toast.error(t("profile.accountInfo.messages.invalid"));
          break;
        default:
          toast.error(t("profile.accountInfo.messages.error"));
          break;
      }

      setLoading(false);
    } catch (error) {
      toast.error(t("profile.accountInfo.messages.error"));

      setLoading(false);
    }
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
      <UpdateEmailFormFields loading={loading} />
    </Provider>
  );
};
